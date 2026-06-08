import StarsBackground from "../components/layout/StarsBackground";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Certificates from "../components/sections/Certificates";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact/Contact";
import Footer from "../components/sections/Footer";
import ScrollUpButton from "../components/layout/ScrollUpButton";

function Home() {
  return (
    <div className="min-h-screen bg-darkBackground text-background">
      <StarsBackground />
      <ScrollUpButton />
      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <Projects />
      </section>

      {/* Skills / Tech Section */}
      <section id="tech">
        <Skills />
      </section>
      
      {/* Certificates Section */}
      <section id="certificates">
        <Certificates />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
