/**
 * Projects.jsx — Fanned deck layout matching certifications.
 *
 * Default: all project cards fanned out like a deck of cards.
 * Hover the area: all cards spread into a 3-col grid simultaneously.
 * Hover individual card in grid: image zooms, info slides up.
 *
 * Same DNA: #080808, Bebas Neue + DM Sans, grain, Framer Motion.
 */

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

// ── PROJECTS DATA ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    number: "01",
    title:  "E-Commerce Platform",
    type:   "Full Stack",
    year:   "2026",
    color:  "#61DAFB",
    image:  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    desc:   "Full-featured e-commerce with client & admin dashboards, stock management, orders, and secure payments.",
    tags:   ["React", "NestJS", "Prisma", "PostgreSQL"],
    link:   "#",
  },
  {
    number: "02",
    title:  "Agriculture SMS Platform",
    type:   "Web & Mobile",
    year:   "2024",
    color:  "#5FA04E",
    image:  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    desc:   "SMS-based agriculture platform with AI features, React Native mobile app, and NestJS backend.",
    tags:   ["React Native", "React", "NestJS", "Tailwind"],
    link:   "#",
  },
  {
    number: "03",
    title:  "Education Platform",
    type:   "Full Stack",
    year:   "2024",
    color:  "#BB4FFF",
    image:  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    desc:   "Online learning platform with course management, student progress tracking, and interactive content.",
    tags:   ["React", "Tailwind CSS", "NestJS", "Prisma"],
    link:   "#",
  },
  {
    number: "04",
    title:  "ERP System",
    type:   "Enterprise",
    year:   "2024",
    color:  "#E0234E",
    image:  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    desc:   "Enterprise resource planning with microservices architecture, Material UI frontend, and NestJS backend.",
    tags:   ["React", "Material UI", "NestJS", "Microservices"],
    link:   "#",
  },
  {
    number: "05",
    title:  "Portfolio Website",
    type:   "Frontend",
    year:   "2025",
    color:  "#F7DF1E",
    image:  "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    desc:   "Cinematic scroll-driven portfolio with Framer Motion, dark theme, and immersive photo transitions.",
    tags:   ["React", "Framer Motion", "Tailwind CSS", "Vite"],
    link:   "#",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp  = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } };

// Fan angles & positions for 5 cards
const FAN = [
  { rotate: -16, x: -220, y: 16, z: 1 },
  { rotate:  -8, x: -110, y:  6, z: 2 },
  { rotate:   0, x:    0, y:  0, z: 3 },
  { rotate:   8, x:  110, y:  6, z: 4 },
  { rotate:  16, x:  220, y: 16, z: 5 },
];

// Grid positions: 3 cols row 0, 2 cols row 1 (centered)
const CARD_W   = 260;
const CARD_GAP = 20;
const GRID_POS = [
  { col: 0, row: 0 },
  { col: 1, row: 0 },
  { col: 2, row: 0 },
  { col: 0.5, row: 1 },
  { col: 1.5, row: 1 },
];
const totalW = 3 * CARD_W + 2 * CARD_GAP;
const startX = -totalW / 2 + CARD_W / 2;

