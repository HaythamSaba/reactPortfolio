import { useEffect, useState } from "react";

function TypeWriter({ text, startDelay = 1.8 }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 800);
        }
      }, 55);
      return () => clearInterval(interval);
    }, startDelay * 1000);
    return () => clearTimeout(timeout);
  }, [text, startDelay]);

  useEffect(() => {
    if (done) {
      setShowCursor(false);
      return;
    }
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, [done]);

  return (
    <span>
      {displayed}
      <span
        className="inline-block w-[3px] h-[0.85em] ml-1 align-middle rounded-sm"
        style={{
          backgroundColor: "#f7dc6f",
          opacity: showCursor ? 1 : 0,
          transition: "opacity 0.1s",
        }}
      />
    </span>
  );
}

export default TypeWriter;