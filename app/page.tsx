import { FlowerCanvas } from "@/components/FlowerCanvas";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { ShippedProducts } from "@/components/ShippedProducts";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative isolate">
      <FlowerCanvas />
      <Navbar />
      <Hero />
      <About />
      <Achievements />
      <ShippedProducts />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
