import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/** * Ensure these are in src/assets/ 
 */
import darkImg from "./assets/darkme.png";
import lightImg from "./assets/lightme.png";

const FORM_ENDPOINT = "https://formspree.io/f/xojkbayz";

const ease = [0.16, 1, 0.3, 1];
const stagger    = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const slideRight = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease } } };
const slideLeft  = { hidden: { opacity: 0, x: 40  }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease } } };

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  // 1. Added 'subject' to the form state
  const [form,   setForm]   = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [isFocused, setIsFocused] = useState(false);

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
      id="contact"
      className="relative min-h-screen bg-[#080808] overflow-hidden flex flex-col lg:flex-row items-stretch"
    >
      {/* Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none z-30"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px",
        }}
      />

      {/* ════════════════════════════════════════════
          LEFT PANEL (IMAGE & SOCIALS)
      ════════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 flex flex-col justify-between w-full lg:w-1/2 px-10 md:px-16 py-20 border-b lg:border-b-0 lg:border-r border-white/[0.06] overflow-hidden"
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="absolute inset-0 z-0 bg-[#080808]">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={isFocused ? "light" : "dark"}
              src={isFocused ? lightImg : darkImg}
              alt="Portrait"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isFocused ? 1 : 0.45,
                filter: isFocused ? "grayscale(0%)" : "grayscale(100%)" 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/40"
            animate={{ opacity: isFocused ? 0.2 : 0.7 }}
          />
        </div>

        <div className="relative z-20">
          <motion.p variants={slideRight} className="mb-6 tracking-[0.4em] text-xs uppercase text-white/30">
            Contact
          </motion.p>
          <motion.h2
            variants={slideRight}
            className="font-black uppercase leading-[0.88] text-white"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(4rem, 9vw, 9rem)" }}
          >
            Got a<br />
            <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.3)", color: "transparent" }}>Project?</span>
          </motion.h2>
        </div>

        {/* 2. ADDED GITHUB TO THE LINKS ARRAY */}
        <motion.div variants={stagger} className="relative z-20 mt-16 flex flex-col gap-0">
          <motion.div variants={slideRight} className="h-px w-full bg-white/10 mb-2" />
          {[
            { label: "Email", value: "ousseemcherif@gmail.com", href: "mailto:ousseemcherif@gmail.com" },
            { label: "GitHub", value: "github.com/oussemacherif", href: "https://github.com/oussemacherif" },
            { label: "LinkedIn", value: "linkedin.com/in/oussema-cherif-881842290", href: "https://www.linkedin.com/in/oussema-cherif-881842290/" },
          ].map(({ label, value, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              variants={slideRight}
              className="group flex items-center justify-between py-4 border-b border-white/[0.06] hover:border-white/20 transition-all"
            >
              <span className="text-xs uppercase tracking-widest text-white/30">{label}</span>
              <span className="text-sm text-white/70 group-hover:text-white transition-colors">{value}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* ════════════════════════════════════════════
          RIGHT PANEL — CONTACT FORM
      ════════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 flex flex-col justify-center w-full lg:w-1/2 px-10 md:px-16 py-20"
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={slideLeft} className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-8 md:p-10">
          <p className="mb-8 text-[10px] uppercase tracking-[0.35em] text-white/20">Send a message</p>

          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <CinemaField 
                label="Name" name="name" type="text" placeholder="Your Name" value={form.name} 
                onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} required 
              />
              <CinemaField 
                label="Email" name="email" type="email" placeholder="Email Address" value={form.email} 
                onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} required 
              />
            </div>

            {/* 3. ADDED SUBJECT FIELD */}
            <CinemaField 
              label="Subject" name="subject" type="text" placeholder="Project Inquiry" value={form.subject} 
              onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} required 
            />

            <CinemaField 
              label="Message" name="message" type="textarea" placeholder="Tell me what you're building…" value={form.message} 
              onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} required 
            />

            <motion.button
              type="submit"
              disabled={status === "sending"}
              className="group relative ml-auto flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="relative">{status === "sending" ? "Sending…" : "Send It"}</span>
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}

function CinemaField({ label, name, type, placeholder, value, onChange, onFocus, onBlur, required }) {
  const isTextarea = type === "textarea";
  const cls = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 text-white text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] uppercase tracking-[0.28em] text-white/40 font-medium">{label}</label>
      {isTextarea ? (
        <textarea
          name={name} rows={4} placeholder={placeholder} value={value}
          onChange={onChange} onFocus={onFocus} onBlur={onBlur} required={required}
          className={`${cls} py-3 resize-none`}
        />
      ) : (
        <input
          name={name} type={type} placeholder={placeholder} value={value}
          onChange={onChange} onFocus={onFocus} onBlur={onBlur} required={required}
          className={`${cls} h-11`}
        />
      )}
    </div>
  );
}