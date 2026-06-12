import { CSSIcon, FigmaIcon, FramerMotionIcon, HTMLIcon, JavaScriptIcon, NextJsIcon, ReactIcon, SupabaseIcon, TailwindIcon, TbBrandVercelIcon, TypeScriptIcon, VSCodeIcon } from "../components/icons/TechIcons";
import { SiCanva } from "react-icons/si";

export const TECH_ICONS = [
  // ── Left side ──────────────────────────────────────────
  {
    src: "react.webp",
    alt: "React",
    finalTop: "15%",
    finalLeft: "12%",
    delay: 0.15,
    floatDuration: 3.2,
    floatDelay: 0,
    rotate: -6,
  },

  {
    src: "css.webp",
    alt: "CSS",
    finalTop: "56%",
    finalLeft: "11%",
    delay: 0.2,
    floatDuration: 3.5,
    floatDelay: 0.8,
    rotate: -3,
  },
  {
    src: "git.webp",
    alt: "Git",
    finalTop: "35%",
    finalLeft: "9%",
    delay: 0.3,
    floatDuration: 3.0,
    floatDelay: 1.2,
    rotate: 5,
  },
  {
    src: "javascript.webp",
    alt: "JavaScript",
    finalTop: "43%",
    finalLeft: "23%",
    delay: 0.25,
    floatDuration: 2.8,
    floatDelay: 0.4,
    rotate: 4,
  },
  // ── Right side ─────────────────────────────────────────
  {
    src: "typescript.webp", 
    alt: "TypeScript",
    finalTop: "15%",
    finalLeft: "88%",
    delay: 0.15,
    floatDuration: 2.9,
    floatDelay: 0.2,
    rotate: 6,
  },
  {
    src: "tailwindCSS.webp", 
    alt: "Tailwind CSS",
    finalTop: "35%",
    finalLeft: "91%",
    delay: 0.25,
    floatDuration: 3.3,
    floatDelay: 0.6,
    rotate: -4,
  },
  {
    src: "next.webp", 
    alt: "Next.js",
    finalTop: "56%",
    finalLeft: "89%",
    delay: 0.2,
    floatDuration: 2.7,
    floatDelay: 1.0,
    rotate: 3,
  },
  {
    src: "html.webp",
    alt: "HTML",
    finalTop: "43%",
    finalLeft: "77%",
    delay: 0.3,
    floatDuration: 3.1,
    floatDelay: 1.4,
    rotate: -5,
  },
];

export const projects = [
  {
    title: "Kova Studio",
    description:
      "Scroll-driven portfolio site built with Next.js 16, GSAP ScrollTrigger, Framer Motion, and Lenis smooth scroll",
    devStack: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "GSAP",
      "Lenis",
    ],
    image: "/project-1.webp",
    link: "https://kova-studio-hs.vercel.app/",
    git: "kova-studio",
    type: "Frontend",
    progress: true,
  },
  {
    title: "HabitFlow",
    description:
      "A comprehensive habit tracking application with streaks, analytics, and user authentication.",
    devStack: ["React", "TypeScript", "TailwindCSS", "Supabase"],
    image: "/project-2.webp",
    link: "https://habitflow-hs.vercel.app/",
    git: "habitflow",
    type: "Fullstack",
    progress: false,
  },
  {
    title: "Secret Santa Generator",
    description:
      "A festive web application for organizing Secret Santa gift exchanges with a random pairing algorithm.",
    devStack: ["React", "Context API", "TailwindCSS"],
    image: "/project-3.webp",
    link: "https://secret-santa-hs.vercel.app/",
    git: "secret-santa",
    type: "Frontend",
    progress: false,
  },
  {
    title: "Lights Up",
    description: "E-commerce website that allows users to buy luxury lights.",
    devStack: ["React", "Next.js", "TailwindCSS", "Supabase"],
    image: "/project-4.webp",
    link: "https://lights-up-haythamsabas-projects.vercel.app/",
    git: "lights-up",
    type: "Fullstack",
    progress: false,
  },

  {
    title: "Quiz App",
    description:
      "A quiz app that allows users to test their knowledge in different programming languages.",
    devStack: ["React", "CSS", "Context API"],
    image: "/project-5.webp",
    link: "https://quiz-app-git-main-haythamsabas-projects.vercel.app/",
    git: "quiz-app",
    type: "Frontend",
    progress: false,
  },
  {
    title: "Currently Weather and Time",
    description:
      "A web application that provides current weather and time information for any city worldwide.",
    devStack: ["HTML", "CSS", "JavaScript", "Weather API"],
    image: "/project-6.webp",
    link: "https://currently-peach.vercel.app/",
    git: "currently",
    type: "Frontend",
    progress: false,
  },
  {
    title: "My first Portfolio",
    description:
      "My first portfolio project, created while in college to learn web development.",
    devStack: ["HTML", "CSS", "JavaScript"],
    image: "/project-7.webp",
    link: "https://portifilio-livid.vercel.app/",
    git: "Portfolio",
    type: "Frontend",
    progress: false,
  },
];

export const certificates = [
  {
    name: "University Certificate",
    imageUrl: "/university-Certificate.webp",
    description:
      "My university certificate in Software Engineering from Al-Azhar University.",
  },
  {
    name: "English React Certificate",
    imageUrl: "/Certificate-Eng-React.webp",
    description:
      "Certificate in React from Udemy, completed successfully in 2024.",
  },
  {
    name: "Arabic React Certificate",
    imageUrl: "/Certificate-Arb-React.webp",
    description:
      "Arabic-language certificate in React from Udemy, completed successfully in 2024.",
  },
];

export const skills = [
  { name: "HTML", icon: HTMLIcon, color: "#e34f26" },
  { name: "CSS", icon: CSSIcon, color: "#1572b6" },
  { name: "JavaScript", icon: JavaScriptIcon, color: "#f7df1e" },
  { name: "TypeScript", icon: TypeScriptIcon, color: "#3178c6" },
  { name: "React", icon: ReactIcon, color: "#61dafb" },
  { name: "Next.js", icon: NextJsIcon, color: "#ffffff" },
  { name: "Tailwind CSS", icon: TailwindIcon, color: "#38bdf8" },
  { name: "Framer Motion", icon: FramerMotionIcon, color: "#ff0055" },
  { name: "Vercel", icon: TbBrandVercelIcon, color: "#000000ff" },
  { name: "Supabase", icon: SupabaseIcon, color: "#3ecf8e" },
  { name: "Figma", icon: FigmaIcon, color: "#a259ff" },
  { name: "VS Code", icon: VSCodeIcon, color: "#007acc" },
  { name: "Canva", icon: SiCanva, color: "#00c4cc" },
];