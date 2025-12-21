import { useEffect, useState } from "react";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import type { CVData } from "./types";

function App() {
  const [data, setData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/sam.json")
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
      <Skills skills={data.skills} />
      <Experience experience={data.experience} />
      <Projects projects={data.projects} />
      <Contact contact={data.contact} personal={data.personal} />
      <Footer personal={data.personal} />
    </>
  );
}

export default App;
