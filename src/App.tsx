import { lazy, Suspense } from "react";
import type { CVData } from "./types";
import defaultData from "./data/sam.json";

const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// Use bundled default data - Navbar and Hero are static HTML in index.html
const data = defaultData as CVData;

function App() {
  return (
    <Suspense fallback={null}>
      <Skills skills={data.skills} />
      <Experience experience={data.experience} />
      <Projects projects={data.projects} />
      <Contact contact={data.contact} personal={data.personal} />
      <Footer personal={data.personal} />
    </Suspense>
  );
}

export default App;
