import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';
import TechStack from '../components/TechStack';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Certificates />
      <TechStack />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
}