export default function Projects() {
  const headerRef    = useRef(null);
  const sectionRef   = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [spread, setSpread] = React.useState(false);
  const [activeCard, setActiveCard] = React.useState(null);

  return (
    <section className="relative bg-[#080808] overflow-hidden">

      {/* ── Grain ── */}
      <div className="absolute inset-0 opacity-[0.18] pointer-events-none z-0"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "128px" }}
      />
      <div className="absolute top-0 inset-x-0 h-px bg-white/[0.07]" />

      {/* Ghost watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(8rem, 22vw, 28rem)", color: "rgba(255,255,255,0.018)", letterSpacing: "-0.03em", lineHeight: 1, whiteSpace: "nowrap" }}
      >
        WORK
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16">

        {/* ══ HEADER ══ */}
        <motion.div ref={headerRef} className="pt-28 pb-16"
          variants={stagger} initial="hidden" animate={headerInView ? "visible" : "hidden"}
        >
          <motion.p variants={fadeUp} className="mb-4 tracking-[0.4em] text-xs uppercase text-white/25"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Selected Work
          </motion.p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <motion.h2 variants={fadeUp} className="font-black uppercase leading-[0.88] text-white"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(3.5rem, 9vw, 9rem)" }}>
              My{" "}
              <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)", color: "transparent" }}>Projects</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/20 text-xs pb-2 hidden sm:block"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {PROJECTS.length} projects
            </motion.p>
          </div>
        </motion.div>

        {/* ══ FAN DECK ══ */}
        <div ref={sectionRef} className="flex flex-col items-center pb-28">

          {/* Container — hover triggers spread */}
          <div
            className="relative w-full flex justify-center"
            style={{
              height: spread ? "680px" : "380px",
              transition: "height 0.65s cubic-bezier(0.16,1,0.3,1)",
              cursor: spread ? "default" : "pointer",
            }}
            onMouseEnter={() => setSpread(true)}
            onMouseLeave={() => { setSpread(false); setActiveCard(null); }}
          >
            {PROJECTS.map((project, i) => {
              const fan  = FAN[i];
              const grid = GRID_POS[i];
              const isActive = activeCard === i;

              const gx = startX + grid.col * (CARD_W + CARD_GAP);
              const gy = grid.row * (spread ? 320 : 0);

              return (
                <motion.div
                  key={i}
                  className="absolute rounded-2xl overflow-hidden"
                  style={{
                    width: CARD_W,
                    height: 360,
                    transformOrigin: "bottom center",
                    bottom: 0,
                    cursor: spread ? "pointer" : "default",
                    zIndex: isActive ? 30 : spread ? 10 + i : fan.z,
                  }}
                  initial={{ rotate: fan.rotate, x: fan.x, y: 80, opacity: 0 }}
                  animate={sectionInView ? {
                    rotate: spread ? 0 : fan.rotate,
                    x: spread ? gx : fan.x,
                    y: spread ? (isActive ? gy - 12 : gy) : fan.y,
                    scale: isActive ? 1.04 : 1,
                    opacity: 1,
                  } : { rotate: fan.rotate, x: fan.x, y: 80, opacity: 0 }}
                  transition={{
                    duration: 0.55,
                    ease,
                    delay: !sectionInView ? i * 0.09 : spread ? i * 0.04 : i * 0.03,
                  }}
                  onHoverStart={() => spread && setActiveCard(i)}
                  onHoverEnd={() => spread && setActiveCard(null)}
                >
                  {/* Background image */}
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                    animate={{ scale: isActive && spread ? 1.08 : 1 }}
                    transition={{ duration: 0.5, ease }}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15) 100%)" }}
                  />

                  {/* Color tint */}
                  <div className="absolute inset-0 opacity-20"
                    style={{ background: `linear-gradient(135deg, ${project.color}40 0%, transparent 60%)` }}
                  />

                  {/* Border */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      border: `1px solid ${isActive && spread ? project.color + "55" : project.color + "20"}`,
                      boxShadow: isActive && spread ? `0 20px 50px ${project.color}25` : `0 10px 40px rgba(0,0,0,0.7)`,
                      transition: "border-color 0.3s, box-shadow 0.3s",
                    }}
                  />

                  {/* Top — number + type */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                    <span className="font-black text-white/20 leading-none"
                      style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "1.1rem" }}>
                      {project.number}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full backdrop-blur-sm"
                      style={{ fontFamily: "'DM Sans', sans-serif", background: `${project.color}20`, border: `1px solid ${project.color}30`, color: project.color }}>
                      {project.type}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 inset-x-0 p-5">

                    {/* Top color bar */}
                    <div className="absolute bottom-0 inset-x-0 h-[3px]"
                      style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}00)` }}
                    />

                    <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>{project.year}</p>

                    <h3 className="font-black uppercase leading-none text-white"
                      style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", textShadow: `0 0 20px ${project.color}30` }}>
                      {project.title}
                    </h3>

                    {/* Expanded on hover */}
                    <motion.div
                      className="overflow-hidden"
                      animate={{
                        height: isActive && spread ? "auto" : 0,
                        opacity: isActive && spread ? 1 : 0,
                        marginTop: isActive && spread ? 10 : 0,
                      }}
                      transition={{ duration: 0.35, ease }}
                    >
                      <p className="text-white/50 text-xs leading-relaxed mb-3"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}>{project.desc}</p>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2.5 py-0.5 rounded-full"
                            style={{ fontFamily: "'DM Sans', sans-serif", background: `${project.color}15`, border: `1px solid ${project.color}25`, color: `${project.color}85` }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <motion.a href={project.link}
                        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
                        style={{ fontFamily: "'DM Sans', sans-serif", background: `${project.color}18`, border: `1px solid ${project.color}35`, color: project.color }}
                        whileHover={{ background: `${project.color}28` }}
                      >
                        View Project
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.a>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Hint */}
          <motion.p
            className="mt-4 text-white/15 text-[11px] tracking-widest uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            animate={{ opacity: spread ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            Hover to explore projects
          </motion.p>
        </div>

        {/* ══ FOOTER ══ */}
        <div className="flex items-center justify-between border-t border-white/[0.07] pb-24 pt-8">
          <p className="text-white/15 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            More on GitHub
          </p>
          <motion.a
            href="https://github.com/yourhandle"
            target="_blank" rel="noopener noreferrer"
            className="text-white/40 text-xs uppercase tracking-widest hover:text-white/80 transition-colors duration-200 flex items-center gap-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            whileHover={{ x: 4 }}
          >
            View All ↗
          </motion.a>
        </div>

      </div>
    </section>
  );
}
