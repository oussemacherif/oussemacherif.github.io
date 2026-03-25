import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

import smartHands from "./assets/smart-hands.png"
import massilya from "./assets/massilya.jpg"

// ── PROJECTS DATA ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    number: "01",
    title: "Massilya E-Commerce Platform",
    type: "Freelance / Full Stack",
    year: "2026",
    color: "#61DAFB",
    image: massilya,
    desc: "A comprehensive e-commerce solution featuring both client and admin dashboards, integrated with robust backend modules for stock and order management",
    tags: ["React", "NestJS", "Prisma", "PostgreSQL"],
    link: "#",
  },
  {
    number: "02",
    title: "PMS360 / Project Management System",
    type: "Team Lead / Full Stack Developer",
    year: "2025",
    color: "#FF3E00",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
    desc: "A centralized PMS with task management and workload distribution, reflecting leadership experience in developer guidance and project tracking[cite: 43, 48].",
    tags: ["React", "NestJS", "Prisma", "Socket.io"],
    link: "#",
  },
  {
    number: "03",
    title: "Agriculture OSS Platform",
    type: "Web & Mobile / Team Lead / Full Stack Developer",
    year: "2025",
    color: "#5FA04E",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    desc: "A private, high-impact agricultural ecosystem developed during my tenure at the startup TUNIR. This platform empowers farmers through AI-driven tools, starting with a secure onboarding process where users select their exact land position and area on an interactive map. The core experience features a sophisticated AI Chatbot for real-time expert guidance, alongside advanced predictive modeling for crop yields and intelligent recommendation engines that suggest optimal planting and irrigation strategies based on localized soil and climate data. Due to its proprietary nature for TUNIR, the source code and internal architecture remain private .",
    tags: ["React Native", "React", "NestJS", "Tailwind CSS"],
    link: "#",
  },
  {
    number: "04",
    title: "Education Platform",
    type: "Full Stack / Team Lead",
    year: "2025",
    color: "#BB4FFF",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    desc: "An online learning system focused on technical coordination and developer mentoring[cite: 42, 43].",
    tags: ["React", "Tailwind CSS", "NestJS", "Prisma"],
    link: "#",
  },
  {
    number: "05",
    title: "Smart Hands",
    type: "Mobile / Accessibility",
    year: "2025",
    color: "#4AE0E0",
    image: smartHands,
    desc: "Smart Hands is a mobile application built with React Native, designed to empower and support the deaf and hard-of-hearing community. The app provides a wide range of essential services, educational tools, and social interaction features — all accessible and inclusive.",
    tags: ["React Native", "Socket.io", "TypeScript", "Node.js"],
    link: "https://github.com/oussemacherif/Smart-Hands",
  },
  {
    number: "06",
    title: "Enterprise ERP System",
    type: "Microservices / Team Lead / Full Stack Developer",
    year: "2024",
    color: "#E0234E",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    desc: "Developed with microservices architecture, this system enables modular data management and efficient service communication[cite: 46, 47].",
    tags: ["React", "Material UI", "NestJS", "Prisma"],
    link: "#",
  },
  {
    number: "07",
    title: "Pets App",
    type: "Mobile Application",
    year: "2024",
    color: "#FF9F1C",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    desc: "A real-time chat application for pet owners, built with custom React Native components[cite: 54, 59, 61].",
    tags: ["React Native", "TypeScript", "Socket.io", "Trello"],
    link: "#",
  },
  {
    number: "08",
    title: "Hannibal V2 E-commerce",
    type: "Next.js / Scrum Master",
    year: "2023",
    color: "#F7DF1E",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    desc: "A dynamic e-commerce interface built with Next.js[cite: 63, 67]. Focused on repository maintenance and smooth team collaboration as a Scrum Master[cite: 62, 66].",
    tags: ["Next.js", "Sequelize", "TypeScript", "React"],
    link: "#",
  },
];

// ── CONFIGS ──────────────────────────────────────────────────────────────────
const FAN_LIMIT = 4;
const CARD_W = 260;
const CARD_H = 400;
const CARD_GAP = 24;
const MOB_W = 110; 
const MOB_H = 180;
const MOB_GAP = 12;
const FAN_Y_OFFSET = 40;

