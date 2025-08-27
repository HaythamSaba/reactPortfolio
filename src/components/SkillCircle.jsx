import { useMotionValue, useTransform, motion, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export default function SkillCircle({ name, value, icon }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressValue = useMotionValue(0);

  const progressText = useTransform(
    progressValue,
    (latest) => `${Math.round(latest)}%`
  );

  const strokeDashoffset = useTransform(
    progressValue,
    (latest) => circumference - (latest / 100) * circumference
  );

  // The `useEffect` will be triggered when the component is mounted,
  // which happens sequentially thanks to the parent's stagger.
  useEffect(() => {
    animate(progressValue, value, {
      duration: 1.5,
      ease: [0.42, 0, 0.58, 1],
    });
  }, [value, progressValue]);

  return (
    // This is now a regular div
    <div className="flex flex-col items-center relative border border-[#82e0aa]/30 w-full p-4 rounded-lg shadow-box bg-background/10">
      <div className="relative w-[120px] h-[120px] flex items-center justify-center">
        <svg width="120" height="120" className="rotate-[-90deg]">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="transparent"
            stroke="#f7dc6f"
            strokeWidth="10"
          />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="transparent"
            stroke="#82e0aa"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          <motion.span className="text-lg font-bold text-slate-100">
            {progressText}
          </motion.span>
          <span className="w-8 h-8">{icon}</span>
        </div>
      </div>
      <span className="mt-4 text-slate-200">{name}</span>
    </div>
  );
}
