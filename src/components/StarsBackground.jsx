import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function StarsBackground() {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  const generateStars = () => {
    const numStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000
    );

    const newStars = [];
    for (let i = 0; i < numStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      });
    }

    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 4 ;
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20, // keep meteors higher in the sky
        delay: Math.random() * 10, // random delay before start
        duration: Math.random() * 2 + 3, // 3-5 seconds duration
      });
    }

    setMeteors(newMeteors);
  };

  useEffect(() => {
    generateStars();
    generateMeteors();

    const handleResize = () => {
      generateStars();
      generateMeteors();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-background"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: star.opacity,
              animationDuration: `${star.animationDuration}s`,
            }}
          />
        ))}

        {/* Meteors */}
        {meteors.map((meteor) => (
          <motion.div
            key={meteor.id}
            className="meteor" // Tailwind utility class for gradient + shadow
            style={{
              width: `${meteor.size * 50}px`,
              height: `${meteor.size}px`,
              left: `${meteor.x}%`,
              top: `${meteor.y}%`,
            }}
            initial={{
              rotate: 215,
              x: 0,
              opacity: 1,
            }}
            animate={{
              x: 500,
              y: 500,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: meteor.duration,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: meteor.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default StarsBackground;