const FAN_DESKTOP = [
  { rotate: -20, x: -280, y: 22 },
  { rotate: -10, x: -140, y: 8 },
  { rotate: 0,   x: 0,    y: 0 },
  { rotate: 10,  x: 140,  y: 8 },
  { rotate: 20,  x: 280,  y: 22 }, 
];

const FAN_MOBILE = [
  { rotate: -15, x: -80, y: 15 },
  { rotate: -7,  x: -40, y: 5 },
  { rotate: 0,   x: 0,   y: 0 },
  { rotate: 7,   x: 40,  y: 5 },
  { rotate: 15,  x: 80,  y: 15 }, 
];

export default function Projects() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });

  const [spread, setSpread] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [containerHeight, setContainerHeight] = useState(480);

  const extraCount = PROJECTS.length - FAN_LIMIT;
  const gridCards = spread ? PROJECTS : PROJECTS.slice(0, FAN_LIMIT);

  // Layout logic
  const totalW = 3 * CARD_W + 2 * CARD_GAP;
  const startX = -totalW / 2 + CARD_W / 2;
  const mobTotalW = 2 * MOB_W + MOB_GAP;
  const mobStartX = -mobTotalW / 2 + MOB_W / 2;

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (spread) {
      const cols = isMobile ? 2 : 3;
      const rows = Math.ceil(gridCards.length / cols);
      setContainerHeight(rows * (isMobile ? MOB_H + MOB_GAP : CARD_H + CARD_GAP) + 60);
    } else {
      setContainerHeight(isMobile ? 260 : 480);
    }
  }, [spread, gridCards]);

  const handleCardClick = (project) => {
    if (!spread) {
      setSpread(true);
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <section id="projects" className="relative bg-[#080808] overflow-hidden min-h-screen">
      <div className="absolute inset-0 opacity-[0.18] pointer-events-none z-0"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "128px" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16">
        <motion.div ref={headerRef} className="pt-28 pb-12" initial="hidden" animate={headerInView ? "visible" : "hidden"}>
          <motion.p className="mb-4 tracking-[0.4em] text-xs uppercase text-white/25">Selected Work</motion.p>
          <motion.h2 className="font-black uppercase leading-[0.85] text-white"
            style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(3.5rem, 9vw, 9rem)" }}>
            My <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)", color: "transparent" }}>Projects</span>
          </motion.h2>
        </motion.div>

        <div className="relative flex flex-col items-center">
          <div className="relative w-full transition-all duration-700 ease-out" style={{ height: `${containerHeight}px` }}>
            {gridCards.map((project, i) => {
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              const fan = (isMobile ? FAN_MOBILE : FAN_DESKTOP)[Math.min(i, FAN_LIMIT)];
              const col = i % 3; const row = Math.floor(i / 3);
              const gx = startX + col * (CARD_W + CARD_GAP);
              const gy = row * (CARD_H + CARD_GAP);
              const mCol = i % 2; const mRow = Math.floor(i / 2);
              const mgx = mobStartX + mCol * (MOB_W + MOB_GAP);
              const mgy = mRow * (MOB_H + MOB_GAP);

              return (
                <FanCard
                  key={project.number}
                  project={project}
                  spread={spread}
                  isActive={activeCard === i}
                  fanX={fan.x} fanY={fan.y + FAN_Y_OFFSET} fanRotate={fan.rotate}
                  gridX={isMobile ? mgx : gx} gridY={isMobile ? mgy : gy}
                  width={isMobile ? MOB_W : CARD_W} height={isMobile ? MOB_H : CARD_H}
                  zIndex={activeCard === i ? 100 : 10 + i}
                  onHoverStart={() => spread && setActiveCard(i)}
                  onHoverEnd={() => spread && setActiveCard(null)}
                  onTap={() => handleCardClick(project)}
                />
              );
            })}

            {!spread && PROJECTS.length > FAN_LIMIT && (
              <PlusCard
                count={extraCount}
                fan={(typeof window !== 'undefined' && window.innerWidth < 768 ? FAN_MOBILE : FAN_DESKTOP)[FAN_LIMIT]}
                width={typeof window !== 'undefined' && window.innerWidth < 768 ? MOB_W : CARD_W}
                height={typeof window !== 'undefined' && window.innerWidth < 768 ? MOB_H : CARD_H}
                yOffset={FAN_Y_OFFSET}
                onClick={() => setSpread(true)}
              />
            )}
          </div>

          <motion.button
            onClick={() => setSpread(!spread)}
            className="mt-12 mb-24 px-8 py-3 rounded-full border border-white/10 text-white/40 text-[10px] uppercase tracking-[0.3em] hover:bg-white/5 hover:text-white transition-all"
          >
            {spread ? "Close Gallery" : "Explore All Projects"}
          </motion.button>
        </div>
      </div>

      {/* POPUP MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function FanCard({ project, spread, isActive, fanX, fanY, fanRotate, gridX, gridY, width, height, zIndex, onHoverStart, onHoverEnd, onTap }) {
  return (
    <motion.div
      onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} onClick={onTap}
      className="absolute rounded-2xl overflow-hidden cursor-pointer"
      style={{ width, height, zIndex, left: "50%", marginLeft: -width / 2, top: 0 }}
      animate={{
        x: spread ? gridX : fanX,
        y: spread ? gridY : (isActive ? fanY - 20 : fanY),
        rotate: spread ? 0 : fanRotate,
        scale: isActive ? 1.05 : (spread ? 1 : 0.9),
      }}
      transition={{ type: "spring", stiffness: 260, damping: 25 }}
    >
      <div className="absolute inset-0 bg-neutral-900" />
      <motion.div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} animate={{ opacity: isActive ? 0.9 : 0.6 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="font-black text-white/20 text-lg leading-none">{project.number}</span>
          <span className="text-[7px] md:text-[9px] uppercase px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">{project.type}</span>
        </div>
        <div>
          <p className="text-[8px] md:text-[10px] text-white/40 mb-0.5">{project.year}</p>
          <h3 className="font-black text-white uppercase text-sm md:text-xl leading-none" style={{ fontFamily: "'Bebas Neue'" }}>{project.title}</h3>
        </div>
      </div>
    </motion.div>
  );
}

function PlusCard({ count, fan, width, height, yOffset, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className="absolute rounded-2xl cursor-pointer flex flex-col items-center justify-center bg-white/5 border border-white/10 backdrop-blur-xl"
      style={{ width, height, left: "50%", marginLeft: -width / 2, top: 0, zIndex: 60 }}
      animate={{ x: fan.x, y: fan.y + yOffset, rotate: fan.rotate, scale: 0.9 }}
      whileHover={{ scale: 0.95 }}
    >
      <span className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: "'Bebas Neue'" }}>+{count}</span>
      <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-white/40">More</span>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-start md:items-center justify-center p-4 md:p-8">
      {/* Overlay */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
      />
      
      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        className="relative w-full max-w-4xl bg-[#111] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10 mt-12 md:mt-0 max-h-[85vh] md:max-h-none overflow-y-auto"
      >
        {/* Sticky Close Button for Mobile */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-[210] p-2 rounded-full bg-black/50 backdrop-blur-md text-white/70 hover:text-white border border-white/10 transition-colors"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* Left: Image (or Top on Mobile) */}
        <div className="w-full md:w-1/2 h-64 md:h-auto sticky top-0 md:relative z-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover" 
          />
          {/* Gradient overlay for mobile to help text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent md:hidden" />
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-[#111]">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2">
            {project.type} — {project.year}
          </span>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 md:mb-6 uppercase leading-none" style={{ fontFamily: "'Bebas Neue'" }}>
            {project.title}
          </h2>
          
          <p className="text-white/60 leading-relaxed mb-6 md:mb-8 text-xs md:text-base">
            {project.desc}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
            {project.tags.map(tag => (
              <span key={tag} className="text-[9px] uppercase tracking-tighter px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                {tag}
              </span>
            ))}
          </div>

          <a 
            href={project.link || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block w-full md:w-fit text-center px-8 py-4 bg-white text-black font-bold uppercase text-[10px] tracking-widest rounded-xl hover:bg-neutral-200 transition-colors"
          >
            Launch Project
          </a>
        </div>
      </motion.div>
    </div>
  );
}