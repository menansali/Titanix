import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Showreel from '@/components/Showreel';
import Pipeline from '@/components/Pipeline';
import LiveAir from '@/components/LiveAir';
import Focus from '@/components/Focus';
import Work from '@/components/Work';
import Process from '@/components/Process';
import Studio from '@/components/Studio';
import LabLog from '@/components/LabLog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Showreel />
        <LiveAir />
        <Focus />
        <Pipeline />
        <Work />
        <Process />
        <Studio />
        <LabLog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
