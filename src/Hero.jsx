/**
 * Hero.jsx — Scroll-driven cinematic portfolio hero section
 * Uses Framer Motion's useScroll + useTransform for physics-based transitions
 * Three image "scenes" fade/scale/rotate as the user scrolls through.
 */

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

import photo1 from "./assets/image1.jpeg";
import photo2 from "./assets/image2.jpeg";
import photo3 from "./assets/image3.jpeg";

const PHOTO_1 = photo1;
const PHOTO_2 = photo2;
const PHOTO_3 = photo3;

export default function Hero() {
  const containerRef = useRef(null);
  const [showResumeModal, setShowResumeModal] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── IMAGE OPACITIES ────────────────────────────────────────────────────────
  const opacity1 = useTransform(scrollYProgress, [0, 0.28, 0.38], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.28, 0.38, 0.62, 0.72], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.62, 0.72], [0, 1]);

  // ── TRANSFORMS ────────────────────────────────────────────────────────────
  const scale1  = useTransform(scrollYProgress, [0, 0.38], [1, 1.08]);
  const rotate2 = useTransform(scrollYProgress, [0.28, 0.72], [-4, 4]);
  const y3      = useTransform(scrollYProgress, [0.62, 1],   [30, -20]);

  // ── SCENE 1 TEXT ──────────────────────────────────────────────────────────
  const nameY       = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.18, 0.38], [1, 1, 0]);

  // ── SCENE 2 TEXT ──────────────────────────────────────────────────────────
  const text2Y       = useTransform(scrollYProgress, [0.28, 0.38, 0.62, 0.72], [40, 0, 0, -40]);
  const text2Opacity = useTransform(scrollYProgress, [0.28, 0.42, 0.60, 0.72], [0, 1, 1, 0]);

  // ── SCENE 3 TEXT ──────────────────────────────────────────────────────────
  const text3Y       = useTransform(scrollYProgress, [0.62, 0.75], [40, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.62, 0.76], [0, 1]);

  // ── SCROLL INDICATOR ──────────────────────────────────────────────────────
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <div ref={containerRef} id="hero" className="relative" style={{ height: "300vh" }}>

      {/* ── STICKY VIEWPORT ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        {/* ── PHOTO LAYERS ── */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${PHOTO_1})`, opacity: opacity1, scale: scale1 }}
        />
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${PHOTO_2})`, opacity: opacity2, rotate: rotate2 }}
        />
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${PHOTO_3})`, opacity: opacity3, y: y3 }}
        />

        {/* ── DARK OVERLAY ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

        {/* ── GRAIN OVERLAY ── */}
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
            SCENE 1 — Name + Title
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
            <p
              className="text-white/80 font-light tracking-widest text-sm uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
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
              <span
                key={tag}
                className="rounded-full border border-white/20 px-4 py-1 text-xs text-white/60 backdrop-blur-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════
            SCENE 2 — About / My Story
        ════════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ y: text2Y, opacity: text2Opacity }}
        >
          <p
            className="mb-3 tracking-[0.35em] text-xs uppercase text-white/40 font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            About Me
          </p>

          <h2
            className="font-black uppercase leading-none text-white mb-6"
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              fontSize: "clamp(3rem, 10vw, 9rem)",
              textShadow: "0 2px 40px rgba(0,0,0,0.6)",
            }}
          >
            The Vision
          </h2>

          <p
            className="max-w-lg text-white/75 text-base leading-relaxed font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            I craft digital experiences that sit at the intersection of clean
            engineering and bold design. 2 years building products people
            actually love — from early-stage startups to scale.
          </p>

          <div className="mt-8 flex items-center gap-10">
            {[["2+", "Years Exp."], ["10+", "Projects"], ["100%", "Passion"]].map(([num, label]) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span
                  className="text-white font-black"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
                >
                  {num}
                </span>
                <span
                  className="text-white/40 text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════
            SCENE 3 — CTA + Resume Modal Trigger + Socials
        ════════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ y: text3Y, opacity: text3Opacity }}
        >
          <p
            className="mb-3 tracking-[0.35em] text-xs uppercase text-white/40 font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
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
            Build Together
          </h2>

          <p
            className="mt-6 max-w-md text-white/70 text-base leading-relaxed font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Open to new opportunities, freelance projects, and interesting
            collaborations. Let's make something great.
          </p>

          {/* ── BUTTON ROW ── */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

            {/* Get In Touch */}
            <motion.a
              href="mailto:ousseemacherif@gmail.com"
              className="inline-flex items-center gap-3 rounded-full border border-white/30 px-8 py-3 text-sm text-white/80 backdrop-blur-sm hover:bg-white/10 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Get In Touch
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>

            {/* Resume — triggers modal */}
            <motion.button
              onClick={() => setShowResumeModal(true)}
              className="inline-flex items-center gap-3 rounded-full border border-white/30 px-8 py-3 text-sm text-white/80 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Resume
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v8M3.5 6l3.5 4 3.5-4M1 11.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>

          {/* ── SOCIAL ICONS ── */}
          <div className="mt-6 flex items-center gap-5">
            <span className="h-px w-8 bg-white/20" />

            {/* GitHub */}
            <motion.a
              href="https://github.com/oussemacherif"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/90 transition-colors"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.218.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/oussema-cherif-881842290"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/90 transition-colors"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>

            <span className="h-px w-8 bg-white/20" />
          </div>
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

        {/* ── SCENE PROGRESS DOTS ── */}
        <SceneDots progress={scrollYProgress} />

      </div>

      {/* ════════════════════════════════════════════════════════════
          RESUME MODAL
      ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showResumeModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowResumeModal(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

            {/* Card */}
            <motion.div
              className="relative z-10 flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-[#0c0c0c] px-12 py-10"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setShowResumeModal(false)}
                className="absolute top-4 right-4 text-white/30 hover:text-white/80 transition-colors"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Label */}
              <p
                className="tracking-[0.3em] text-xs uppercase text-white/40"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Choose Language
              </p>

              {/* Title */}
              <h3
                className="font-black uppercase text-white leading-none -mt-2"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                }}
              >
                Download Resume
              </h3>

              {/* Options */}
              <div className="flex gap-4 mt-1">

                {/* English */}
                <motion.a
                  href="/resume-en.pdf"
                  download="Oussema_Cherif_Resume_EN.pdf"
                  className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 px-8 py-6 hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowResumeModal(false)}
                >
                  <span className="text-3xl select-none">🇬🇧</span>
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className="text-white font-semibold text-sm tracking-wide"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      English
                    </span>
                    <span
                      className="text-white/30 text-xs"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      EN version
                    </span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white/30 group-hover:text-white/70 transition-colors">
                    <path d="M7 1v8M3.5 6l3.5 4 3.5-4M1 11.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.a>

                {/* French */}
                <motion.a
                  href="/resume-fr.pdf"
                  download="Oussema_Cherif_Resume_FR.pdf"
                  className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 px-8 py-6 hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowResumeModal(false)}
                >
                  <span className="text-3xl select-none">🇫🇷</span>
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className="text-white font-semibold text-sm tracking-wide"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Français
                    </span>
                    <span
                      className="text-white/30 text-xs"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Version FR
                    </span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white/30 group-hover:text-white/70 transition-colors">
                    <path d="M7 1v8M3.5 6l3.5 4 3.5-4M1 11.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.a>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

/**
 * SceneDots — progress indicators on the right edge
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