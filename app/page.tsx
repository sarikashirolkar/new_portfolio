import { FlowerCanvas } from "@/components/FlowerCanvas";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WorkRow } from "@/components/WorkRow";
import { Experience } from "@/components/Experience";
import { BuildRow } from "@/components/BuildRow";
import { SkillsRow } from "@/components/SkillsRow";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative isolate">
      <FlowerCanvas />
      <Navbar />
      <Hero />
      <WorkRow />
      <Experience />
      <BuildRow />
      <SkillsRow />
      <Contact />
    </main>
  );
}
