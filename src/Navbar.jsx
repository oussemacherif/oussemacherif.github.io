/**
 * Navbar.jsx — Cinematic scroll-aware navigation bar
 *
 * Features:
 * - Transparent at top, frosted dark glass on scroll
 * - Logo / name on the left in Bebas Neue
 * - Nav links that highlight the active section
 * - Animated underline indicator on hover
 * - "Let's Talk" CTA button on the right
 * - Mobile: hamburger → full-screen overlay menu
 * - Smooth scroll to sections on click
 *
 * Same DNA: Bebas Neue + DM Sans, grain, Framer Motion.
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

// ── NAV LINKS — must match section IDs in App.jsx ────────────────────────────
const LINKS = [
  { label: "About",      href: "#hero" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education",  href: "#education" },
  { label: "Contact",    href: "#contact" },
];

// ← Replace with your name
const YOUR_NAME = "Oussema CHERIF";

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [hoveredLink, setHoveredLink] = useState(null);

  // Detect scroll for background transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detect active section via IntersectionObserver
  useEffect(() => {
    const ids = LINKS.map(l => l.href.replace("#", ""));
    const observers = [];

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveLink(`#${id}`); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (href) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── MAIN NAVBAR ── */}
      <motion.nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between py-4 px-6 md:px-12"
        style={{ height: 64 }}
        animate={{
          backgroundColor: scrolled ? "rgba(8,8,8,0.88)" : "rgba(8,8,8,0)",
          borderBottomColor: scrolled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        }}
        transition={{ duration: 0.4, ease }}
        style={{
          borderBottom: "1px solid",
          borderBottomColor: scrolled ? "rgba(255,255,255,0.06)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          backgroundColor: scrolled ? "rgba(8,8,8,0.88)" : "transparent",
          transition: "background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        {/* ── LOGO ── */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-black uppercase leading-none text-white cursor-pointer"
          style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
            letterSpacing: "0.02em",
            background: "none",
            border: "none",
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {YOUR_NAME}
        </motion.button>

        {/* ── DESKTOP LINKS ── */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => {
            const isActive  = activeLink === link.href;
            const isHovered = hoveredLink === link.href;

            return (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-4 py-2 text-[11px] uppercase tracking-[0.15em] transition-colors duration-200"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                whileHover={{ color: "rgba(255,255,255,0.85)" }}
              >
                {link.label}

                {/* Active / hover underline */}
                <AnimatePresence>
                  {(isActive || isHovered) && (
                    <motion.span
                      className="absolute bottom-0.5 left-4 right-4 h-px"
                      style={{ backgroundColor: isActive ? "#61DAFB" : "rgba(255,255,255,0.3)" }}
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0, originX: 1 }}
                      transition={{ duration: 0.25, ease }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* ── RIGHT SIDE: CTA + Hamburger ── */}
        <div className="flex items-center gap-4">
          {/* CTA — desktop only */}
          <motion.button
            onClick={() => scrollTo("#contact")}
            className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: "rgba(97,218,251,0.1)",
              border: "1px solid rgba(97,218,251,0.25)",
              color: "#61DAFB",
              cursor: "pointer",
            }}
            whileHover={{ background: "rgba(97,218,251,0.18)", borderColor: "rgba(97,218,251,0.45)", scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Let's Talk
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          {/* Hamburger — mobile only */}
          <motion.button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            whileTap={{ scale: 0.93 }}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-px w-6 bg-white origin-center"
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease }}
            />
            <motion.span
              className="block h-px w-6 bg-white"
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-px w-6 bg-white origin-center"
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* ── MOBILE FULL-SCREEN OVERLAY ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center px-8"
            style={{ backgroundColor: "#080808" }}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease }}
          >
            {/* Grain on overlay */}
            <div className="absolute inset-0 opacity-[0.18] pointer-events-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "128px" }}
            />

            {/* Ghost watermark */}
            <div className="absolute right-0 bottom-0 select-none pointer-events-none"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "40vw", color: "rgba(255,255,255,0.02)", letterSpacing: "-0.03em", lineHeight: 1 }}>
              MENU
            </div>

            {/* Nav links */}
            <nav className="relative z-10 flex flex-col gap-2">
              {LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left font-black uppercase leading-none w-full"
                  style={{
                    fontFamily: "'Bebas Neue', Impact, sans-serif",
                    fontSize: "clamp(2.8rem, 12vw, 5rem)",
                    color: activeLink === link.href ? "#61DAFB" : "rgba(255,255,255,0.7)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.45, ease, delay: i * 0.06 }}
                  whileHover={{ x: 12, color: "#fff" }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            {/* Bottom — CTA + socials */}
            <motion.div
              className="relative z-10 mt-12 flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest px-6 py-3 rounded-full w-fit"
                style={{ fontFamily: "'DM Sans', sans-serif", background: "rgba(97,218,251,0.1)", border: "1px solid rgba(97,218,251,0.25)", color: "#61DAFB", cursor: "pointer" }}
              >
                Let's Talk ↗
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
