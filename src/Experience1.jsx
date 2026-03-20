/**
 * Experience.jsx — Cinematic Experience / Timeline section
 *
 * Layout: vertical timeline with cards on alternating sides (desktop),
 * single column on mobile. Each card flips/reveals on scroll entrance.
 *
 * Same aesthetic DNA as the rest of the site:
 *  - #080808 background
 *  - Bebas Neue + DM Sans
 *  - Grain overlay, ghost watermark
 *  - Framer Motion scroll-triggered entrance
 *  - Brand-colored accent dots on the timeline
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

// ── EXPERIENCE DATA ──────────────────────────────────────────────────────────
const EXPERIENCES = [
  {
    period:   "Jan 2026 — Present",
    role:     "Full Stack Developer",
    company:  "Freelance",
    location: "Remote",
    type:     "Freelance",
    color:    "#61DAFB",
    tags:     ["React", "NestJS", "Prisma", "Admin"],
    bullets: [
      "Working on an e-commerce project that includes both the client and admin sides, designing and developing modern interfaces in React.",
      "Built a robust backend with NestJS and Prisma, integrating modules for stock management, product management, orders, and other essential business features.",
      "Ensuring performance, security, and scalability of the application.",
    ],
  },
   {
    period:   "Aug 2025 — Jan 2026",
    role:     "Team Lead / Full Stack Developer",
    company:  "TUNIR",
    location: "Tunis, TN",
    type:     "Full-time",
    color:    "#5FA04E",
    tags:     ["React Native", "React", "Tailwind CSS", "NestJS", "Prisma", "AI"],
    bullets: [
      "Contributed to the development of several projects, including a mobile application and a web platform for SMS in the field of agriculture, using React Native, React, and Tailwind CSS with a backend in NestJS and Prisma, including AI-based features.",
      "Participated in the creation of an online education platform, with a frontend in React and Tailwind CSS and a backend in NestJS and Prisma.",
      "Transitioned to a team lead role, ensuring technical coordination, developer mentoring, and conducting technical interviews for recruiting new team members.",
    ],
  },
  {
    period:   "Jul 2025 — Dec 2025",
    role:     "Supervisor / Technical Lead & Tech Interviewer",
    company:  "SFECTORIA",
    location: "Tunis, TN",
    type:     "Full-time",
    color:    "#FF9900",
    tags:     ["Leadership", "Tech Interviews", "Mentoring", "Architecture"],
    bullets: [
      "Supervised and technically led development teams, ensuring delivery quality, code standards, and project timelines.",
      "Conducted technical interviews for recruiting new developers, evaluating candidates on architecture, coding skills, and problem-solving.",
      "Coordinated workload distribution across team members and ensured alignment between business requirements and technical solutions.",
    ],
  },
  {
    period:   "Jul 2024 — Oct 2024",
    role:     "Team Lead / Full Stack Developer (Intern)",
    company:  "SFECTORIA",
    location: "Tunis, TN",
    type:     "Internship",
    color:    "#E0234E",
    tags:     ["React", "Material UI", "NestJS", "Prisma", "Microservices"],
    bullets: [
      "Contributed to the development of an ERP project, handling the design and development of the frontend with React and Material-UI (MUI) and the backend with NestJS and Prisma.",
      "The project followed a microservices architecture, enabling efficient communication between services, a clear code structure, and modular and scalable data management.",
      "Grew into a team lead role, managing developer guidance, task coordination, workload distribution, and project progress tracking to ensure the delivery of reliable and business-fit solutions.",
    ],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

function CardVariants(side) {
  return {
    hidden: { opacity: 0, x: side === "left" ? -50 : 50, y: 20 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.9, ease } },
  };
}

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export default function Experience() {
  const headerRef    = useRef(null);
  const gridRef      = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
  const gridInView   = useInView(gridRef,   { once: true, amount: 0.05 });

  return (
    <section className="relative bg-[#080808] overflow-hidden py-28 px-6 md:px-16">

      {/* ── Grain ── */}
      <div className="absolute inset-0 opacity-[0.18] pointer-events-none z-0"
        // style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "128px" }}
      />

      {/* ── Top separator ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/[0.07]" />

      {/* ── Ghost watermark ── */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(8rem, 22vw, 28rem)", color: "rgba(255,255,255,0.018)", letterSpacing: "-0.03em", lineHeight: 1, whiteSpace: "nowrap" }}
      >
        JOURNEY
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ══ HEADER ══ */}
        <motion.div ref={headerRef} className="mb-20"
          variants={containerVariants} initial="hidden" animate={headerInView ? "visible" : "hidden"}
        >
          <motion.p variants={headerVariants}
            className="mb-4 tracking-[0.4em] text-xs uppercase text-white/25"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Career
          </motion.p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <motion.h2 variants={headerVariants}
              className="font-black uppercase leading-[0.88] text-white"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(3.5rem, 9vw, 9rem)" }}
            >
              My{" "}
              <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)", color: "transparent" }}>
                Journey
              </span>
            </motion.h2>
            <motion.p variants={headerVariants}
              className="text-white/20 text-xs pb-2 hidden sm:block"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {EXPERIENCES.length} positions · 2+ years
            </motion.p>
          </div>
        </motion.div>

        {/* ══ TIMELINE ══ */}
        <motion.div ref={gridRef}
          variants={containerVariants} initial="hidden" animate={gridInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Center vertical line — desktop only */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.07] hidden lg:block" />

          <div className="flex flex-col gap-12">
            {EXPERIENCES.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="relative flex flex-col lg:flex-row items-start lg:items-center gap-6">

                  {/* ── LEFT CARD (even index on desktop) ── */}
                  <div className={`w-full lg:w-[calc(50%-2rem)] ${isLeft ? "lg:order-1" : "lg:order-3 lg:ml-auto"}`}>
                    <motion.div
                      variants={CardVariants(isLeft ? "left" : "right")}
                      className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm p-7 overflow-hidden"
                      style={{ boxShadow: "0 0 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)" }}
                      whileHover={{ borderColor: `${exp.color}30`, transition: { duration: 0.3 } }}
                    >
                      {/* Color glow on hover */}
                      <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                        style={{ background: `radial-gradient(ellipse 80% 60% at ${isLeft ? "100%" : "0%"} 50%, ${exp.color}08 0%, transparent 70%)` }}
                      />

                      {/* Top row — period + type badge */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-[11px] uppercase tracking-[0.25em] text-white/30"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {exp.period}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest border rounded-full px-3 py-0.5"
                          style={{ fontFamily: "'DM Sans', sans-serif", borderColor: `${exp.color}30`, color: `${exp.color}80` }}>
                          {exp.type}
                        </span>
                      </div>

                      {/* Role */}
                      <h3 className="font-black uppercase leading-none text-white mb-1"
                        style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", textShadow: `0 0 40px ${exp.color}20` }}
                      >
                        {exp.role}
                      </h3>

                      {/* Company + location */}
                      <div className="flex items-center gap-2 mb-5">
                        <span className="text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif", color: exp.color }}>
                          {exp.company}
                        </span>
                        <span className="text-white/20 text-xs">·</span>
                        <span className="text-white/30 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {exp.location}
                        </span>
                      </div>

                      {/* Bullets */}
                      <ul className="flex flex-col gap-2 mb-6">
                        {exp.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-white/45 text-sm leading-relaxed"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: exp.color }} />
                            {b}
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span key={tag}
                            className="rounded-full px-3 py-1 text-[11px]"
                            style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: `${exp.color}10`, border: `1px solid ${exp.color}20`, color: `${exp.color}80` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* ── CENTER DOT ── desktop only ── */}
                  <motion.div
                    variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease } } }}
                    className="hidden lg:flex order-2 shrink-0 flex-col items-center gap-2 z-10"
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-[#080808]"
                      style={{ backgroundColor: exp.color, boxShadow: `0 0 16px ${exp.color}60` }}
                    />
                  </motion.div>

                  {/* ── YEAR LABEL beside dot ── desktop only ── */}
                  <div className={`hidden lg:block w-[calc(50%-2rem)] order-${isLeft ? "3" : "1"} ${!isLeft ? "text-right" : ""}`}>
                    <motion.p
                      variants={CardVariants(isLeft ? "right" : "left")}
                      className="text-white/15 text-xs tracking-widest uppercase pt-1"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {exp.period.split("—")[0].trim()}
                    </motion.p>
                  </div>

                </div>
              );
            })}
          </div>

          {/* End cap dot */}
          <motion.div
            className="hidden lg:flex justify-center mt-12"
            initial={{ opacity: 0 }} animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </motion.div>
        </motion.div>

        {/* ══ FOOTER ══ */}
        <motion.div className="mt-16 pt-8 border-t border-white/[0.07] flex items-center justify-between"
          initial={{ opacity: 0 }} animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <p className="text-white/15 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {/* ← Replace */}
            Open to new opportunities
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-emerald-400/60 text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Available
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
