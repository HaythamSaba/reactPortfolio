import { motion, useReducedMotion, useTransform } from "framer-motion";

const pad = (n) => String(n).padStart(2, "0");
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/**
 * Pose of a card based on its distance `d` from the active slot.
 *   d > 0  → still waiting in the deck: lifted, pushed back, tilted flat
 *   d = 0  → the crest: upright, facing the viewer
 *   d < 0  → folded forward and dropping into the pit below
 */
function cardPose(d) {
  if (d >= 0) {
    const tilt = clamp(d, 0, 1);
    return {
      // lift so each waiting card peeks above the one in front of it
      y: -(tilt * 70 + d * 34),
      z: -(tilt * 170 + d * 50), // deep enough that tilted cards never intersect
      rotateX: tilt * 58,
      scale: 1 - Math.min(d, 4) * 0.035,
      opacity: clamp(4 - d, 0, 1), // only ~3 cards visible behind the crest
    };
  }

  const t = -d;
  return {
    y: t * 340,
    z: t * 30,
    rotateX: -clamp(t, 0, 1.2) * 70,
    scale: 1,
    opacity: clamp(1.6 - t, 0, 1),
  };
}

const CARD_FACE_CLASSES =
  "photo-cascade__card rounded-3xl overflow-hidden";

function CascadeCard({ photo, index, count, active }) {
  const d = useTransform(active, (a) => index - a);

  const y = useTransform(d, (v) => cardPose(v).y);
  const z = useTransform(d, (v) => cardPose(v).z);
  const rotateX = useTransform(d, (v) => cardPose(v).rotateX);
  const scale = useTransform(d, (v) => cardPose(v).scale);
  const opacity = useTransform(d, (v) => cardPose(v).opacity);
  // Fallback for browsers that flatten the 3D context
  const zIndex = useTransform(d, (v) => 100 - Math.round(Math.abs(v) * 10));

  return (
    <motion.figure
      className={CARD_FACE_CLASSES}
      style={{ y, z, rotateX, scale, opacity, zIndex }}
    >
      <CardFace photo={photo} index={index} count={count} />
    </motion.figure>
  );
}

function CardFace({ photo, index, count }) {
  return (
    <>
      <img
        src={photo.src}
        alt={photo.alt}
        loading={index < 2 ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full select-none object-cover"
      />
      <div className="photo-cascade__shade pointer-events-none absolute inset-0" aria-hidden="true" />

      <span
        className="absolute left-4 top-4 rounded-full bg-darkBackground/35 px-2.5 py-1 text-xs tracking-widest text-background/90 uppercase backdrop-blur-sm tabular-nums"
        aria-hidden="true"
      >
        {pad(index + 1)} / {pad(count)}
      </span>
      {photo.tag ? (
        <span
          className="absolute right-[18px] top-[21px] text-xs tracking-widest text-background/90 uppercase"
          aria-hidden="true"
        >
          {photo.tag}
        </span>
      ) : null}

      <figcaption className="absolute inset-x-5 bottom-5 text-left text-background">
        {photo.place ? (
          <span className="mb-1 block text-xs tracking-widest text-primary-400 uppercase">
            {photo.place}
            {photo.year ? ` · ${photo.year}` : ""}
          </span>
        ) : null}
        <strong className="block text-2xl leading-tight tracking-tight">
          {photo.title}
        </strong>
        {photo.caption ? (
          <p className="hidden md:block mt-1.5 text-sm leading-relaxed text-background/70">
            {photo.caption}
          </p>
        ) : null}
      </figcaption>
    </>
  );
}

/**
 * Scroll-driven 3D card deck. Pass the scroll progress (0 → 1) of the
 * pinned section; the first card is upright at 0, the last one at ~0.95.
 */
function PhotoCascade({ photos, progress }) {
  const reducedMotion = useReducedMotion();
  const count = photos.length;

  const active = useTransform(progress, [0.04, 0.95], [0, count - 1]);
  const counter = useTransform(active, (a) => pad(Math.round(a) + 1));
  const place = useTransform(active, (a) => photos[Math.round(a)]?.place ?? "");

  if (reducedMotion) {
    return (
      <ul
        className="grid w-full max-w-[340px] grid-cols-2 list-none gap-3 p-0"
        role="list"
      >
        {photos.map((photo, index) => (
          <li key={photo.src}>
            <figure className={`${CARD_FACE_CLASSES} relative inset-auto aspect-[4/5] h-auto w-full`}>
              <CardFace photo={photo} index={index} count={count} />
            </figure>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="photo-cascade w-full max-w-[340px] max-[900px]:max-w-[260px]">
      <div className="mb-1 hidden items-baseline gap-2 text-xs tracking-widest text-slate-400 uppercase md:flex">
        <motion.span className="text-3xl font-bold tracking-tight text-primary-400 tabular-nums">
          {counter}
        </motion.span>
        <span>/ {pad(count)}</span>
        <motion.span className="ml-auto normal-case tracking-normal text-secondary-400">
          {place}
        </motion.span>
      </div>

      <div className="photo-cascade__deck">
        <div
          className="photo-cascade__card-slot rounded-3xl bg-transparent opacity-50"
          aria-hidden="true"
        />

        <div className="photo-cascade__stack">
          {photos.map((photo, index) => (
            <CascadeCard
              key={photo.src}
              photo={photo}
              index={index}
              count={count}
              active={active}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhotoCascade;
