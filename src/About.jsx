/**
 * About.jsx — Maximum cinematic About Me
 *
 * Design: Full-screen dark section with a large tilted photo frame
 * on the right, massive edge-bleeding Bebas Neue text on the left,
 * animated stat counters, a horizontal scrolling tag strip,
 * and a bold quote that fades in on scroll.
 *
 * Scroll-triggered reveals via Framer Motion useInView.
 * Same DNA: #080808, grain, Bebas Neue + DM Sans.
 */

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];
import me from "./assets/me.jpg"

// ── YOUR PHOTO ───────────────────────────────────────────────────────────────
const MY_PHOTO = me;
// ─────────────────────────────────────────────────────────────────────────────

// ── YOUR DATA ────────────────────────────────────────────────────────────────
const STATS = [
  { value: 2,   suffix: "+", label: "Years Experience" },
  { value: 15,  suffix: "+", label: "Projects Shipped" },
  { value: 3,   suffix: "",  label: "Companies" },
  { value: 100, suffix: "%", label: "Passion" },
];

const BIO_LINES = [
  "Full Stack Developer based in Tunis.",
  "I build interfaces that feel alive and",
  "backends that scale without breaking.",
  "Team lead. Mentor. Constant learner.",
];

const QUOTE = "Great software isn't built — it's crafted.";

const TAGS = [
  "React", "NestJS", "TypeScript", "Node.js", "UI/UX",
  "Clean Code", "Team Lead", "Mentoring", "Open Source",
  "React Native", "PostgreSQL", "Docker", "Problem Solver",
];

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/yourhandle" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
  { label: "Email",    href: "mailto:hello@yourname.com" },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function About() {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const statsRef    = useRef(null);
  const quoteRef    = useRef(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.2 });
  const statsInView  = useInView(statsRef,  { once: true, amount: 0.3 });
  const quoteInView  = useInView(quoteRef,  { once: true, amount: 0.5 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const photoY     = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const photoRotate= useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const bgY        = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={sectionRef} className="relative bg-[#080808] overflow-hidden">

      {/* ── Grain ── */}
      <div className="absolute inset-0 opacity-[0.18] pointer-events-none z-0"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "128px" }}
      />
      <div className="absolute top-0 inset-x-0 h-px bg-white/[0.07]" />

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO-STYLE INTRO
      ══════════════════════════════════════════ */}
      <div ref={headerRef} className="relative min-h-screen flex items-center overflow-hidden">

        {/* Full-bleed photo background */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${MY_PHOTO})`, y: photoY, scale: 1.12 }}
        />

        {/* Layered overlays */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.4) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)" }} />
        <div className="absolute inset-0 opacity-15" style={{ background: "radial-gradient(ellipse 80% 80% at 70% 50%, #61DAFB15, transparent)" }} />

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 py-28">

          {/* Label */}
          <motion.p
            className="mb-6 tracking-[0.4em] text-xs uppercase text-white/25"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            About Me
          </motion.p>

          {/* Massive bio lines */}
          <div className="flex flex-col gap-1 mb-12">
            {BIO_LINES.map((line, i) => (
              <motion.p key={i}
                className="font-black uppercase leading-none text-white"
                style={{
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                  fontSize: "clamp(2.2rem, 6vw, 6.5rem)",
                  color: i % 2 === 1 ? "transparent" : "white",
                  WebkitTextStroke: i % 2 === 1 ? "1.5px rgba(255,255,255,0.35)" : undefined,
                  textShadow: i % 2 === 0 ? "0 2px 30px rgba(0,0,0,0.6)" : undefined,
                }}
                initial={{ opacity: 0, x: -60 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.85, ease, delay: 0.1 + i * 0.1 }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Bottom row — availability + socials */}
          <motion.div
            className="flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
          >
            {/* Availability */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-emerald-400/75 text-xs uppercase tracking-widest"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Available for work
              </span>
            </div>

            <span className="text-white/15 hidden sm:block">|</span>

            {/* Socials */}
            {SOCIALS.map(({ label, href }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="text-white/35 text-xs uppercase tracking-widest hover:text-white/80 transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                whileHover={{ x: 3 }}
              >
                {label} ↗
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Tilted photo frame — right side, desktop only */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:block"
          style={{ y: photoY, rotate: photoRotate }}
        >
          {/* Frosted card frame */}
          <div className="absolute inset-8 rounded-3xl overflow-hidden"
            style={{ border: "1px solid rgba(97,218,251,0.15)", boxShadow: "0 0 80px rgba(97,218,251,0.08), inset 0 1px 0 rgba(255,255,255,0.06)" }}
          >
            <div className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${MY_PHOTO})`, filter: "brightness(0.8) saturate(0.9)" }}
            />
            {/* Inner overlay */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7) 100%)" }} />
            {/* Top color bar */}
            <div className="absolute top-0 inset-x-0 h-[3px]" style={{ background: "linear-gradient(90deg, #61DAFB, #61DAFB00)" }} />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <span className="block h-4 w-px bg-white/20" />
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 2 — STATS + QUOTE
      ══════════════════════════════════════════ */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-24">

        {/* Stats row */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.05] mb-24"
        >
          {STATS.map((stat, i) => (
            <motion.div key={i}
              className="bg-[#080808] px-8 py-10 flex flex-col gap-2"
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
            >
              <div className="flex items-end gap-1">
                <AnimatedNumber value={stat.value} inView={statsInView} />
                <span className="font-black text-white/60 leading-none mb-1"
                  style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "2rem" }}>
                  {stat.suffix}
                </span>
              </div>
              <p className="text-white/30 text-xs uppercase tracking-widest"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Big quote */}
        <motion.div ref={quoteRef} className="mb-24 max-w-4xl">
          <motion.p
            className="font-black uppercase leading-none text-white"
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: "clamp(2.5rem, 7vw, 7rem)",
              textShadow: "0 2px 40px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0 }}
            animate={quoteInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, ease }}
          >
            {QUOTE.split(" ").map((word, i) => (
              <motion.span key={i}
                className="inline-block mr-[0.2em]"
                style={{ color: i > 2 ? "transparent" : "white", WebkitTextStroke: i > 2 ? "1.5px rgba(255,255,255,0.3)" : undefined }}
                initial={{ opacity: 0, y: 30 }}
                animate={quoteInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease, delay: i * 0.06 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        {/* Horizontal scrolling tag strip */}
        <div className="relative overflow-hidden mb-0">
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10"
            style={{ background: "linear-gradient(to right, #080808, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10"
            style={{ background: "linear-gradient(to left, #080808, transparent)" }} />
          <motion.div
            className="flex gap-3 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...TAGS, ...TAGS].map((tag, i) => (
              <span key={i}
                className="shrink-0 text-[11px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/[0.08] text-white/30"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// ── ANIMATED NUMBER COUNTER ───────────────────────────────────────────────────
function AnimatedNumber({ value, inView }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="font-black text-white leading-none"
      style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
      {display}
    </span>
  );
}
