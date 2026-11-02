import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Fragment, useRef } from "react";

const START_OPACITY = 0.18;
const SPREAD = 0.8;
const WORD_DURATION = 0.22;

function getWordProgressRange(index, count) {
  const start = count <= 1 ? 0 : (index / (count - 1)) * SPREAD;

  return {
    start,
    end: Math.min(1, start + WORD_DURATION),
  };
}

export function getWordOpacity(
  progress,
  { start, end },
  startOpacity = START_OPACITY,
) {
  if (progress <= start) return startOpacity;
  if (progress >= end) return 1;

  const wordProgress = (progress - start) / (end - start);

  return startOpacity + (1 - startOpacity) * wordProgress;
}

function Word({ children, progress, index, count, reducedMotion }) {
  const range = getWordProgressRange(index, count);

  const opacity = useTransform(progress, (latest) =>
    getWordOpacity(latest, range),
  );

  return (
    <motion.span
      className="inline"
      style={reducedMotion ? undefined : { opacity }}
    >
      {children}
    </motion.span>
  );
}

/**
 * `image` can be a node, or a function that receives the section's
 * scroll progress (MotionValue 0 → 1) so the visual can sync with the text.
 * `scrollLength` controls how long the section stays pinned.
 */
function TextScrollWordReveal({ statement, image, scrollLength = "200vh" }) {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const words = statement.split(" ");
  const visual = typeof image === "function" ? image(scrollYProgress) : image;

  return (
    <section
      ref={sectionRef}
      className="w-full [overflow-x:clip]"
      style={{ minHeight: scrollLength }}
      aria-labelledby="scroll-word-reveal-heading"
    >
      <div className="sticky top-[96px] flex min-h-[calc(100vh-96px)] w-full items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-[minmax(200px,340px)_minmax(0,1fr)] items-center gap-14 max-[900px]:grid-cols-1 max-[900px]:justify-items-center max-[900px]:gap-5 max-[900px]:text-center">
          {visual ? (
            <div className="flex justify-center overflow-hidden lg:overflow-visible">{visual}</div>
          ) : null}

          <div className="flex flex-1 flex-col max-[900px]:max-w-[44ch]">
            <div className="mb-7 flex items-center gap-4 max-[900px]:mb-4 max-[900px]:justify-center">
              <span
                className="relative h-0.5 w-full overflow-hidden rounded-full bg-background/[0.12]"
                aria-hidden="true"
              >
                <motion.span
                  className="absolute inset-0 block origin-left bg-gradient-to-r from-primary-400 to-secondary-400"
                  style={{ scaleX: reducedMotion ? 1 : scrollYProgress }}
                />
              </span>
            </div>

            <p
              id="scroll-word-reveal-heading"
              className="m-0 max-w-full text-[clamp(20px,2vw_+_6px,28px)] font-bold leading-[1.18] tracking-tight text-background [text-wrap:balance] max-[900px]:text-lg max-[900px]:leading-[1.3]"
            >
              {words.map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                  <Word
                    progress={scrollYProgress}
                    index={index}
                    count={words.length}
                    reducedMotion={Boolean(reducedMotion)}
                  >
                    {word}
                  </Word>

                  {index < words.length - 1 ? " " : null}
                </Fragment>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TextScrollWordReveal;
