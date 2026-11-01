import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Showreel from '@/components/Showreel';
import Work from '@/components/Work';
import Studio from '@/components/Studio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Proof from '@/components/Proof';
import Offers from '@/components/Offers';
import MobileCTA from '@/components/MobileCTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Showreel />
        <Work />
        <Proof />
        <Offers />
        <Studio />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
