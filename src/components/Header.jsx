import {
  Bars3Icon,
  EnvelopeIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";

const NavItems = [
  { name: "Home", href: "#home" },
  { name: "About Me", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Tech Stack", href: "#tech" },
  { name: "Contact Me", href: "#contact" },
];

// Framer Motion variants
const menuVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.1 },
  },
  exit: { x: "100%", transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, when: "beforeChildren" },
  },
};

function Header() {
  const [nav, setNav] = useState(false);
  const lenis = useLenis(); // hook to control scrolling

  const handleScroll = (href) => {
    lenis?.scrollTo(href);
    setNav(false); // also close mobile menu
  };

  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 200); // scroll threshold
  });

  return (
    <>
      {/* Normal nav (visible before 200px scroll) */}
      {scrolled ? (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
          className="fixed top-0 left-0 w-full z-50 border-b border-white/20 shadow-lg"
        >
          <div className="template flex justify-between items-center py-4">
            {/* Home Icon */}
            <a
              href="#home"
              className="text-primary-400 p-4 hover:bg-background rounded-full bg-primary-500 hover:text-darkBackground transition-colors duration-300"
            >
              <HomeIcon className="w-8 h-8 text-darkBackground" />
            </a>

            {/* Desktop Menu */}
            <motion.ul
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="hidden lg:flex gap-6 text-lg font-semibold border border-background rounded-full"
            >
              {NavItems.map((item) => (
                <li key={item.name}>
                  <motion.button
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    onClick={() => handleScroll(item.href)}
                    className="text-primary-500 px-4 py-2 rounded-full"
                    whileHover={{
                      backgroundColor: "#161b22",
                      transition: { duration: 0.4, ease: "easeInOut" },
                    }}
                  >
                    {item.name}
                  </motion.button>
                </li>
              ))}
            </motion.ul>

            {/* Mobile Menu Button */}
            <div
              onClick={() => setNav(!nav)}
              className="lg:hidden border border-background rounded-full p-3 cursor-pointer z-50"
            >
              {nav ? (
                <XMarkIcon className="h-8 w-8 text-background" />
              ) : (
                <Bars3Icon className="h-8 w-8 text-background" />
              )}
            </div>

            {/* Contact Icon (Desktop Only) */}
            <a
              href="#contact"
              className="hidden lg:inline-flex text-secondary-400 p-4 hover:bg-background rounded-full bg-secondary-500 hover:text-darkBackground transition-colors duration-300"
            >
              <EnvelopeIcon className="h-8 w-8 text-darkBackground" />
            </a>

            {/* Mobile Menu */}
            <AnimatePresence>
              {nav && (
                <motion.ul
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed top-0 right-0 h-full w-full bg-darkBackground/95 flex flex-col items-center justify-center gap-6 z-40"
                >
                  {NavItems.map((item) => (
                    <motion.li
                      variants={itemVariants}
                      key={item.name}
                      onClick={() => {
                        lenis?.scrollTo(item.href);
                        setNav(false); // also closes menu
                      }}
                      className="text-primary-500 text-xl"
                    >
                      {item.name}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      ) : (
        <div className="flex justify-between items-center py-4 tamplate">
          {/* Home Icon */}
          <a
            href="#home"
            className="text-primary-400 p-4 hover:bg-background rounded-full bg-primary-500 hover:text-darkBackground transition-colors duration-300"
          >
            <HomeIcon className="w-8 h-8 text-darkBackground" />
          </a>

          {/* Desktop Menu */}
          <motion.ul
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="hidden lg:flex gap-6 text-lg font-semibold border border-background
        rounded-full  px-[2px] py-2"
          >
            {NavItems.map((item) => (
              <li key={item.name}>
                <motion.a
                  href={item.href}
                  className="text-primary-500 px-4 py-2 rounded-full"
                  whileHover={{
                    backgroundColor: "#161b22",
                    transition: { duration: 0.4, ease: "easeInOut" },
                  }}
                  key={item.name}
                  variants={itemVariants}
                >
                  {item.name}
                </motion.a>
              </li>
            ))}
          </motion.ul>

          {/* Mobile Menu Button */}
          <div
            onClick={() => setNav(!nav)}
            className="lg:hidden border border-background rounded-full p-3 cursor-pointer z-50 "
          >
            {nav ? (
              <XMarkIcon className="h-8 w-8 text-background" />
            ) : (
              <Bars3Icon className="h-8 w-8 text-background" />
            )}
          </div>

          {/* Contact Icon (Desktop Only) */}
          <a
            href="#contact"
            className="hidden lg:inline-flex text-secondary-400 p-4 hover:bg-background rounded-full  bg-secondary-500 hover:text-darkBackground transition-colors duration-300"
          >
            <EnvelopeIcon className="h-8 w-8 text-darkBackground" />
          </a>

          {/* Mobile Menu */}
          <AnimatePresence>
            {nav && (
              <motion.ul
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-0 right-0 h-full w-full bg-darkBackground/95 flex flex-col items-center justify-center gap-6 z-40"
              >
                {NavItems.map((item) => (
                  <motion.li
                    variants={itemVariants}
                    key={item.name}
                    onClick={() => setNav(false)}
                    className="text-primary-500 text-xl"
                  >
                    <a href={item.href}>{item.name}</a>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default Header;
