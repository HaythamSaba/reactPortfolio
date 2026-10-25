import { useEffect, useState } from "react";
import { MdArrowUpIcon } from "../icons/TechIcons";

function ScrollUpButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-4 right-4 z-50 bg-primary-300 p-3 rounded-full text-black cursor-pointer transition-all duration-300 hover:bg-primary-500 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-secondary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-darkBackground"
    >
      <MdArrowUpIcon />
    </button>
  );
}

export default ScrollUpButton;
