import { useEffect, useState, useRef } from "react";

function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const checkScreen = () => {
      const newIsMobile = window.innerWidth < breakpoint;
      if (newIsMobile !== isMobileRef.current) {
        setIsMobile(newIsMobile);
        isMobileRef.current = newIsMobile;
      }
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);

  return isMobile;
}

export default useMobile;