import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Focus from '@/components/Focus';
import Work from '@/components/Work';
import Studio from '@/components/Studio';
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
        <Focus />
        <Work />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
