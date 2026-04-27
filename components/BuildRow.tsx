import { Projects } from "./Projects";

export function BuildRow() {
  return (
    <section id="projects" className="px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Projects />
      </div>
    </section>
  );
}
