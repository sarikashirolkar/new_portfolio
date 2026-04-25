import { AuroraCanvas } from "@/components/AuroraCanvas";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { ShippedProducts } from "@/components/ShippedProducts";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Chatbot } from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="relative">
      <AuroraCanvas />
      <Navbar />
      <Hero />
      <About />
      <Achievements />
      <ShippedProducts />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Chatbot />
    </main>
  );
}
