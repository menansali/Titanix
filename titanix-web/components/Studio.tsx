import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { FOUNDER } from '@/lib/data';
import SectionHead from './ui/SectionHead';
import Reveal from './motion/Reveal';
import RevealImage from './motion/RevealImage';

export default function Studio() {
  return (
    <section id="studio" className="section" aria-labelledby="studio-title">
      <SectionHead
        n="06"
        label="Studio"
        id="studio-title"
        title="A small studio. You talk to the people who write the code."
      />

      <div className="mt-12 grid gap-10 md:grid-cols-[18rem_1fr] lg:grid-cols-[22rem_1fr] lg:gap-16">
        <figure>
          <RevealImage className="aspect-[4/5] bg-titanix-deep">
            <Image
              src={FOUNDER.photo}
              alt={`${FOUNDER.name}, ${FOUNDER.role.toLowerCase()} of Titanix`}
              fill
              sizes="(min-width: 1024px) 22rem, (min-width: 768px) 18rem, 100vw"
              className="object-cover grayscale-[35%]"
            />
          </RevealImage>
          <figcaption className="mt-3 flex items-baseline justify-between font-mono text-xs">
            <span className="text-titanix-text">{FOUNDER.name}</span>
            <span className="text-titanix-faint">{FOUNDER.role}</span>
          </figcaption>
        </figure>

        <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-titanix-muted">
          <Reveal as="h3" chars className="wide font-display text-4xl font-extrabold uppercase leading-none tracking-tight text-titanix-text sm:text-5xl">
            Hi, I&apos;m Menan.
          </Reveal>
          <Reveal as="p">
            I studied Computer Science at South East European University, and these days I spend most of my
            time shipping native iOS apps and the backends behind them. Five of them went live on the App
            Store this year.
          </Reveal>
          <Reveal as="p">
            Titanix started in 2021 as a hardware-and-software shop: Arduino, Raspberry Pi, LoRa sensor
            networks, even radio propagation modelling on real terrain. That is why we still take on IoT
            work, and why we are happy to own a product from the firmware to the App Store listing.
          </Reveal>
          <p>
            When I need a tool that does not exist yet, I build it and open-source it. The latest is{' '}
            <a
              href="https://github.com/menansali/ios-ship-doctor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-titanix-text underline decoration-titanix-border underline-offset-4 hover:decoration-titanix-yellow"
            >
              ios-ship-doctor
            </a>
            , which finds the reasons an app would be rejected by App Review before you submit it.
          </p>

          <div className="flex flex-wrap gap-3 pt-3">
            <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5">
              LinkedIn <ArrowUpRight size={15} />
            </a>
            <a href={FOUNDER.github} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5">
              GitHub <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
