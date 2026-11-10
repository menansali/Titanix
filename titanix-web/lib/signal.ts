/*
 * Shared state between the background shader (SignalField) and the things
 * that play along with it. Plain mutable objects read once per frame: no
 * React state, no events.
 *
 * - `tint`: sections write a colour here and the terrain takes it on
 *   (the Showreel sets each app's accent while it's on screen).
 * - `field`: SignalField writes the transmitter's eased position, strength
 *   and clock here, so DOM effects (the hero headline) ride the same rings.
 */

export const tint = { r: 0, g: 0, b: 0, on: false };

export const field = {
  /** False until the shader is running (no WebGL2 → DOM effects stay off). */
  live: false,
  /** Transmitter position in viewport pixels. */
  x: 0,
  y: 0,
  /** 0–1, how strong the transmitter is right now. */
  signal: 0,
  /** Shader clock, seconds. */
  time: 0,
};

export function setTint(hex: string | null) {
  if (!hex) {
    tint.on = false;
    return;
  }
  const n = parseInt(hex.slice(1), 16);
  tint.r = ((n >> 16) & 255) / 255;
  tint.g = ((n >> 8) & 255) / 255;
  tint.b = (n & 255) / 255;
  tint.on = true;
}
