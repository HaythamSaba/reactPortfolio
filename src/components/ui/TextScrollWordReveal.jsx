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
      className="scroll-word-reveal__word"
      style={reducedMotion ? undefined : { opacity }}
    >
      {children}
    </motion.span>
  );
}

function TextScrollWordReveal({ statement, image }) {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.94, 1, 0.96],
  );

  const words = statement.split(" ");

  return (
    <>
      <section
        ref={sectionRef}
        className="scroll-word-reveal"
        aria-labelledby="scroll-word-reveal-heading"
      >
        <div className="scroll-word-reveal__stage">
          <div className="scroll-word-reveal__layout">
            {image ? (
              <motion.div
                className="scroll-word-reveal__image"
                // style={
                //   reducedMotion
                //     ? undefined
                //     : { y: imageY, scale: imageScale }
                // }
              >
                {image}
              </motion.div>
            ) : null}

            <div className="scroll-word-reveal__content">
              <div className="scroll-word-reveal__meta">
                <span className="scroll-word-reveal__track" aria-hidden="true">
                  <motion.span
                    style={{ scaleX: reducedMotion ? 1 : scrollYProgress }}
                  />
                </span>
              </div>

              <h1
                id="scroll-word-reveal-heading"
                className="scroll-word-reveal__heading"
                aria-label={statement}
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
              </h1>
            </div>
          </div>
        </div>
      </section>

      <Stylesheet />
    </>
  );
}

function Stylesheet() {
  return (
    <style>{`
      .scroll-word-reveal {
        width: 100%;
        min-height: 200vh;
        overflow-x: clip;
      }

      .scroll-word-reveal__stage {
        position: sticky;
        top: 96px;
        width: 100%;
        min-height: calc(100vh - 96px);
        display: flex;
        align-items: center;
        overflow: hidden;
        padding: 48px 0;
      }

      .scroll-word-reveal__layout {
        width: 100%;
        max-width: 1180px;
        display: grid;
        grid-template-columns: minmax(200px, 340px) minmax(0, 1fr);
        align-items: start;
        gap: 56px;
        margin: 0 auto;
      }

      .scroll-word-reveal__image {
        display: flex;
        justify-content: center;
      }

      .scroll-word-reveal__content {
        display: flex;
        flex-direction: column;
        flex: 1;
        max-width: 640px;
      }

      .scroll-word-reveal__meta {
        display: flex;
        align-items: center;
        gap: 16px;
        margin: 0 0 28px;
      }

      .scroll-word-reveal__track {
        position: relative;
        width: 100%;
        height: 2px;
        overflow: hidden;
        background: rgba(240, 231, 219, 0.12);
        border-radius: 999px;
      }

      .scroll-word-reveal__track span {
        position: absolute;
        inset: 0;
        display: block;
        background: linear-gradient(90deg, #82e0aa, #f7dc6f);
        transform-origin: left;
      }

      .scroll-word-reveal__heading {
        max-width: 100%;
        margin: 0;
        color: #f0e7db;
        font-size: clamp(26px, 3.6vw, 20px);
        font-weight: 700;
        letter-spacing: -0.02em;
        line-height: 1.18;
        text-wrap: balance;
      }

      .scroll-word-reveal__word {
        display: inline;
      }

      @media (max-width: 900px) {
        .scroll-word-reveal__stage {
          padding: 24px 0;
        }

        .scroll-word-reveal__layout {
          grid-template-columns: 1fr;
          justify-items: center;
          text-align: center;
          gap: 32px;
        }

        .scroll-word-reveal__content {
          max-width: 44ch;
        }

        .scroll-word-reveal__meta {
          justify-content: center;
        }
      }
    `}</style>
  );
}

export default TextScrollWordReveal;
