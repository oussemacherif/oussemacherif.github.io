/**
 * Education.jsx — Cinematic Education & Certifications
 *
 * Design concept: "Feature film credits" aesthetic
 *
 * EDUCATION — Full-width dramatic entries. Each degree takes the full
 * width with a massive Bebas Neue title that bleeds edge-to-edge,
 * school name in the accent color, and a glowing underline separator.
 *
 * CERTIFICATIONS — Bento-grid style cards with varied sizes,
 * each card has a large icon, colored gradient bg, bold title.
 * Cards animate in with a staggered 3D tilt entrance.
 *
 * Same DNA: #080808, Bebas Neue, DM Sans, grain, ghost text.
 */

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

// ── DATA ──────────────────────────────────────────────────────────────────────
const EDUCATION = [
  {
    degree:   "Bachelor's Degree",
    field:    "Software Engineering",
    school:   "Higher Institute of Computer Science of Kef",
    period:   "2024 — 2027",
    color:    "#61DAFB",
    gpa:      "In Progress",
    desc:     "Focusing on Computer Systems, advanced algorithms, and software architecture.",
  },
  {
    degree:   "Bootcamp Certificate",
    field:    "Full Stack Web Development",
    school:   "ReBootKamp Tunisia",
    period:   "2023 — 2024",
    color:    "#FF4D4D", // Intense red accent for the bootcamp
    gpa:      "Certified",
    desc:     "Intensive immersive program covering modern JavaScript, MERN stack, and agile methodologies.",
  },
  {
    degree:   "Baccalaureate",
    field:    "Mathematics",
    school:   "Zawiet El Magayez High School",
    period:   "2022 — 2023",
    color:    "#F7DF1E",
    gpa:      "Mention Bien",
    desc:     "Scientific stream — high-level mathematics and physics fundamentals.",
  },
];


// ─────────────────────────────────────────────────────────────────────────────

const stagger  = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp   = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } };
const fadeLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease } } };

