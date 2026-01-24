import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import ClientLogos from './components/ClientLogos';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import SmartConsultant from './components/SmartConsultant';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  return (
    <>
      <LoadingScreen />
      <div className="bg-titanix-dark min-h-screen text-titanix-text">
        <Header />
        <main>
          <Hero />
          <TechStack />
          <ClientLogos />
          <About />
          <Services />
          <Portfolio />
          <SmartConsultant />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;