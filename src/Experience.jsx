/**
 * Experience.jsx — Cinematic Experience / Timeline section
 * Cards have brand-colored tech icon pills matching Skills.jsx
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

// ── BRAND COLORS ─────────────────────────────────────────────────────────────
const BRAND_COLORS = {
  "React":         "#61DAFB",
  "React Native":  "#61DAFB",
  "Next.js":       "#ffffff",
  "TypeScript":    "#3178C6",
  "Tailwind CSS":  "#06B6D4",
  "NestJS":        "#E0234E",
  "Node.js":       "#5FA04E",
  "Prisma":        "#4A5568",
  "PostgreSQL":    "#4169E1",
  "MySQL":         "#4479A1",
  "MongoDB":       "#47A248",
  "Sequelize":     "#52B0E7",
  "Mongoose":      "#880000",
  "Express":       "#ffffff",
  "GraphQL":       "#E10098",
  "Redis":         "#FF4438",
  "Docker":        "#2496ED",
  "Git":           "#F05032",
  "GitHub Actions":"#2088FF",
  "Figma":         "#F24E1E",
  "Material UI":   "#007FFF",
  "Bootstrap":     "#7952B3",
  "Redux":         "#764ABC",
  "JavaScript":    "#F7DF1E",
  "Python":        "#3776AB",
  "AI":            "#BB4FFF",
  "REST API":      "#ffffff",
  "Microservices": "#FF9900",
  "Leadership":    "#F7DF1E",
  "Mentoring":     "#5FA04E",
  "Architecture":  "#61DAFB",
  "Tech Interviews":"#E0234E",
  "Admin":         "#ffffff",
};

// ── ICON PATHS ────────────────────────────────────────────────────────────────
const ICON_PATHS = {
  "React":         "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.096-.278z",
  "React Native":  "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.096-.278z",
  "NestJS":        "M11.985.065C5.367.065 0 5.432 0 12.05c0 6.616 5.367 11.984 11.985 11.984S23.97 18.666 23.97 12.05C23.97 5.432 18.603.065 11.985.065zm-1.6 16.88c-.29-.156-.566-.33-.83-.52l-3.73 2.24a8.665 8.665 0 0 0 1.596.963l2.964-2.683zm8.033-1.74l-3.178-.735a8.663 8.663 0 0 1-.69 1.487l2.33 2.995a8.693 8.693 0 0 0 1.538-1.773zm-8.033-12.14c.463 0 .92.046 1.368.136l.09-3.929c-.834-.42-1.757-.637-2.737-.638l-.087 3.929c.455-.065.912-.098 1.366-.098zm4.44 2.03a8.662 8.662 0 0 1 1.873 2.54l3.1-1.735a8.693 8.693 0 0 0-2.845-3.218l-2.128 2.413z",
  "Prisma":        "M21.807 18.285L13.553.756a1.324 1.324 0 0 0-1.129-.754 1.31 1.31 0 0 0-1.206.626l-9.984 16.5a1.313 1.313 0 0 0 .56 1.829l8.848 4.59a2.624 2.624 0 0 0 2.759-.298l8.371-6.232a1.314 1.314 0 0 0-.965-2.732z",
  "Node.js":       "M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.603.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.19-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.085.05-.139.146-.139.241v10.15c0 .097.054.189.137.236l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.273c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.536c0 1.748-.951 2.754-2.604 2.754-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.943-.922-1.604V6.921c0-.66.352-1.273.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.33.924.944.924 1.603v10.15c0 .659-.354 1.272-.924 1.604l-8.794 5.078c-.28.162-.6.247-.925.247z",
  "MongoDB":       "M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.114-2.12-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z",
  "MySQL":         "M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.19.214.288.054.104.1.21.154.314l.014-.014c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.147zM0 0v24h24V0H0zm13.23 7.88c.053.144.069.3.08.46h-1.404a2.56 2.56 0 0 0-.243-.624l1.567.164zm-4.01 8.578H7.656l-.796-6.22H5.33v-1.37h2.928l.963 7.59zm4.97 0h-1.44l-1.628-5.776v5.776H9.878V9.086h1.44l1.628 5.776V9.086h1.244v7.372zm3.54 0h-2.686V9.086h2.686v1.37H16.49v1.716h.906v1.37H16.49v2.546h1.24v1.37z",
  "Tailwind CSS":  "M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z",
  "Material UI":   "M0 5.771v12.457l3.428-1.972V9.399l8.572 4.942 8.572-4.942v6.857L24 18.228V5.771l-3.428 1.972-8.572 4.943-8.572-4.943L0 5.771zm12 8.914l-8.572-4.943V15.6l8.572 4.943 8.572-4.943V9.742L12 14.685z",
  "Redux":         "M16.634 16.504c.87-.075 1.543-.84 1.5-1.754-.043-.914-.796-1.648-1.709-1.648h-.061a1.71 1.71 0 0 0-1.648 1.769c.043.479.214.89.502 1.199-1.057 2.087-2.66 3.226-5.07 3.226-1.499 0-2.813-.48-3.622-1.348-.655-.703-1.01-1.528-1.01-2.376v-.329c1.252-.326 2.174-1.452 2.174-2.799 0-1.587-1.288-2.876-2.876-2.876-1.587 0-2.876 1.289-2.876 2.876 0 1.104.6 2.065 1.5 2.58v.548c0 1.25.437 2.416 1.26 3.37.981 1.13 2.457 1.795 4.124 1.795 2.74 0 4.842-1.524 5.812-3.633z",
  "Docker":        "M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m14.654-.9c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.01c.562 1.405 1.4 2.426 2.491 3.029 1.217.678 3.19 1.066 5.44 1.066 1.017.009 2.033-.07 3.039-.239 1.396-.236 2.742-.656 3.792-1.426 1.084-.796 1.979-1.89 2.64-3.212l.182-.032c.552 0 1.09-.1 1.594-.298.495-.193.938-.49 1.307-.872.365-.382.642-.845.818-1.356.175-.508.247-1.054.214-1.594z",
  "Git":           "M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187",
  "Figma":         "M5.333 24C7.355 24 9 22.355 9 20.333V16.5H5.333C3.311 16.5 1.667 18.144 1.667 20.167c0 2.022 1.644 3.667 3.666 3.833zm3.667-11H5.333C3.311 13 1.667 14.644 1.667 16.667S3.31 20.333 5.333 20.333H9V13zm0-8.333H5.333C3.311 4.667 1.667 6.311 1.667 8.333S3.31 12 5.333 12H9V4.667zm8.333 0H9V12h8.333C19.356 12 21 10.355 21 8.333S19.356 4.667 17.333 4.667zm0 9.333C15.311 14 13.667 15.644 13.667 17.667S15.31 21.333 17.333 21.333 21 19.689 21 17.667 19.356 14 17.333 14z",
  "GraphQL":       "M14.051 2.751l4.935 2.85c.816-.859 2.173-.893 3.032-.077.589 1.028.232 2.339-.796 2.928v5.699c1.146.273 1.856 1.412 1.583 2.558-.587 1.03-1.897 1.388-2.927.802l-4.938 2.85c.107 1.18-.769 2.225-1.949 2.332-1.18.107-2.225-.769-2.332-1.949l-4.94-2.85c-.81.862-2.166.904-3.029.094a2.155 2.155 0 0 1-.095-3.029V9.385A2.155 2.155 0 0 1 1.661 6.2 2.155 2.155 0 0 1 4.97 5.3l4.935-2.85A2.155 2.155 0 0 1 12 .137a2.155 2.155 0 0 1 2.051 2.614z",
  "JavaScript":    "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z",
  "Python":        "M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.032v-2.867s-.109-3.403 3.35-3.403h5.769s3.24.052 3.24-3.131V3.199S18.28 0 11.914 0zm-3.211 1.851a1.044 1.044 0 1 1 0 2.089 1.044 1.044 0 0 1 0-2.089zM17.93 6.237h-2.032v2.868s.109 3.402-3.35 3.402H6.78s-3.24-.052-3.24 3.131v5.333S3.053 24 9.418 24c6.366 0 5.986-2.656 5.986-2.656l-.007-2.752H9.583v-.826h8.121s3.9.446 3.9-5.734c0-6.18-3.403-5.963-3.403-5.963l-.271-.832zm-2.972 15.911a1.044 1.044 0 1 1 0 2.089 1.044 1.044 0 0 1 0-2.089z",
};

// ── Tech Icon Component ───────────────────────────────────────────────────────
function TechIcon({ name, size = 12 }) {
  const path = ICON_PATHS[name];
  if (!path) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d={path} />
    </svg>
  );
}

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
    period:   "Aug 2024 — Jan 2026",
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
              className="text-white/20 text-lg pb-2 hidden sm:block"
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
                      className="group relative rounded-2xl overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${exp.color}14 0%, ${exp.color}05 50%, transparent 100%)`,
                        border: `1px solid ${exp.color}25`,
                        boxShadow: `0 0 0 0 ${exp.color}00`,
                      }}
                      whileHover={{
                        borderColor: `${exp.color}55`,
                        boxShadow: `0 8px 40px ${exp.color}18`,
                        transition: { duration: 0.3 },
                      }}
                    >
                      
                      <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${exp.color}, ${exp.color}00)` }} />

                      <div className="p-7">
                       
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: exp.color }} />
                            <span className="text-[11px] uppercase tracking-[0.25em]"
                              style={{ fontFamily: "'DM Sans', sans-serif", color: `${exp.color}90` }}>
                              {exp.period}
                            </span>
                          </div>
                          <span className="text-[10px] uppercase tracking-widest rounded-full px-3 py-1 font-medium"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              background: `${exp.color}18`,
                              border: `1px solid ${exp.color}35`,
                              color: exp.color,
                            }}>
                            {exp.type}
                          </span>
                        </div>

                    
                        <h3 className="font-black uppercase leading-none text-white mb-2"
                          style={{
                            fontFamily: "'Bebas Neue', Impact, sans-serif",
                            fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
                            textShadow: `0 0 30px ${exp.color}30`,
                          }}
                        >
                          {exp.role}
                        </h3>

                        <div className="flex items-center gap-2 mb-6 pb-5"
                          style={{ borderBottom: `1px solid ${exp.color}15` }}>
                          <span className="text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif", color: exp.color }}>
                            {exp.company}
                          </span>
                          <span style={{ color: `${exp.color}40` }}>·</span>
                          <span className="text-xs text-white/30" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {exp.location}
                          </span>
                        </div>

                   
                        <ul className="flex flex-col gap-3 mb-6">
                          {exp.bullets.map((b, j) => (
                            <li key={j} className="flex items-start gap-3 text-sm leading-relaxed"
                              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)" }}>
                              <span className="mt-2 shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: `${exp.color}80` }} />
                              {b}
                            </li>
                          ))}
                        </ul>

                     
                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag) => {
                            const brandColor = BRAND_COLORS[tag] || exp.color;
                            return (
                              <span key={tag}
                                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium transition-all duration-200"
                                style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  background: `${brandColor}12`,
                                  border: `1px solid ${brandColor}28`,
                                  color: `${brandColor}95`,
                                }}
                              >
                                {ICON_PATHS[tag] && (
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill={brandColor} className="shrink-0" style={{ opacity: 0.85 }}>
                                    <path d={ICON_PATHS[tag]} />
                                  </svg>
                                )}
                                {tag}
                              </span>
                            );
                          })}
                        </div>
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
