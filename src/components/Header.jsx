import {
  Bars3Icon,
  EnvelopeIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
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
    transition: { duration: 1 },
  },
};

function Header() {
  const [nav, setNav] = useState(false);
  const lenis = useLenis();

  const handleScroll = (href) => {
    if (lenis) {
      lenis.scrollTo(href, { offset: 0, duration: 1.2 });
    }
    setNav(false); // Always close the mobile menu after a click
  };

  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 200); // scroll threshold
  });

  useEffect(() => {
    const handleResize = () => {
      // Set the mobile menu to closed if the screen size is larger than 'lg' breakpoint
      if (window.innerWidth >= 1024) {
        setNav(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;

    if (nav) {
      lenis.stop(); // freeze scrolling
      document.documentElement.classList.add(
        "overflow-hidden",
        "overscroll-none"
      );
      document.body.classList.add("overflow-hidden", "overscroll-none");
    } else {
      lenis.start(); // resume scrolling
      document.documentElement.classList.remove(
        "overflow-hidden",
        "overscroll-none"
      );
      document.body.classList.remove("overflow-hidden", "overscroll-none");
    }

    return () => {
      // safety: always re-enable if component unmounts
      lenis.start();
      document.documentElement.classList.remove(
        "overflow-hidden",
        "overscroll-none"
      );
      document.body.classList.remove("overflow-hidden", "overscroll-none");
    };
  }, [nav, lenis]);

  return (
    <>
      <AnimatePresence mode="wait">
        {scrolled ? (
          <motion.nav
            key="scrolled-nav"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
            className="fixed top-0 left-0 w-full z-30 border-b border-white/20 shadow-lg"
          >
            <div className="template flex justify-between items-center py-4 z-30">
              {/* Home Icon */}
              <button
                onClick={() => handleScroll("#home")}
                className="text-primary-400 p-4 hover:bg-background rounded-full bg-primary-500 hover:text-darkBackground transition-colors duration-300"
                aria-label="Go to home section"
              >
                <HomeIcon
                  aria-label="Home icon"
                  className="w-8 h-8 text-darkBackground"
                />
              </button>

              {/* Desktop Menu */}
              <ul className="hidden lg:flex gap-6 text-lg font-semibold border border-background rounded-full">
                {NavItems.map((item) => (
                  <li key={item.name}>
                    <motion.button
                      onClick={() => handleScroll(item.href)}
                      className="text-primary-500 px-4 py-2 rounded-full"
                      whileHover={{
                        backgroundColor: "#161b22",
                        transition: { duration: 0.4, ease: "easeInOut" },
                      }}
                      aria-label={`Go to ${item.name} section`}
                    >
                      {item.name}
                    </motion.button>
                  </li>
                ))}
              </ul>

              {/* Mobile Menu Button */}
              <div
                onClick={() => setNav(!nav)}
                aria-label="Open menu"
                className="lg:hidden border border-background rounded-full p-3 cursor-pointer z-30"
              >
                {nav ? (
                  <XMarkIcon className="h-8 w-8 text-background" />
                ) : (
                  <Bars3Icon className="h-8 w-8 text-background" />
                )}
              </div>

              {/* Contact Icon (Desktop Only) */}
              <button
                onClick={() => handleScroll("#contact")}
                className="hidden lg:inline-flex text-secondary-400 p-4 hover:bg-background rounded-full bg-secondary-500 hover:text-darkBackground transition-colors duration-300"
                aria-label="Go to contact section"
              >
                <EnvelopeIcon className="h-8 w-8 text-darkBackground" />
              </button>
            </div>
          </motion.nav>
        ) : (
          <div
            key="initial-nav"
            className="flex w-full justify-between items-center py-4"
          >
            {/* Home Icon */}
            <button
              onClick={() => handleScroll("#home")}
              className="text-primary-400 p-4 hover:bg-background rounded-full bg-primary-500 hover:text-darkBackground transition-colors duration-300 z-30"
              aria-label="Go to home section"
            >
              <HomeIcon className="w-8 h-8 text-darkBackground" />
            </button>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex gap-6 text-lg font-semibold border border-background rounded-full px-[2px] py-2">
              {NavItems.map((item) => (
                <li key={item.name}>
                  <motion.button
                    onClick={() => handleScroll(item.href)}
                    className="text-primary-500 px-4 py-2 rounded-full"
                    whileHover={{
                      backgroundColor: "#161b22",
                      transition: { duration: 0.4, ease: "easeInOut" },
                    }}
                    aria-label={`Go to ${item.name} section`}
                  >
                    {item.name}
                  </motion.button>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setNav(!nav)}
              className="lg:hidden border border-background rounded-full p-3 cursor-pointer z-30"
              aria-label="Close menu"
            >
              {nav ? (
                <XMarkIcon className="h-8 w-8 text-background" />
              ) : (
                <Bars3Icon className="h-8 w-8 text-background" />
              )}
            </button>

            {/* Contact Icon (Desktop Only) */}
            <button
              onClick={() => handleScroll("#contact")}
              className="hidden lg:inline-flex text-secondary-400 p-4 hover:bg-background rounded-full bg-secondary-500 hover:text-darkBackground transition-colors duration-300"
              aria-label="Go to contact section"
            >
              <EnvelopeIcon className="h-8 w-8 text-darkBackground" />
            </button>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Menu (conditionally rendered with AnimatePresence) */}
      <AnimatePresence>
        {nav && (
          <motion.ul
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 h-[100dvh] w-screen overflow-hidden touch-none bg-darkBackground/95 
             flex flex-col items-center justify-center gap-6 z-40 "
          >
            <div className="absolute top-6 right-[90px]">
              <button
                onClick={() => setNav(!nav)}
                className="text-primary-400 p-3 hover:bg-background rounded-full bg-primary-500 hover:text-darkBackground transition-colors duration-300"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-8 w-8 text-darkBackground" />
              </button>
            </div>
            {NavItems.map((item) => (
              <motion.li
                variants={itemVariants}
                key={item.name}
                onClick={() => handleScroll(item.href)}
                className="text-primary-500 text-xl cursor-pointer"
              >
                {item.name}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
