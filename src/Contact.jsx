/**
 * Contact.jsx — Split-screen cinematic contact section
 *
 * LEFT  — Bold statement: huge headline, availability badge,
 *          contact detail rows, ghost watermark.
 * RIGHT — Frosted-glass form card with glowing focus states,
 *         white CTA button with shimmer, success state.
 *
 * Scroll-triggered via Framer Motion useInView.
 * Form: replace FORM_ENDPOINT with your Formspree /f/xxxx URL.
 */

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ── Replace with your Formspree endpoint ─────────────────────────────────────
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
// ─────────────────────────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1];

const stagger   = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const slideUp   = { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } };
const slideRight= { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease } } };
const slideLeft = { hidden: { opacity: 0, x: 40  }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease } } };

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const [form,   setForm]   = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-[#080808] overflow-hidden flex flex-col lg:flex-row items-stretch"
    >
      {/* ── Grain ── */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px",
        }}
      />

      {/* ════════════════════════════════════════════
          LEFT PANEL
      ════════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 flex flex-col justify-between w-full lg:w-1/2 px-10 md:px-16 py-20 border-b lg:border-b-0 lg:border-r border-white/[0.06]"
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Ghost watermark */}
        <div
          className="absolute -bottom-6 -left-4 select-none pointer-events-none leading-none"
          style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: "clamp(7rem, 18vw, 18rem)",
            color: "rgba(255,255,255,0.025)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          TALK
        </div>

        {/* Top */}
        <div>
          <motion.p
            variants={slideRight}
            className="mb-6 tracking-[0.4em] text-xs uppercase text-white/30"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Contact
          </motion.p>

          {/* Big headline — solid + outlined mix */}
          <motion.h2
            variants={slideRight}
            className="font-black uppercase leading-[0.88] text-white"
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: "clamp(4rem, 9vw, 9rem)",
              textShadow: "0 4px 60px rgba(0,0,0,0.8)",
            }}
          >
            {/* ← Replace */}
            Got a<br />
            <span
              style={{
                WebkitTextStroke: "1.5px rgba(255,255,255,0.3)",
                color: "transparent",
              }}
            >
              Project?
            </span>
          </motion.h2>

          {/* Sub-copy */}
          <motion.p
            variants={slideRight}
            className="mt-7 max-w-xs text-white/45 text-[15px] leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {/* ← Replace */}
            Available for freelance work and full-time opportunities.
            Let's build something you'll be proud of.
          </motion.p>

          {/* Availability badge */}
          <motion.div variants={slideRight} className="mt-8 inline-flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span
              className="text-xs text-emerald-400/80 tracking-widest uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Available for work
            </span>
          </motion.div>
        </div>

        {/* Bottom — contact links */}
        <motion.div variants={stagger} className="mt-16 flex flex-col gap-0">
          <motion.div variants={slideRight} className="h-px w-full bg-white/8 mb-2" />

          {[
            { label: "Email",    value: "hello@yourname.com",          href: "mailto:hello@yourname.com" },
            { label: "LinkedIn", value: "linkedin.com/in/yourhandle",  href: "https://linkedin.com/in/yourhandle" },
            { label: "GitHub",   value: "github.com/yourhandle",       href: "https://github.com/yourhandle" },
          ].map(({ label, value, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              variants={slideRight}
              className="group flex items-center justify-between py-4 border-b border-white/[0.06] hover:border-white/20 transition-all"
              whileHover={{ x: 6 }}
            >
              <span
                className="text-xs uppercase tracking-widest text-white/25 group-hover:text-white/50 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {label}
              </span>
              <span
                className="text-sm text-white/55 group-hover:text-white/90 transition-colors flex items-center gap-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {value}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-0 group-hover:opacity-60 transition-opacity">
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* ════════════════════════════════════════════
          RIGHT PANEL — FORM
      ════════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 flex flex-col justify-center w-full lg:w-1/2 px-10 md:px-16 py-20"
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Soft glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 65%)" }}
        />

        {/* Card */}
        <motion.div
          variants={slideLeft}
          className="relative rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm p-8 md:p-10"
          style={{ boxShadow: "0 0 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)" }}
        >
          <p
            className="mb-8 text-[10px] uppercase tracking-[0.35em] text-white/20"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Send a message
          </p>

          {status === "success" ? (
            <motion.div
              className="flex flex-col items-center justify-center py-16 gap-5 text-center"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease }}
            >
              {/* Animated checkmark ring */}
              <motion.div
                className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-2xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, duration: 0.6, ease }}
              >
                ✦
              </motion.div>
              <h3
                className="text-white font-black uppercase"
                style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Message Sent
              </h3>
              <p
                className="text-white/35 text-sm max-w-xs leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Thanks for reaching out. I'll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              {/* Row 1 — Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <CinemaField label="Name"    name="name"    type="text"  placeholder="Alex Rivera"      value={form.name}    onChange={onChange} required />
                <CinemaField label="Email"   name="email"   type="email" placeholder="hello@you.com"    value={form.email}   onChange={onChange} required />
              </div>

              {/* Row 2 — Subject */}
              <CinemaField label="Subject"  name="subject" type="text"     placeholder="Project, collab, hello…" value={form.subject}  onChange={onChange} />

              {/* Row 3 — Message */}
              <CinemaField label="Message"  name="message" type="textarea" placeholder="Tell me what you're building…"  value={form.message} onChange={onChange} required />

              {/* Submit row */}
              <div className="flex items-center justify-between pt-1">
                <p
                  className="text-white/20 text-xs hidden sm:block"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Replies within 24h
                </p>

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  className="group relative ml-auto flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black disabled:opacity-50"
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {/* Shimmer sweep on hover */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/[0.08] to-transparent" />
                  <span className="relative">{status === "sending" ? "Sending…" : "Send It"}</span>
                  <svg className="relative" width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </div>

              {status === "error" && (
                <p className="text-red-400/60 text-xs text-right" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Something went wrong — please try again.
                </p>
              )}
            </form>
          )}
        </motion.div>

        {/* Footnote */}
        <motion.p
          variants={slideUp}
          className="mt-6 text-center text-white/15 text-xs"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {/* ← Replace */}
          Based in Your City · Open to Remote
        </motion.p>
      </motion.div>
    </section>
  );
}

/** Reusable dark field */
function CinemaField({ label, name, type, placeholder, value, onChange, required }) {
  const isTextarea = type === "textarea";
  const cls =
    "w-full bg-white/[0.035] border border-white/[0.07] rounded-xl px-4 text-white/75 placeholder-white/15 text-sm focus:outline-none focus:border-white/[0.22] focus:bg-white/[0.06] transition-all";

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-[10px] uppercase tracking-[0.28em] text-white/28"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={name} name={name} rows={4}
          placeholder={placeholder} value={value}
          onChange={onChange} required={required}
          className={`${cls} py-3 resize-none`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
      ) : (
        <input
          id={name} name={name} type={type}
          placeholder={placeholder} value={value}
          onChange={onChange} required={required}
          className={`${cls} h-11`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
      )}
    </div>
  );
}
