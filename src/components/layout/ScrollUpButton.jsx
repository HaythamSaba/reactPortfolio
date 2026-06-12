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
    <div
      className="fixed bottom-4 right-4 z-50 bg-primary-300 p-2 rounded-full text-black cursor-pointer transition-all duration-300 hover:bg-primary-500 hover:text-white"
      onClick={handleScrollToTop}
    >
      <MdArrowUpIcon />
    </div>
  );
}

export default ScrollUpButton;
