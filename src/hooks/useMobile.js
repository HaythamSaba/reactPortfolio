import { useEffect, useState, useRef } from "react";

function useMobile(breakpoint = 768) {
  // ✅ Lazy initializer — reads real screen size on first render, no flash
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );
  const isMobileRef = useRef(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );

  useEffect(() => {
    const checkScreen = () => {
      const newIsMobile = window.innerWidth < breakpoint;
      if (newIsMobile !== isMobileRef.current) {
        setIsMobile(newIsMobile);
        isMobileRef.current = newIsMobile;
      }
    };

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);

  return isMobile;
}

export default useMobile;
