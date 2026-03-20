import Contact from "./Contact";
import Experience from "./Experience";
import Experience1 from "./Experience1";
import Hero from "./Hero";
import Skills from "./Skills";

export default function App() {
  return (
    <main className="bg-black">
      <Hero />
      
      {/* ── Example section below the hero ── */}
      <section className="flex min-h-screen items-center justify-center bg-black">
        <p
          className="text-white/30 text-lg tracking-widest uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          — Your Content Continues Here —
        </p>
      </section>
      <Skills/>
      <Experience/>
      {/* <Experience1/> */}
      <Contact/>
    </main>
  );
}
