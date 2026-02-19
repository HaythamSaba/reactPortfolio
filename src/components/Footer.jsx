import { FaGithub, FaLinkedin, FaEnvelope, FaTelegram, FaInstagram } from "react-icons/fa"; // ✅ Telegram instead of Instagram
import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";

const NavItems = [
  { name: "Home", href: "#home" },
  { name: "About Me", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Tech Stack", href: "#tech" },
  { name: "Contact Me", href: "#contact" },
];

// ✅ Moved outside component — static object, no need to recreate on every render
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ✅ Stagger parent so columns cascade in one by one
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Footer() {
  // ✅ Lenis smooth scroll for footer nav links
  const lenis = useLenis();
  const handleScroll = (href) => {
    if (lenis) lenis.scrollTo(href, { duration: 1.2 });
  };

  return (
    <footer className="bg-darkBackground border-t border-slate-800 text-slate-300 template">
      {/* ✅ Stagger parent wrapping all three columns */}
      <motion.div
        className="px-0 md:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Brand */}
        <motion.div variants={fadeUp}>
          {/* ✅ Your name as brand instead of "My Portfolio" */}
          <h2 className="text-2xl font-bold text-slate-100 mb-4">
            Haytham Saba
          </h2>
          <p className="text-sm leading-relaxed max-w-[342px]">
            Frontend developer based in Ljubljana, Slovenia. Building
            interactive and responsive web experiences with React, TypeScript,
            and Tailwind CSS. Always open to new opportunities.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={fadeUp}>
          <h3 className="text-lg font-semibold text-slate-100 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {NavItems.map((item) => (
              // ✅ item.name as key instead of index
              <li key={item.name}>
                {/* ✅ Lenis smooth scroll instead of hard <a href> jump */}
                <button
                  onClick={() => handleScroll(item.href)}
                  className="hover:text-primary-400 transition-colors duration-300 text-left"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Connect */}
        <motion.div variants={fadeUp}>
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Connect</h3>
          <a
            href="mailto:haythamsaba@gmail.com"
            className="flex items-center gap-2 mb-4 hover:text-primary-400 transition-colors duration-300"
            aria-label="Send me an email"
          >
            <FaEnvelope />
            haythamsaba@gmail.com
          </a>
          <div className="flex gap-4">
            <a
              href="https://github.com/HaythamSaba"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary-400 transition-colors duration-300" // ✅ added transition
              aria-label="Visit my GitHub profile"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/haytham-saba-401148278/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition-colors duration-300"
              aria-label="Visit my LinkedIn profile"
            >
              <FaLinkedin size={22} />
            </a>
            {/* ✅ Telegram instead of Instagram */}
            <a
              href="https://t.me/someone_10110"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500 transition-colors duration-300"
              aria-label="Visit my Telegram profile"
            >
              <FaTelegram size={22} />
            </a>
            <a
              href="https://www.instagram.com/haytham_saba/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
              aria-label="Visit my Instagram profile"
            >
              <FaInstagram   className="w-7 h-7" />
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom bar — ✅ fixed transition syntax */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }} // ✅ transition is a sibling prop
        viewport={{ once: true }}
        className="border-t border-slate-800 py-6 text-center text-sm text-slate-500"
      >
        {/* ✅ Your name instead of "My Portfolio" */}©{" "}
        {new Date().getFullYear()} Haytham Saba. All rights reserved.
      </motion.div>
    </footer>
  );
}
