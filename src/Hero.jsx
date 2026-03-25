/**
 * Hero.jsx — Scroll-driven cinematic portfolio hero section
 * Uses Framer Motion's useScroll + useTransform for physics-based transitions
 * Three image "scenes" fade/scale/rotate as the user scrolls through.
 */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import photo1 from "./assets/image1.jpeg"
import photo2 from "./assets/image2.jpeg"
import photo3 from "./assets/image3.jpeg"

// ─── REPLACE THESE URLS WITH YOUR OWN PHOTOS ────────────────────────────────
const PHOTO_1 = photo1 // front-facing photo
const PHOTO_2 = photo2 // side-face photo
const PHOTO_3 = photo3;  // third pose
// ─────────────────────────────────────────────────────────────────────────────

export default function Hero() {
  // The tall scroll container — height controls how long the animation plays
  const containerRef = useRef(null);

  // Track scroll progress within the container (0 → 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── IMAGE OPACITIES ────────────────────────────────────────────────────────
  // Photo 1: visible at top, fades out at 33 % scroll
  const opacity1 = useTransform(scrollYProgress, [0, 0.28, 0.38], [1, 1, 0]);
  // Photo 2: fades in around 33 %, fades out around 66 %
  const opacity2 = useTransform(scrollYProgress, [0.28, 0.38, 0.62, 0.72], [0, 1, 1, 0]);
  // Photo 3: fades in at 66 %, stays until end
  const opacity3 = useTransform(scrollYProgress, [0.62, 0.72], [0, 1]);

  // ── SUBTLE PARALLAX / TRANSFORM on each image ─────────────────────────────
  const scale1  = useTransform(scrollYProgress, [0, 0.38], [1, 1.08]);
  const rotate2 = useTransform(scrollYProgress, [0.28, 0.72], [-4, 4]); // gentle rock
  const y3      = useTransform(scrollYProgress, [0.62, 1],   [30, -20]); // float upward

  // ── SCENE 1 TEXT: visible at start, fades out as scene 1 fades ───────────
  const nameY       = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.18, 0.38], [1, 1, 0]);

  // ── SCENE 2 TEXT: fades in with scene 2, fades out with scene 2 ──────────
  const text2Y       = useTransform(scrollYProgress, [0.28, 0.38, 0.62, 0.72], [40, 0, 0, -40]);
  const text2Opacity = useTransform(scrollYProgress, [0.28, 0.42, 0.60, 0.72], [0, 1, 1, 0]);

  // ── SCENE 3 TEXT: fades in with scene 3, stays until end ─────────────────
  const text3Y       = useTransform(scrollYProgress, [0.62, 0.75], [40, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.62, 0.76], [0, 1]);

  // ── SCROLL INDICATOR opacity — hides once user starts scrolling ───────────
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    /**
     * Outer container is 300 vh tall so the user scrolls through three
     * "scenes". The sticky inner div pins the visual to the viewport.
     */
    <div ref={containerRef} id="hero" className="relative" style={{ height: "300vh" }}>

      {/* ── STICKY VIEWPORT ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        {/* ── PHOTO LAYERS (stacked, each absolutely positioned) ── */}

        {/* Scene 1 — front-facing */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${PHOTO_1})`,
            opacity: opacity1,
            scale: scale1,
          }}
        />

        {/* Scene 2 — side face, with rotation */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${PHOTO_2})`,
            opacity: opacity2,
            rotate: rotate2,
          }}
        />

        {/* Scene 3 — third pose, floats upward */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${PHOTO_3})`,
            opacity: opacity3,
            y: y3,
          }}
        />

        {/* ── DARK OVERLAY for text readability ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

        {/* ── GRAIN TEXTURE OVERLAY (aesthetic depth) ── */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* ════════════════════════════════════════════════════════════
            SCENE 1 TEXT — Name + title (visible at top)
        ════════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
          style={{ y: nameY, opacity: nameOpacity }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            className="mb-4 tracking-[0.35em] text-xs uppercase text-white/50 font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            Portfolio
          </motion.p>

          {/* ← Replace with your name */}
          <motion.h1
            className="font-black uppercase leading-none text-white"
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              fontSize: "clamp(3.5rem, 14vw, 13rem)",
              letterSpacing: "-0.01em",
              textShadow: "0 2px 40px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Oussema Cherif
          </motion.h1>

          <motion.div
            className="mt-5 flex items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9 }}
          >
            <span className="h-px w-10 bg-white/40" />
            <p className="text-white/80 font-light tracking-widest text-sm uppercase"
               style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Full Stack Developer
            </p>
            <span className="h-px w-10 bg-white/40" />
          </motion.div>

          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.8 }}
          >
            {["React", "Node.js", "TypeScript", "Design"].map((tag) => (
              <span key={tag}
                className="rounded-full border border-white/20 px-4 py-1 text-xs text-white/60 backdrop-blur-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════
            SCENE 2 TEXT — About / My Story (fades in with scene 2)
        ════════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ y: text2Y, opacity: text2Opacity }}
        >
          {/* Section label */}
          <p className="mb-3 tracking-[0.35em] text-xs uppercase text-white/40 font-light"
             style={{ fontFamily: "'DM Sans', sans-serif" }}>
            About Me
          </p>

          {/* Large display word */}
          <h2
            className="font-black uppercase leading-none text-white mb-6"
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              fontSize: "clamp(3rem, 10vw, 9rem)",
              textShadow: "0 2px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* ← Replace with a one-word statement about yourself */}
            The Vision
          </h2>

          {/* Paragraph — ← Replace with your own bio */}
          <p
            className="max-w-lg text-white/75 text-base leading-relaxed font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            I craft digital experiences that sit at the intersection of clean
            engineering and bold design. 2 years building products people
            actually love — from early-stage startups to scale.
          </p>

          {/* Divider + stat row */}
          <div className="mt-8 flex items-center gap-10">
            {[["2+", "Years Exp."], ["10+", "Projects"], ["100%", "Passion"]].map(([num, label]) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span
                  className="text-white font-black"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
                >
                  {num}
                </span>
                <span className="text-white/40 text-xs tracking-widest uppercase"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════
            SCENE 3 TEXT — Work / CTA (fades in with scene 3)
        ════════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ y: text3Y, opacity: text3Opacity }}
        >
          <p className="mb-3 tracking-[0.35em] text-xs uppercase text-white/40 font-light"
             style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Let's Work
          </p>

          <h2
            className="font-black uppercase leading-none text-white"
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              fontSize: "clamp(3rem, 10vw, 9rem)",
              textShadow: "0 2px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* ← Replace with your own CTA headline */}
            Build Together
          </h2>

          {/* Short paragraph ← Replace */}
          <p
            className="mt-6 max-w-md text-white/70 text-base leading-relaxed font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Open to new opportunities, freelance projects, and interesting
            collaborations. Let's make something great.
          </p>

          {/* CTA button */}
          <motion.a
            href="mailto:ousseemacherif@gmail.com"  
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/30 px-8 py-3 text-sm text-white/80 backdrop-blur-sm hover:bg-white/10 transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Get In Touch
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>

        {/* ── SCROLL INDICATOR ── */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: indicatorOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <p
            className="text-white/40 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Scroll
          </p>
          {/* Animated chevron */}
          <motion.div
            className="flex flex-col items-center gap-0.5"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <span className="block h-3 w-px bg-white/40" />
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>

        {/* ── SCENE PROGRESS DOTS (right edge) ── */}
        <SceneDots progress={scrollYProgress} />

      </div>
    </div>
  );
}

/**
 * SceneDots — three small dots on the right edge that highlight
 * the current scene as the user scrolls.
 */
function SceneDots({ progress }) {
  const dot1 = useTransform(progress, [0, 0.28, 0.38], [1, 1, 0.3]);
  const dot2 = useTransform(progress, [0.28, 0.38, 0.62, 0.72], [0.3, 1, 1, 0.3]);
  const dot3 = useTransform(progress, [0.62, 0.72], [0.3, 1]);

  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
      {[dot1, dot2, dot3].map((op, i) => (
        <motion.span
          key={i}
          className="block rounded-full bg-white"
          style={{ opacity: op, width: 6, height: 6 }}
        />
      ))}
    </div>
  );
}