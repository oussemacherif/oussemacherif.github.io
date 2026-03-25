import About from "./About";
import Contact from "./Contact";
import Education from "./Education";
import Experience from "./Experience";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Projects from "./Projects";
import Skills from "./Skills";

export default function App() {
  return (
    <main className="bg-black">
      <Navbar/>
      <Hero />
      
      {/* ── Example section below the hero ── */}
      {/* <section className="flex min-h-screen items-center justify-center bg-black">
        <p
          className="text-white/30 text-lg tracking-widest uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
        </p>
      </section> */}
      {/* <About/> */}
      <Skills/>
      <Projects/>
      <Experience/>
      <Education/>
      <Contact/>
    </main>
  );
}
