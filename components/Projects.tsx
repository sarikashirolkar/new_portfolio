import { loadEnrichedProjects } from "@/lib/github";
import { ProjectsScroll } from "./ProjectsScroll";

export async function Projects() {
  const projects = await loadEnrichedProjects();
  return <ProjectsScroll projects={projects} />;
}