export default function Education() {
  const headerRef    = useRef(null);
  const eduRef       = useRef(null);
  const certRef      = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const eduInView    = useInView(eduRef,    { once: true, amount: 0.1 });
  const certInView   = useInView(certRef,   { once: true, amount: 0.1 });

  return (
    <section id="education"className="relative bg-[#080808] overflow-hidden">

      {/* ── Grain ── */}
      <div className="absolute inset-0 opacity-[0.18] pointer-events-none z-0"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "128px" }}
      />
      <div className="absolute top-0 inset-x-0 h-px bg-white/[0.07]" />

      {/* ══════════════════════════════════════════
          EDUCATION PART
      ══════════════════════════════════════════ */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 pt-28 pb-24">

        {/* Ghost watermark */}
        <div className="absolute right-0 top-20 select-none pointer-events-none"
          style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(6rem, 18vw, 20rem)", color: "rgba(255,255,255,0.02)", letterSpacing: "-0.03em", lineHeight: 1 }}
        >
          EDU
        </div>

        {/* Header */}
        <motion.div ref={headerRef} variants={stagger} initial="hidden" animate={headerInView ? "visible" : "hidden"} className="mb-20">
          <motion.p variants={fadeUp} className="mb-4 tracking-[0.4em] text-xs uppercase text-white/25" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Background
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-black uppercase leading-[0.88] text-white"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(3.5rem, 9vw, 9rem)" }}
          >
            Education &{" "}
            <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)", color: "transparent" }}>Certs</span>
          </motion.h2>
        </motion.div>

        {/* Education dramatic entries */}
        <motion.div ref={eduRef} variants={stagger} initial="hidden" animate={eduInView ? "visible" : "hidden"}
          className="flex flex-col"
        >
          {EDUCATION.map((edu, i) => (
            <motion.div key={i} variants={fadeLeft}
              className="group relative border-t border-white/[0.06] py-10 last:border-b overflow-hidden"
              whileHover="hovered"
            >
              {/* Full-width color sweep on hover */}
              <motion.div className="absolute inset-0 pointer-events-none"
                style={{ background: `linear-gradient(90deg, ${edu.color}08 0%, transparent 60%)` }}
                variants={{ hovered: { opacity: 1 }, hidden: { opacity: 0 } }}
                initial={{ opacity: 0 }}
              />

              {/* Left thick accent bar */}
              <motion.div className="absolute left-0 top-0 bottom-0 w-[3px]"
                style={{ backgroundColor: edu.color }}
                initial={{ scaleY: 0, originY: 0 }}
                animate={eduInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.7, ease }}
              />

              <div className="pl-8">
                {/* Top meta row */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-white/25" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {edu.period}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/15" />
                  <span className="text-[10px] uppercase tracking-[0.35em] px-3 py-1 rounded-full"
                    style={{ fontFamily: "'DM Sans', sans-serif", background: `${edu.color}15`, color: `${edu.color}90`, border: `1px solid ${edu.color}25` }}
                  >
                    {edu.gpa}
                  </span>
                </div>

                {/* Giant degree + field */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-5 mb-3">
                  <h3 className="font-black uppercase leading-none text-white transition-colors duration-300"
                    style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
                  >
                    {edu.degree}
                  </h3>
                  <span className="font-black uppercase leading-none"
                    style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", color: edu.color }}
                  >
                    {edu.field}
                  </span>
                </div>

                {/* School + location + desc */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-white/50 text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{edu.school}</span>
                    <span className="text-white/20">·</span>
                    <span className="text-white/25 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{edu.desc}</span>
                  </div>
                  {/* Hover arrow */}
                  {/* <motion.span
                    className="text-white/0 text-sm shrink-0"
                    variants={{ hovered: { color: edu.color, x: 0, opacity: 1 }, hidden: { x: -8, opacity: 0 } }}
                    initial={{ opacity: 0 }}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    View ↗
                  </motion.span> */}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}

// ── FAN DECK — hover container to spread all cards into a grid ───────────────
function FanDeck({ certs, inView }) {
  const [spread, setSpread] = React.useState(false);
  const [activeCard, setActiveCard] = React.useState(null);

  const fanProps = [
    { rotate: -20, x: -250, y: 20,  z: 1 },
    { rotate: -12, x: -150, y: 8,   z: 2 },
    { rotate: -4,  x: -50,  y: 2,   z: 3 },
    { rotate:  4,  x:  50,  y: 2,   z: 4 },
    { rotate:  12, x:  150, y: 8,   z: 5 },
    { rotate:  20, x:  250, y: 20,  z: 6 },
  ];

  // Grid positions for 3 columns × 2 rows
  const gridProps = [
    { col: 0, row: 0 }, { col: 1, row: 0 }, { col: 2, row: 0 },
    { col: 0, row: 1 }, { col: 1, row: 1 }, { col: 2, row: 1 },
  ];

  const CARD_W   = 200;
  const CARD_GAP = 20;
  const COLS     = 3;
  const totalW   = COLS * CARD_W + (COLS - 1) * CARD_GAP; // 660px
  const startX   = -totalW / 2 + CARD_W / 2;              // center the grid

  return (
    <div className="flex flex-col items-center">
      {/* Container — hover triggers spread */}
      <div
        className="relative w-full flex justify-center"
        style={{ height: spread ? "520px" : "300px", transition: "height 0.6s cubic-bezier(0.16,1,0.3,1)", cursor: spread ? "default" : "pointer" }}
        onMouseEnter={() => setSpread(true)}
        onMouseLeave={() => { setSpread(false); setActiveCard(null); }}
      >
        {certs.map((cert, i) => {
          const fan  = fanProps[i];
          const grid = gridProps[i];
          const isActive = activeCard === i;

          // Spread position: lay out in 3-col grid centered
          const gx = startX + grid.col * (CARD_W + CARD_GAP);
          const gy = grid.row * (spread ? 260 : 0);

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: CARD_W,
                transformOrigin: "bottom center",
                bottom: 0,
                cursor: spread ? "pointer" : "default",
                zIndex: isActive ? 30 : spread ? 10 + i : fan.z,
              }}
              animate={inView ? {
                rotate: spread ? 0 : fan.rotate,
                x: spread ? gx : fan.x,
                y: spread ? (isActive ? gy - 12 : gy) : fan.y,
                scale: isActive ? 1.04 : 1,
                opacity: 1,
              } : {
                rotate: fan.rotate,
                x: fan.x,
                y: 80,
                opacity: 0,
              }}
              initial={{ rotate: fan.rotate, x: fan.x, y: 80, opacity: 0 }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
                delay: !inView ? i * 0.08 : spread ? i * 0.04 : i * 0.03,
              }}
              onHoverStart={() => spread && setActiveCard(i)}
              onHoverEnd={() => spread && setActiveCard(null)}
            >
              <div
                className="rounded-2xl overflow-hidden relative"
                style={{
                  background: `linear-gradient(160deg, ${cert.color}22 0%, ${cert.color}08 50%, rgba(10,10,10,0.98) 100%)`,
                  border: `1px solid ${isActive && spread ? cert.color + "60" : cert.color + "22"}`,
                  boxShadow: isActive && spread
                    ? `0 20px 50px ${cert.color}30, 0 0 0 1px ${cert.color}25`
                    : `0 8px 32px rgba(0,0,0,0.65)`,
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
              >
                {/* Top color bar */}
                <div className="h-[3px]"
                  style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}00)` }}
                />

                {/* Image */}
                <div className="overflow-hidden" style={{ height: 130 }}>
                  <motion.img
                    src={cert.image} alt={cert.title}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.75) saturate(0.85)" }}
                    animate={{ scale: isActive && spread ? 1.08 : 1 }}
                    transition={{ duration: 0.45 }}
                  />
                </div>

                {/* Card body */}
                <div className="p-4">
                  <span className="inline-block text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif", background: `${cert.color}15`, border: `1px solid ${cert.color}25`, color: cert.color }}
                  >
                    {cert.issuer} · {cert.date}
                  </span>
                  <p className="font-black uppercase leading-tight text-white"
                    style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "1rem", textShadow: isActive && spread ? `0 0 20px ${cert.color}50` : "none" }}
                  >
                    {cert.title}
                  </p>

                  {/* Skills — revealed on card hover when spread */}
                  <motion.div
                    className="flex flex-wrap gap-1 overflow-hidden"
                    animate={{
                      height: isActive && spread ? "auto" : 0,
                      opacity: isActive && spread ? 1 : 0,
                      marginTop: isActive && spread ? 8 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {cert.skills.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{ fontFamily: "'DM Sans', sans-serif", background: `${cert.color}12`, border: `1px solid ${cert.color}20`, color: `${cert.color}85` }}
                      >
                        {s}
                      </span>
                    ))}
                    <div className="w-full flex items-center gap-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cert.color }} />
                      <span className="text-[10px] text-white/25 uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>Verified</span>
                    </div>
                  </motion.div>
                </div>

                {/* Corner glow */}
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 100% 100%, ${cert.color}12 0%, transparent 70%)` }}
                />
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
        Hover to explore certifications
      </motion.p>
    </div>
  );
}