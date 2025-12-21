import { lazy, Suspense, useEffect, useState } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import type { CVData } from "./types";

const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const [data, setData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const companyCode = params.get("cc");
    const dataPath = companyCode
      ? `/data/sam-${companyCode}.json`
      : "/data/sam.json";

    fetch(dataPath)
      .then((res) => res.json())
      .then((json: CVData) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load CV data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!data) {
    return <div className="error">Failed to load data</div>;
  }

  return (
    <>
      <div className="bg-grid" />
      <Navbar logo={data.personal.logo} navigation={data.navigation} />
      <Hero personal={data.personal} languages={data.languages} />
      <Suspense fallback={null}>
        <Skills skills={data.skills} />
        <Experience experience={data.experience} />
        <Projects projects={data.projects} />
        <Contact contact={data.contact} personal={data.personal} />
        <Footer personal={data.personal} />
      </Suspense>
    </>
  );
}

export default App;
