import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import SmartConsultant from './components/SmartConsultant';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-titanix-dark min-h-screen text-titanix-text selection:bg-titanix-yellow selection:text-black">
      <Header />
      <main>
        <Hero />
        <TechStack />
        <About />
        <Services />
        <Portfolio />
        <SmartConsultant />
      </main>
      <Footer />
    </div>
  );
};

export default App;