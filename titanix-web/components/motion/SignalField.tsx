'use client';

import { useEffect, useRef } from 'react';

/*
 * "Signal over terrain" — the site's background. A slowly drifting height
 * field drawn as topographic contour lines, with the cursor acting as a radio
 * transmitter: the terrain around it lights up yellow and rings propagate out
 * across the contours. A nod to where Titanix started (LoRa networks, radio
 * propagation on real terrain). Raw WebGL2, one full-screen triangle.
 *
 * Strongest behind the hero and the footer, dimmed behind content.
 * No WebGL2 → nothing renders and the flat background shows.
 */

const VERT = `#version 300 es
in vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
uniform float uAmp;
uniform float uSignal;
out vec4 o;

vec2 h2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}
float gnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(mix(dot(h2(i), f), dot(h2(i + vec2(1, 0)), f - vec2(1, 0)), u.x),
             mix(dot(h2(i + vec2(0, 1)), f - vec2(0, 1)), dot(h2(i + vec2(1, 1)), f - vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 3; i++) { v += a * gnoise(p); p = m * p; a *= 0.5; }
  return v;
}
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.y;
  float t = uTime * 0.025;
  vec2 p = uv * 1.5 + vec2(0.0, uScroll * 0.22);
  vec2 w = vec2(fbm(p + vec2(t, -t)), fbm(p + vec2(3.1, 1.7) - t));
  float h = fbm(p + 1.7 * w) * 0.5 + 0.5;

  // Transmitter at the cursor.
  vec2 m = uMouse / uRes.y;
  float d = length(uv - m);
  float cover = exp(-d * d * 18.0) * uSignal;
  float ring = pow(0.5 + 0.5 * sin(d * 42.0 - uTime * 2.2), 8.0) * exp(-d * 3.2) * uSignal;

  // Contours: every level faint, every 5th a heavier index line.
  float hv = h * 22.0;
  float fw = max(fwidth(hv), 1e-4);
  float line = 1.0 - smoothstep(0.0, fw * 1.2, abs(fract(hv - 0.5) - 0.5));
  float major = 1.0 - smoothstep(0.0, fw * 1.4, abs(fract(hv / 5.0 - 0.5) - 0.5) * 5.0);

  vec3 bg = vec3(0.039, 0.039, 0.031);
  vec3 ink = vec3(0.62, 0.62, 0.56);
  vec3 yel = vec3(0.937, 0.886, 0.0);

  float faint = mix(0.055, 0.15, major);
  vec3 col = bg;
  col += ink * line * faint * uAmp;
  col += yel * line * (cover * 0.75 + ring * 0.9) * uAmp;
  col += yel * major * cover * 0.25 * uAmp;
  // Faint relief so the field is not flat between lines.
  col += vec3(0.022, 0.022, 0.018) * smoothstep(0.3, 0.8, h) * uAmp;

  // Vignette + grain.
  vec2 q = gl_FragCoord.xy / uRes;
  col *= mix(0.55, 1.0, smoothstep(1.25, 0.35, length(q - vec2(0.5, 0.55))));
  col += (hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) * 0.018;

  o = vec4(col, 1.0);
}`;

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

export default function SignalField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u('uRes'), uTime = u('uTime'), uMouse = u('uMouse'), uScroll = u('uScroll'), uAmp = u('uAmp'), uSignal = u('uSignal');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.25 : 1.5);

    let w = 0, h = 0;
    const resize = () => {
      w = Math.round(window.innerWidth * dpr);
      h = Math.round(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };
    resize();

    // Pointer, eased. On touch the transmitter wanders on its own.
    const target = { x: 0.72, y: 0.42, on: coarse };
    const mouse = { x: 0.72, y: 0.42 };
    let signal = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      target.x = e.clientX / window.innerWidth;
      target.y = e.clientY / window.innerHeight;
      target.on = true;
    };
    const onLeave = () => (target.on = false);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    let raf = 0;
    let visible = true;
    const start = performance.now();
    let last = start;

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const time = reduced ? 12 : (now - start) / 1000;

      if (coarse && !reduced) {
        target.x = 0.5 + 0.32 * Math.sin(time * 0.21);
        target.y = 0.4 + 0.22 * Math.sin(time * 0.33 + 1.2);
      }
      const k = 1 - Math.exp(-dt * 5);
      mouse.x += (target.x - mouse.x) * k;
      mouse.y += (target.y - mouse.y) * k;
      signal += ((target.on ? 1 : 0.25) - signal) * (1 - Math.exp(-dt * 3));

      // Full strength over the hero and the footer, dimmed behind content.
      const vh = window.innerHeight;
      const y = window.scrollY;
      const doc = document.documentElement.scrollHeight;
      const top = clamp(1 - y / (vh * 0.9));
      const bottom = clamp(1 - (doc - (y + vh)) / (vh * 1.1));
      const amp = 0.38 + 0.62 * Math.max(top, bottom);

      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x * w, (1 - mouse.y) * h);
      gl.uniform1f(uScroll, y / vh);
      gl.uniform1f(uAmp, amp);
      gl.uniform1f(uSignal, signal);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      draw(now);
      if (visible) raf = requestAnimationFrame(loop);
    };

    const onVis = () => {
      visible = !document.hidden;
      cancelAnimationFrame(raf);
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    const onResize = () => {
      resize();
      draw(performance.now());
    };

    if (reduced) {
      draw(performance.now());
      window.addEventListener('scroll', onResize, { passive: true });
    } else {
      raf = requestAnimationFrame(loop);
      document.addEventListener('visibilitychange', onVis);
    }
    window.addEventListener('resize', onResize);
    canvas.style.opacity = '1';

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize);
      document.removeEventListener('visibilitychange', onVis);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-0 transition-opacity duration-[1.6s]"
    />
  );
}
