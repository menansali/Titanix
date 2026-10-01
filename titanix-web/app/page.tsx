import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import LiveAir from '@/components/LiveAir';
import Focus from '@/components/Focus';
import Work from '@/components/Work';
import Process from '@/components/Process';
import Studio from '@/components/Studio';
import AskTitanix from '@/components/AskTitanix';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <LiveAir />
        <Focus />
        <Work />
        <Process />
        <Studio />
        <AskTitanix />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
