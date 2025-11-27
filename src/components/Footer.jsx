import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
const NavItems = [
  { name: "Home", href: "#home" },
  { name: "About Me", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Tech Stack", href: "#tech" },
  { name: "Contact Me", href: "#contact" },
];

export default function Footer() {
  // Variants for animation
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <footer className="bg-darkBackground border-t border-slate-800 text-slate-300 template">
      <div className="px-0 md:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand / About */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-slate-100 mb-4">
            My Portfolio
          </h2>
          <p className="text-sm leading-relaxed">
            A portfolio website built with React and Tailwind CSS. Hope you like
            it. I'm always open to work with you. Please feel free to provide
            your feedback and suggestions.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-slate-100 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {NavItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="hover:text-primary-400 transition-colors duration-300"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact / Social */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Connect</h3>
          <p className="flex items-center gap-2 mb-2">
            <FaEnvelope /> haythamsaba@gmail.com
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://github.com/HaythamSaba"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary-400"
              aria-label="Visit my GitHub profile"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/haytham-saba-401148278/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500"
              aria-label="Visit my LinkedIn profile"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://www.instagram.com/haytham_saba/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
              aria-label="Visit my Instagram profile"
            >
              <FaInstagram className="w-7 h-7" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.8, delay: 0.2 } }}
        viewport={{ once: true }}
        className="border-t border-slate-800 py-6 text-center text-sm text-slate-500"
      >
        © {new Date().getFullYear()} My Portfolio. All rights reserved.
      </motion.div>
    </footer>
  );
}
