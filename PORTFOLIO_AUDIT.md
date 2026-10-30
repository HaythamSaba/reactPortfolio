# Portfolio Audit — haytham-saba.vercel.app

Read-only audit. No source files were modified to produce this document. Every claim below was verified by reading the actual file at the time of writing (repo `HEAD` = commit `d4e34ef`, working tree clean). File:line references point to the exact lines read.

**Screenshots: not captured.** No Playwright tool and no "webapp-testing" skill were available in this session — only generic Chrome browser automation (`mcp__claude-in-chrome__*`), which is a different tool than what you asked for, and which I'd already found earlier in this session cannot reliably resize to exact breakpoints (`resize_window` doesn't change the effective viewport in this environment). Rather than produce unreliable screenshots under a tool you didn't ask for, I skipped this step entirely, per your own fallback instruction. If you want real 1440/768/375 screenshots, the most reliable path is to run `npm run dev` yourself and send them to me, or grant Playwright access.

---

## 1. Tech stack & architecture

| | |
|---|---|
| Framework | React 18.2.0 (`package.json:17`) |
| Build tool | Vite 7.3.1 (`package.json:27`) |
| Router | `react-router-dom` 7.8.0 — used for exactly one thing: a catch-all 404 (`src/App.jsx:11-14`). This is a single scrolling page, not a multi-page app. |
| Animation | `framer-motion` 12.23.12 (`package.json:16`). No GSAP, no Three.js, no Lenis-adjacent scroll library beyond the smooth-scroll one below. |
| Smooth scroll | `@studio-freight/react-lenis` 0.0.47 + `@studio-freight/lenis` 1.0.42, wrapping the whole app at `src/App.jsx:9` (`<ReactLenis root>`) |
| Styling | Tailwind CSS 3.3.5 (`package.json:26`, config-file based, **not** v4's `@theme` CSS syntax) + `postcss.config.js` (3 lines, just `tailwindcss` + `autoprefixer`) |
| Forms | `@formspree/react` 3.0.0 — `src/components/sections/Contact/ContactForm.jsx:1,5` |
| Icons | **Not** `react-icons` despite it being a dependency (`package.json:19`) — every icon actually used is a hand-written inline SVG in `src/components/icons/TechIcons.jsx` (249 lines, ~30 icon components). `@heroicons/react` 2.2.0 is also a dependency and *is* used, for exactly two icons in `Header.jsx:1` (`HomeIcon`, `EnvelopeIcon`). `react-icons` itself appears to be an unused dependency — UNCLEAR whether it's a leftover from an earlier version of the project; grep found zero imports from it anywhere in `src/`. |
| Analytics | `@vercel/analytics` 1.6.1, mounted at `src/App.jsx:16` |
| Language | **Plain JavaScript/JSX throughout.** Confirmed via `**/*.{ts,tsx}` glob — zero TypeScript files in the project (only inside `node_modules`). No `tsconfig.json`, no `jsconfig.json`. |
| Linting | **No ESLint config found anywhere in the repo root.** No `.eslintrc*`, no `eslint.config.js` outside `node_modules`. No test runner, no CI config (no `.github/workflows`). |

### Folder structure (2-3 levels)

```
src/
├── App.jsx                  — Router + Lenis + Analytics wrapper
├── main.jsx                 — ReactDOM root, imports index.css
├── index.css                — Tailwind directives, @font-face, base layer, .template/.shadow-box/.meteor
├── pages/
│   ├── Home.jsx              — the entire single-page site, section-by-section
│   └── NotFound.jsx          — 404 page (animated glitch effect)
├── hooks/
│   └── useMobile.js          — a `useMobile(breakpoint)` hook. UNUSED — not imported anywhere.
├── data/
│   ├── StaticData.js         — TECH_ICONS, projects, certificates, skills — all hardcoded JS arrays
│   └── Animation.js          — two shared Framer Motion variant objects (see §4)
└── components/
    ├── layout/                — page-chrome, not content sections
    │   ├── Header.jsx          — nav, scroll-aware styling swap, mobile menu
    │   ├── SectionLayout.jsx   — shared wrapper (padding + flex-center) for every section except Hero
    │   ├── StarsBackground.jsx — fixed-position star/meteor field behind everything
    │   └── ScrollUpButton.jsx  — floating scroll-to-top button
    ├── sections/               — one file per page section (see §2)
    │   ├── Hero.jsx, About.jsx, Projects.jsx, Skills.jsx, Certificates.jsx, Footer.jsx
    │   └── Contact/
    │       ├── Contact.jsx, ContactForm.jsx, ContactInfo.jsx
    ├── ui/                     — reusable presentational components used by sections
    │   ├── ProjectCard.jsx, CertificateCard.jsx, CertificateModal.jsx, SkillCard.jsx, SkillCircle.jsx (unused)
    │   ├── HireMeCard.jsx, GreenButton.jsx, SectionHeader.jsx
    │   ├── ProfileRing.jsx, FloatingIcon.jsx, GridLines.jsx, ShimmerLine.jsx
    │   ├── SplitText.jsx, TypeWriter.jsx  — text-reveal primitives used only in Hero
    │   └── TextScrollWordReveal.jsx       — scroll-driven word reveal, used only in About
    └── icons/
        └── TechIcons.jsx       — ~30 hand-written inline SVG icon components
```

### Data flow

Everything is hardcoded in `src/data/StaticData.js` (237 lines) — no CMS, no JSON fetch, no MDX. Three exported arrays plus one icon-position config:
- `TECH_ICONS` (`StaticData.js:23-122`) — the 8 floating tech-logo icons in the Hero, each with desktop (`finalTop`/`finalLeft`) and mobile (`mobileTop`/`mobileLeft`) position overrides, plus per-icon animation timing (`delay`, `floatDuration`, `floatDelay`, `rotate`).
- `projects` (`StaticData.js:124-198`) — 5 projects, each with `title`, `description`, `devStack` (array of tag strings), `image` (public path), `link` (live demo), `git` (repo-name suffix — see note below), `type`, `featured` (boolean, currently unused by any component — see §2), `progress` (boolean, drives an "In Progress" badge).
- `certificates` (`StaticData.js:200-219`) — 3 entries, `name`/`imageUrl`/`description`.
- `skills` (`StaticData.js:221-236`) — 14 entries, each `name`/`icon` (component reference)/`color` (hex).

**Note on `git`:** `ProjectCard.jsx:85` builds the GitHub link as `https://github.com/HaythamSaba/${project.git}` — so `git` is actually just the repo-name suffix, not a full URL or flag. Minor naming choice worth knowing if you edit `StaticData.js` by hand.

**Note on `featured`:** every project in `StaticData.js` has `featured: true/false` set (3 `true`, 2 `false` — `StaticData.js:141,153,172,183,195`), but `Projects.jsx:26` maps over the flat `projects` array with no filtering or grouping by it at all. The field is currently inert — present in data, not read by any component.

### Routing / navigation / scroll

- Single route (`App.jsx:12`), everything else 404s (`App.jsx:13`).
- In-page navigation is **not** real anchor-link routing — every nav item (`Header.jsx:13-20`, `Footer.jsx:10-16`) calls a `handleScroll(href)` function that calls `lenis.scrollTo(href, {...})` (e.g. `Header.jsx:35-41`). Hrefs are the literal section ids (`#home`, `#about`, etc.), matching the `id` attributes on each `<section>` in `Home.jsx:17-44`.
- No scroll-spy (no component tracks which section is currently in view to highlight the matching nav item).
- Header has exactly one scroll-driven state: `scrolled` (`Header.jsx:43-48`, via `useMotionValueEvent` on `useScroll()`, threshold `latest > 200`) which swaps the entire nav between two different JSX trees (`AnimatePresence` + conditional render, `Header.jsx:92-213`) rather than just toggling a class — see §4 for the animation detail.

---

## 2. Sections inventory (page order, per `Home.jsx:17-44`)

### Hero — `src/components/sections/Hero.jsx` (262 lines)
**Children:** `Header`, `FloatingIcon` ×8 (each wrapped in a locally-defined `ParallaxLayer`, `Hero.jsx:25-37`), `GridLines`, `SplitText`, `ShimmerLine`, `TypeWriter`, `ProfileRing`.
**Purpose/content:** Name, role, a one-line location/availability pill, a one-line description, two CTAs ("Contact Me" / "View Projects"), a scroll hint.
**Layout:** `min-h-screen`, single flex column, everything centered (`Hero.jsx:98-101`). Not a grid — purely stacked, centered content with absolutely-positioned decorative layers (grid lines, floating icons, a large radial-gradient "dome" div at `Hero.jsx:96`).
**Interactive:** mouse-move parallax on the 8 floating icons (desktop + fine-pointer + non-reduced-motion only, `Hero.jsx:53-57`); two CTA buttons with hover/tap scale+color.
**Honest read:** This is the most heavily art-directed section on the site and it shows — the layered reveal (name → role → location pill → description → buttons → scroll hint), the mouse parallax, and the Cormorant-accent role text give it a genuinely distinctive, not-template feel. The weak point is pure pacing: on a first visit the buttons don't land until 3.6s in (`Hero.jsx:197,218`), which is slow for a recruiter skimming on a phone. It's gated to play once per session (`Hero.jsx:40-43`), so repeat views are fine — only the very first visit pays this cost.

### About — `src/components/sections/About.jsx` (126 lines)
**Children:** `TextScrollWordReveal` (wrapping a locally-defined `AboutPhoto`), `GreenButton`.
**Purpose/content:** A scroll-revealed bio paragraph next to a photo, 3 "quick fact" pills (location, availability, tech focus), CV download button, "Get in Touch" button.
**Layout:** `TextScrollWordReveal` renders its own internal 2-column CSS Grid (photo + text, `TextScrollWordReveal.jsx:151-159`), independent of Tailwind's breakpoint system — see §3 inconsistencies.
**Interactive:** none beyond the two buttons and the scroll-linked reveal.
**Honest read:** The scroll-pinned word-by-word reveal is a nice, unusual technique for a portfolio bio — most sites just fade a paragraph in once. But there's a live bug here (see §4/§3): the heading's `font-size: clamp(26px, 3.6vw, 20px)` (`TextScrollWordReveal.jsx:201`) has its max smaller than its min, which is invalid and will likely just render as a flat 26px regardless of viewport, silently killing the intended responsive scaling. The photo's scroll-parallax is also dead code — `imageY`/`imageScale` are computed but the `style` prop that would apply them is commented out (`TextScrollWordReveal.jsx:82-86`), so the photo currently doesn't move at all during the scroll-reveal, just the words do.

### Projects — `src/components/sections/Projects.jsx` (34 lines)
**Children:** `ProjectCard` ×5, `HireMeCard` (rendered as a 6th grid item).
**Purpose/content:** 5 project cards + one "hire me" filler card, in one flat grid.
**Layout:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4` (`Projects.jsx:20`) — a plain, uniform grid. No featured/hierarchy treatment despite the data supporting one (see §1 note on `featured`).
**Interactive:** per-card image zoom on hover (CSS, `ProjectCard.jsx:25`), live-demo link, GitHub link, "In Progress" badge conditional on `project.progress`.
**Honest read:** Functionally solid — every project has a working live link and GitHub link (I didn't re-verify these in this read-only pass, but they were confirmed live in an earlier session). Visually it's the most generic section on the site: a uniform card grid is the single most common portfolio pattern there is, and nothing here (motion, layout, or card design) currently differentiates it. The `featured` field sitting unused in the data is the clearest sign this was mid-redesign at some point and reverted.

### Skills ("Tech Stack") — `src/components/sections/Skills.jsx` (65 lines)
**Children:** `SkillCard` ×6 or ×14 (toggle), `GreenButton`.
**Purpose/content:** A grid of 14 tech logos with a show-more/show-less toggle (defaults to showing 6).
**Layout:** `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4` (`Skills.jsx:31`).
**Interactive:** show more/less (`AnimatePresence mode="sync"`, `Skills.jsx:32`), per-card hover reveal (color brightens from a dim default — this used to be hover-only *invisible* and was fixed earlier to be visible-by-default; confirmed still fixed, `SkillCard.jsx:53-55` sets `color` directly, not conditionally).
**Honest read:** Clean, functional, appropriately modest — this section doesn't need to be flashy and isn't trying to be. The enter/exit animation on toggle (`SkillCard.jsx:4-18`) is a nice touch that a lot of "show more" buttons skip entirely.

### Certificates — `src/components/sections/Certificates.jsx` (73 lines)
**Children:** `CertificateCard` ×3, `CertificateModal` (lazy-loaded, `Certificates.jsx:12`).
**Purpose/content:** 3 certificate thumbnails, each opens a full-size modal on click.
**Layout:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4` (`Certificates.jsx:43`).
**Interactive:** modal open/close (click, Escape key `Certificates.jsx:18-19`, click-outside `CertificateModal.jsx:41`), real focus trap + focus restoration (`CertificateModal.jsx:9-36`).
**Honest read:** The accessibility work here (focus trap, `role="dialog"`, `aria-modal`, scroll lock, focus restoration on close) is more thorough than most portfolios bother with for a simple image-lightbox. The modal itself has zero enter/exit animation though — it's an instant show/hide via conditional render, no `AnimatePresence`, which reads as a missed, cheap opportunity next to how animated the rest of the site is.

### Contact — `src/components/sections/Contact/Contact.jsx` + `ContactForm.jsx` + `ContactInfo.jsx`
**Children:** `ContactInfo`, a social-links pill, `ContactForm`.
**Purpose/content:** Email/location/availability info block, social links, a working contact form (Formspree-backed).
**Layout:** `flex ... flex-col md:flex-row` two-column (`Contact.jsx:23`).
**Interactive:** real form validation (`required` + Formspree server-side `ValidationError`), submit/sending/success states (`ContactForm.jsx:7-16,75`), focus rings on inputs (`ContactForm.jsx:38,51,65` — `focus:ring-1`).
**Honest read:** This is the least animated section on the site — `Contact.jsx` and `ContactInfo.jsx` contain **zero** Framer Motion usage (confirmed by reading both files in full; the only motion anywhere in this whole flow is `GreenButton`'s built-in hover/tap). That's a legitimate, defensible choice for a form (you don't want to fight a user's focus with movement), but it does mean Contact is a flat landing after five sections of comparatively rich motion.

### Footer — `src/components/sections/Footer.jsx` (144 lines)
**Children:** none (self-contained).
**Purpose/content:** Brand blurb, quick links, email + 3 social icons, copyright line.
**Layout:** `grid-cols-1 md:grid-cols-3 gap-12` (`Footer.jsx:49`).
**Interactive:** quick-link buttons (smooth-scroll), social links, email `mailto:`.
**Honest read:** Standard three-column footer, does its job, no complaints. Social links here duplicate the ones in Contact's social pill almost exactly (same 3 platforms, same icons) — not wrong, just redundant with the section immediately above it.

### Header (nav) — `src/components/layout/Header.jsx` (255 lines)
Covered in detail in §1 (routing/scroll). Visually: a pill-shaped nav that's transparent-on-background at the top of Hero and swaps to a blurred glass bar (`backdrop-blur`, `Header.jsx:100-105`) once scrolled past 200px. Mobile gets a full-screen slide-in menu (`Header.jsx:216-249`). Every interactive element has a real `aria-label` and the shared `focus-visible` ring treatment is present on the mobile-menu buttons; the desktop pill buttons rely on the browser's default focus ring (no `outline-none` set, so nothing to override).

### StarsBackground + ScrollUpButton — `src/components/layout/`
Not content sections, but present on every page view. `StarsBackground.jsx` renders a `fixed inset-0` field of static star dots (density = `viewport area / 10000`, `StarsBackground.jsx:10-11`) plus 4 animated meteor streaks. `ScrollUpButton.jsx` is a simple fixed button that appears past 400px scroll.

---

## 3. Design system

### Colors

All custom tokens live in `tailwind.config.js:6-32`:

| Token | Hex | Used for |
|---|---|---|
| `primary.100`–`900` | `#e6f8ee` → `#1b4b35` | Green accent scale. `400` (`#82e0aa`) is the main brand green, used constantly across buttons, borders, glows, icon colors. |
| `secondary.100`–`900` | `#fef9e5` → `#5b460b` | Yellow accent scale. `400` (`#f7dc6f`) is the main brand yellow, used for the role text, secondary buttons, the TypeWriter cursor. |
| `background` | `#f0e7db` | Warm off-white, used for light surfaces (e.g. `CertificateCard.jsx:10`, `CertificateModal.jsx:49`) and as `text-background` for light text on dark cards. |
| `darkBackground` | `#0c0c0c` | The page's base dark background (`Home.jsx:13`). |
| `textColor` | `#0d1117` | Near-black, used as text color on light/bright surfaces (buttons, badges). |

**No dark/light mode toggle.** The site is dark-only by design — there's no `prefers-color-scheme` handling, no theme context, no toggle UI anywhere in `src/`.

**Hardcoded colors that bypass the token system** (grepped across every file read in this audit):
- Tailwind's **default** `slate-*` palette is used extensively for secondary text — `slate-100/200/300/400/500/600/800/900` appear in at least 15 files (e.g. `SectionHeader.jsx:18,33`, `Header.jsx` nowhere actually, `NotFound.jsx:37,67,75,119`, `SkillCard.jsx:67`, `ContactForm.jsx` labels). These aren't part of the custom green/yellow/background/dark/text system at all — they're Tailwind's stock gray scale, used as the de facto "muted text" color throughout.
- Raw hex literals inside `style={{}}` props, bypassing Tailwind entirely: `#82e0aa`, `#f7dc6f`, `#0d1117`, `#f0e7db`, `#161b22` — e.g. `ProfileRing.jsx:11,20,28`, `Hero.jsx:79` (gradient), `Header.jsx:124,179` (hover bg), `TypeWriter.jsx:40` (cursor color), `SplitText`/motion `whileHover` blocks across Hero/About/HireMeCard/NotFound (`backgroundColor: "#f0e7db"` etc. instead of a Tailwind color class).
- `SkillCard`'s per-skill `color` values (`StaticData.js:222-235`, 14 distinct hexes like `#e34f26`, `#61dafb`) are a deliberate exception — these are the *real brand colors* of each technology (React blue, TypeScript blue, etc.), not site-theme colors, so bypassing the token system here is reasonable.
- `bg-black` / `text-background` — `ProjectCard.jsx:33,38` — the card body is literally Tailwind's stock `black` (`#000000`), not `darkBackground` (`#0c0c0c`). Minor, but it means project cards are a visibly different, pure-black shade from the rest of the page's near-black background.
- `shadow-2xl shadow-white/30` — `ProjectCard.jsx:18`, `HireMeCard.jsx:23` — a **white**-tinted shadow/glow on dark cards, which is a different idiom from the green/yellow-tinted `shadow-box` utility (`index.css:71-75`, used in `Contact.jsx:28`) or the `shadow-primary-500/30` used on About's quick-fact pills (`About.jsx:88`). Three different shadow-color idioms coexist for conceptually the same "glowing card" effect.

### Typography

- **Gilroy** (self-hosted, `/fonts/Gilroy-Regular.woff2` + `/fonts/Gilroy-Bold.woff2`, `index.css:5-18`) — only weights **400 and 700** are loaded, despite the font family historically shipping many more (this was trimmed down in an earlier pass — confirmed only 2 files remain in `public/fonts/`, 88KB total). Applied as the global body default via `@layer base { body { @apply font-gilroy; } }` (`index.css:20-23`).
- **Cormorant** (Google Fonts, `index.html:14`) — italic weights **500 and 600 only** (`ital,wght@1,500;1,600`). Used in exactly two places: the Hero role text (`font-cormorant`, `Hero.jsx:139`) and HireMeCard's heading (`HireMeCard.jsx:39`). This is a deliberate, restrained accent-font choice, not the base typeface.
- **Type scale**: `index.css:24-41` defines a base-layer scale (h1 `text-4xl`/bold → h6 `text-base`/medium), but it's **inconsistently honored** — every section title (`SectionHeader.jsx:18`, `text-3xl md:text-7xl font-extrabold`) and every card title (`ProjectCard.jsx:38-40`, `HireMeCard.jsx:39`, `CertificateCard.jsx:23`) overrides the base rule directly with its own one-off size/weight combination rather than using the base scale or a shared heading component. The base-layer scale is effectively vestigial outside of plain, unstyled `<h4>`/`<h5>`/`<h6>` usages like `ContactInfo.jsx:35` and `Contact.jsx:29`.
- **Text effects**: per-letter stagger reveal (`SplitText.jsx`), JS typewriter (`TypeWriter.jsx`), scroll-linked per-word opacity reveal (`TextScrollWordReveal.jsx`), a 404 glitch/double-vision effect via layered semi-transparent text (`NotFound.jsx:36-56`). No gradient text except the 404's `bg-clip-text` (`NotFound.jsx:37`).

### Spacing & layout

- `.template` (`index.css:43-64`) is a hand-rolled responsive horizontal padding utility (170px → 100px → 50px → 20px at 1280/1024/768px breakpoints) — implemented as plain CSS media queries, **not** Tailwind's `sm:`/`md:`/`lg:` utility classes, which is an inconsistent pattern next to the rest of the codebase's near-total reliance on Tailwind utilities for responsiveness.
- `SectionLayout.jsx` gives every section (except Hero, which is custom) `py-20` + `flex flex-col items-center justify-center` — no forced minimum height (this was `min-h-screen` until an earlier fix removed it).
- Border radius: `rounded-full` (buttons, pills, circular photo), `rounded-3xl` (cards, mobile menu panel edges conceptually), `rounded-2xl` (SkillCard, 404 divider), `rounded-md`/`rounded-lg` occasionally (modals, inputs' earlier state — now contact inputs are `rounded-full`/`rounded-3xl` too, `ContactForm.jsx:38,51,65`). No single consistent radius scale — 3xl/2xl/full/md/lg all coexist without an obvious rule for which gets which.
- Shadows/glow: see color section above — three different glow idioms (`shadow-white/30`, `shadow-box`, `shadow-primary-500/30`).
- Blur/glass: `backdrop-blur-sm`/`backdrop-blur` used for the Header's scrolled state, mobile menu-adjacent surfaces, Contact form background, quick-fact pills — this is the one visual motif applied consistently throughout.

### Iconography & imagery

- Icons: hand-written inline SVG (`TechIcons.jsx`), ~30 components, consistent `size`/`className` prop API. Plus 2 Heroicons (`@heroicons/react`) in the Header.
- Images: all `.webp` in `public/`, all previously optimized (profile photo 173KB/900×1200, 5 project screenshots 17-31KB each, tech icons ~3-6KB each) — this was a deliberate perf pass earlier in the project's history and it shows; nothing here is oversized.
- Backgrounds: `GridLines.jsx` (static CSS grid-pattern div, radial mask), `StarsBackground.jsx` (procedurally generated star dots + animated meteors), Hero's large radial-gradient "dome" div (`Hero.jsx:96`). No noise texture, no particle library, no canvas/WebGL anywhere.

### Consistency issues (summary — see inline notes above for detail)
1. Three different shadow/glow color idioms for conceptually the same "card glow" effect.
2. Base-layer heading type scale (`index.css:24-41`) is overridden almost everywhere it would apply, making it effectively dead.
3. `.template` padding uses hand-rolled media queries instead of Tailwind breakpoints, inconsistent with the rest of the codebase.
4. `bg-black` (pure black) vs `darkBackground` (`#0c0c0c`) used for visually-similar-but-not-identical dark surfaces.
5. `react-icons` and `react-icons`-adjacent patterns were fully replaced by hand-written SVGs, but the package is still an unused dependency.
6. `useMobile.js` hook and `SkillCircle.jsx` component are both fully built but **unused** — not imported anywhere in `src/`.

---

## 4. Animation inventory

| # | Location | Element | Trigger | Technique | Properties | Duration/easing/stagger | Once or repeat |
|---|---|---|---|---|---|---|---|
| 1 | `Hero.jsx:25-37,85-94` | 8 `FloatingIcon` wrappers | cursor move (desktop+fine pointer+non-reduced-motion only) | `useMotionValue` + `useSpring` (stiffness 60, damping 10, mass 0.5) + `useTransform`, custom `ParallaxLayer` | `x`, `y` translate, per-icon depth 16-40 | spring-driven, no fixed duration | repeats continuously with cursor |
| 2 | `Hero.jsx:103-110` | Profile image wrapper | mount | `initial`/`animate` | `opacity`, `scale` 0.3→1 | 0.8s, cubic-bezier(.22,1,.36,1) | once (gated by `skipIntro`) |
| 3 | `Hero.jsx:113-120` | "Hello, I am" | mount | `initial`/`animate` | `opacity`, `y` 40→0 | 0.7s, delay 0.3, easeOut | once |
| 4 | `Hero.jsx:127-133` → `SplitText.jsx:13-29` | Name, per character | mount | `initial`/`animate`, staggered | `opacity`,`y`,`rotateX`,`blur` | 0.6s/char, stagger 0.06s, delay 0.5, cubic-bezier(.22,1,.36,1) | once (`instant` prop skips entirely) |
| 5 | `Hero.jsx:138` → `ShimmerLine.jsx` | Role text shimmer sweep | mount (fixed timeline, not gated by `skipIntro`) | `initial`/`animate`, 2 nested motion.div | outer `opacity` [0,1,0]; inner `x` -100%→800% | 0.6s/0.8s, both delay 2.4s | once — **but always plays, even on repeat visits**, since `ShimmerLine` has no `instant`/reduced-motion gate of its own |
| 6 | `Hero.jsx:140-144` → `TypeWriter.jsx` | "Frontend Developer" | mount | JS `setInterval`, not Framer Motion | character reveal, blinking cursor opacity | 55ms/char, startDelay 1.6s, cursor blink every 530ms | once (`instant` prop shows full text immediately) |
| 7 | `Hero.jsx:150-170` | Location/availability pill | mount | `initial`/`animate` | `opacity`,`y` 10→0 | 0.6s, delay 2.7s, easeOut | once |
| 7b | `Hero.jsx:162` | status dot inside the pill | mount, continuous | CSS `animate-ping` (Tailwind keyframe) | `transform`/`opacity` | Tailwind default ping timing | infinite (gated: `!prefersReducedMotion`) |
| 8 | `Hero.jsx:173-187` | Description paragraph | mount | `initial`/`animate` | `opacity`, `filter: blur(8px→0)`, `y` 10→0 | 0.9s, delay 3.0s, easeOut | once |
| 9 | `Hero.jsx:191-232` | 2 CTA buttons | mount + hover + tap | `initial`/`animate` (spring) + `whileHover`/`whileTap` | `opacity`,`y`,`scale`,`backgroundColor` | mount: spring stiffness 200, delay 3.6s; hover/tap: 0.2s | mount once; hover/tap repeat per interaction |
| 10 | `Hero.jsx:236-254` | Scroll hint | mount + continuous | `initial`/`animate` + looping `animate` | wrapper `opacity`; inner bar `scaleY` [0,1,0] | wrapper 1s delay 4.2s; bar 1.5s easeInOut | wrapper once; bar infinite |
| 11 | `ProfileRing.jsx:8-15` | Outer ring | mount, continuous | `animate` | `rotate` 0→360 | 18s linear | infinite (gated by `useReducedMotion`) |
| 12 | `ProfileRing.jsx:26-31` | Inner dashed ring | mount, continuous | `animate` | `rotate` 0→-360 | 10s linear | infinite (gated) |
| 13 | `ProfileRing.jsx:33-39` | Logo image | mount, continuous | `animate` | `y` [0,-8,0] | 4s easeInOut | infinite (gated) |
| 14 | `FloatingIcon.jsx:42-66` | Each of 8 icons, outer wrapper | mount | `initial`/`animate` | `top`,`left`,`x`,`y`,`opacity`,`scale` (fly-out from center) | 2s, per-icon `delay` (0.15-0.3s), custom ease | once — **not gated by reduced motion** (one-shot, so lower severity, but still ungated) |
| 15 | `FloatingIcon.jsx:70-89` | Each icon's inner image | mount, continuous | `animate` | `y` [0,-7,0] | per-icon `floatDuration` (2.7-3.5s), easeInOut | infinite (gated by `useReducedMotion`) |
| 16 | `SectionHeader.jsx:10-23` | Wrapper + `h2` title (5 sections reuse this) | scroll into view | `whileInView` | wrapper: `opacity`,`y` -110→0; title: `filter: blur(20px→0)` | 0.8s easeOut, viewport once, margin -160px | once |
| 17 | `About.jsx:26-34` | AboutPhoto outer ring (duplicated from ProfileRing, not reused) | mount, continuous | `animate` | `rotate` 0→360 | 18s linear | infinite — **not gated**, no `useReducedMotion` in this file at all |
| 18 | `About.jsx:36-41` | AboutPhoto inner ring | mount, continuous | `animate` | `rotate` 0→-360 | 12s linear | infinite — **not gated** |
| 19 | `About.jsx:74-119` → `Animation.js` | Quick-fact pills + CTA buttons | scroll into view | `whileInView` with `cardParentVariants`/`itemVariants` | `opacity`,`y` 40→0, staggered | 0.6s easeOut, stagger 0.15s, delayChildren 0.1s, viewport once amount 0.3 | once |
| 20 | `TextScrollWordReveal.jsx:38-49` | Each word in the bio | scroll-linked (not mount) | `useScroll` + `useTransform` driving per-word `opacity` | `opacity` 0.18→1 | tied directly to scroll position, no duration | scrubs with scroll, not "once or repeat" in the usual sense |
| 21 | `TextScrollWordReveal.jsx:94-98` | Progress bar under the bio | scroll-linked | `scaleX` bound directly to `scrollYProgress` | `scaleX` | no spring/smoothing — raw 1:1 with scroll | scrubs with scroll |
| 21b | `TextScrollWordReveal.jsx:61-66,82-86` | Photo parallax | — | computed (`imageY`,`imageScale` via `useTransform`) but **dead code** — the `style` prop that would apply them is commented out | n/a | n/a | **does not currently run** |
| 22 | `Projects.jsx:19-30` → `Animation.js` | Project/HireMeCard grid | scroll into view | `whileInView` with `cardParentVariants` | `opacity` stagger (parent), each card's own `opacity`,`y` 40→0 (`ProjectCard.jsx:4-11`, `HireMeCard.jsx:4-11`) | 0.6s easeOut, stagger 0.15s, viewport once amount 0.1 | once |
| 23 | `ProjectCard.jsx:22-28` | Project image | hover | CSS `group-hover:scale-110` | `transform: scale` | 500ms ease-in-out | repeats per hover |
| 24 | `HireMeCard.jsx:27-33` | 💡 emoji | mount, continuous | `animate` | `rotate` [0,-8,8,0], `y` [0,-6,0] | 3s easeInOut | infinite — **not gated**, no reduced-motion check in this file |
| 25 | `HireMeCard.jsx:49-67` | "Contact Me" button | mount + hover/tap | `initial`/`animate` (spring) + `whileHover`/`whileTap` | `opacity`,`y`,`scale`,`backgroundColor` | mount: spring stiffness 200, **no delay, not gated by `skipIntro`**; hover/tap 0.2s | mount once; interactions repeat |
| 26 | `Skills.jsx:32-36` → `SkillCard.jsx:4-18` | Skill card grid, show-more/less | mount + toggle | `AnimatePresence mode="sync"` + `hidden`/`visible`/`exit` variants | `opacity`,`scale` 0.7→1,`y` 24→0 | 0.5s cubic-bezier(.22,1,.36,1) in; 0.3s easeIn out | once per card appearance |
| 27 | `SkillCard.jsx:39-44` | Skill card | hover | `whileHover` | `scale` 1.08, `backgroundColor`, `borderColor` | 0.2s | repeats per hover |
| 28 | `SkillCard.jsx:73-79` | Bottom accent line | hover (via `isHovered` state, not `whileHover`) | `animate` | `width` 0%→50% | 0.25s | repeats per hover |
| 29 | `Certificates.jsx:42-58` → `CertificateCard.jsx` (`itemVariants`) | Certificate cards | scroll into view | `whileInView` with `cardParentVariants`/`itemVariants` | `opacity`,`y` 40→0, staggered | 0.6s easeOut, stagger 0.15s, viewport once amount 0.1 | once |
| 30 | `CertificateModal.jsx` | Modal open/close | click/Escape/outside-click | **none — instant conditional render**, no `AnimatePresence`, no transition of any kind | — | — | n/a (missing animation — see §4 gaps) |
| 31 | `Footer.jsx:48-53,56-128` | 3 footer columns | scroll into view | `whileInView` with local `containerVariants`/`fadeUp` | `opacity`,`y` 40→0, staggered | 0.6s easeOut, stagger 0.15s, viewport once | once |
| 32 | `Footer.jsx:132-140` | Copyright line | scroll into view | `whileInView` | `opacity` | 0.8s, delay 0.2s | once |
| 33 | `Header.jsx:92-213` | Nav bar swap (initial ↔ scrolled) | scroll (`scrolled` state, threshold 200px) | `AnimatePresence` + `initial`/`animate`/`exit` | `y` -80→0, `opacity` | 0.4s easeOut | toggles each time the threshold is crossed |
| 34 | `Header.jsx:120-130,175-185` | Desktop nav items | hover | `whileHover` | `backgroundColor` | 0.4s easeInOut | repeats per hover |
| 35 | `Header.jsx:216-249` | Mobile fullscreen menu | open/close (`nav` state) | `AnimatePresence` + `menuVariants`/`itemVariants` | `x` 100%→0, staggered children | 0.3s, stagger 0.1s | toggles each open/close |
| 36 | `StarsBackground.jsx:84-111` | 4 meteor streaks | mount, continuous | `initial`/`animate` | `x`→500, `y`→500, `opacity` [1,1,0] | random 3-5s per meteor, random `repeatDelay` up to 10s | infinite, random stagger (gated: skipped entirely under reduced motion) |
| 37 | `StarsBackground.jsx:67-79` | Star dots | — | plain `<div>`, no animation applied | — | `animationDuration` style prop is set but unused — **no `animation` property references it, so this is dead styling** | n/a |
| 38 | `NotFound.jsx:28-124` | Entire 404 content | mount | `initial`/`animate` with `containerVariants`/`itemVariants` | `opacity`,`y`, staggered | stagger 0.15s, delayChildren 0.2s | once |
| 39 | `NotFound.jsx:36-40` | "404" text | mount, continuous | `animate="animate"` with `glitchVariants` | `x` jitter [0,-4,4,-2,2,0] | 0.4s, `repeatDelay` 3s | infinite — **not gated**, no reduced-motion check in this file |
| 40 | `NotFound.jsx:88-114` | 2 buttons | hover/tap | `whileHover`/`whileTap` | `scale`, `backgroundColor`, `color` | 0.2s | repeats per interaction |

### Shared variants/utilities
`src/data/Animation.js` (20 lines) exports exactly two shared variant objects: `cardParentVariants` (opacity-only parent, `staggerChildren: 0.15, delayChildren: 0.1`) and `itemVariants` (`opacity`+`y: 40→0`, 0.6s easeOut). These two are reused across About, Projects, Certificates, and the Header's mobile menu. **Footer and NotFound define their own near-identical local variants** (`fadeUp`/`containerVariants` in `Footer.jsx:19-36`, `containerVariants`/`glitchVariants` in `NotFound.jsx:6-16`) instead of importing the shared ones — functionally fine, but it's 3 separate definitions of the same "fade up, staggered" pattern in the codebase.

### Global motion settings
- **No `MotionConfig` provider anywhere** — confirmed via grep, zero matches for `MotionConfig` in `src/`. Each component that wants reduced-motion behavior calls `useReducedMotion()` itself, individually.
- **`prefers-reduced-motion` is checked in exactly 5 files**: `Hero.jsx`, `ProfileRing.jsx`, `FloatingIcon.jsx` (inner loop only — see row 14 above), `StarsBackground.jsx`, `TextScrollWordReveal.jsx`.
- **It is *not* checked in**: `About.jsx` (rows 17-18 above — the AboutPhoto rings, which are a near-exact duplicate of `ProfileRing`'s own rings, minus the gating), `HireMeCard.jsx` (row 24, the emoji wiggle), `NotFound.jsx` (row 39, the glitch jitter), `ShimmerLine.jsx` (row 5 — also ignores `skipIntro`, so it always plays even on repeat visits).
- Smooth scroll is global via Lenis (`App.jsx:9`), stopped/restarted around the mobile menu open state (`Header.jsx:61-88`).

### Overall motion personality
The dominant pattern is "fade/slide up on scroll-into-view, staggered" (rows 16, 19, 22, 29, 31-32) — a conventional, safe choice used for essentially every section below the Hero. The Hero itself is the outlier: it's the one place with a genuinely orchestrated, multi-stage reveal (rows 2-10) plus the one piece of real spatial interactivity on the site (mouse parallax, row 1). Nothing below the Hero has anything comparable — Projects, Skills, Certificates, Contact, Footer are all "cards fade up, then static." The About section's scroll-scrubbed word reveal (rows 20-21) is the only other technique that breaks from the fade-up pattern.

### What's repetitive
Rows 16, 19, 22, 29, 31 are functionally the same animation (fade+slide-up stagger on scroll) applied to 5 different sections. Rows 11-13 vs 17-18 are a literal duplicate (About re-implements ProfileRing's rings inline instead of reusing the component).

### What's missing
- **Page/route transitions**: not applicable (single page), but there's also no transition when the 404 page mounts versus how Home mounts — they use different, unrelated variant objects.
- **Modal animation**: `CertificateModal` has zero enter/exit motion (row 30) — on a site this animation-forward, an instant-cut modal reads as unfinished.
- **Cursor effects**: the Hero's mouse parallax (row 1) is the only cursor-reactive element on the entire site. No custom cursor, no magnetic buttons, no cursor-following anything anywhere else.
- **Micro-interactions on static controls**: `ScrollUpButton` has no enter/exit animation (`ScrollUpButton.jsx:20` — a bare `if (!visible) return null`, so it pops in/out instantly rather than fading/scaling).
- **Scroll storytelling beyond About**: the scroll-scrubbed reveal technique (rows 20-21) is used exactly once, in one section. It's the most distinctive technique in the codebase and isn't reused anywhere else.
- **Loading/intro sequence**: Hero's reveal (rows 2-10) is the closest thing to an intro sequence, but it's scoped to Hero content only — there's no page-level loading state (no skeleton, no preloader) before React mounts.

### Performance risks
- **Layout-affecting properties**: I did not find any animation targeting `width`/`height`/`top`/`left` as *continuous* loop properties (which would cause layout thrash) — the one exception is `SkillCard.jsx:77` (`width: isHovered ? "50%" : "0%"`), animated via `animate`, which Framer Motion can handle reasonably via transform-adjacent techniques but `width` itself is still a layout property, not a transform; it's a single hover-triggered element though, not a continuous loop, so the real-world cost is low. Everything else uses `transform`/`opacity`/`filter`-safe properties (`x`,`y`,`scale`,`rotate`,`opacity`).
- **`filter: blur()` animations** (rows 8, 16) are GPU-accelerated in modern browsers but blur is one of the more expensive filter operations — fine at the scale used here (one-shot, not continuous).
- **No lazy loading / code splitting** beyond `CertificateModal` (`Certificates.jsx:12`, `React.lazy`). Every other component — including `SkillCircle.jsx`, which isn't even used — ships in the single main JS bundle.
- **8 simultaneous `useSpring` instances** in Hero (one per `ParallaxLayer`, each independently computing from the same two shared `smoothX`/`smoothY` motion values) — not a real risk at this scale (8 springs, desktop-only, gated off on touch/reduced-motion devices), but worth knowing if more parallax layers get added later.
- **`StarsBackground`'s star count** scales with `viewport area / 10000` (`StarsBackground.jsx:10-11`) and regenerates the full star+meteor array on every `resize` event (`StarsBackground.jsx:51-54`) — on a large 4K monitor this is a few hundred `<div>`s; not catastrophic, but it's an uncapped linear scale with screen size and regenerates (not just repositions) on every resize, including the resize events that fire during browser devtools/responsive-mode dragging.

---

## 5. Accessibility & performance snapshot

**`prefers-reduced-motion`**: handled, but inconsistently — see the full breakdown in §4 ("Global motion settings"). 5 files check it, 4 known animation sites (`About.jsx` rings, `HireMeCard.jsx` emoji, `NotFound.jsx` glitch, `ShimmerLine.jsx`) don't.

**Focus states**: `focus-visible:ring-2 focus-visible:ring-secondary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-darkBackground` is applied consistently across every custom button component I read (`GreenButton.jsx:5`, `Hero.jsx:193,214`, `About.jsx:108`, `HireMeCard.jsx:51`, `ScrollUpButton.jsx:27`, `NotFound.jsx:90,104`). Header's desktop nav buttons rely on the browser default ring (no `outline-none` set there to need overriding). Contact form inputs use `focus:ring-1 focus:border-primary-400` (`ContactForm.jsx:38,51,65`) — a weaker but present signal.

**Semantic HTML**: one real `<h1>` on the page (Hero's name/role, wrapped `className="contents"` so it doesn't affect layout, `Hero.jsx:124`), `<h2>` for section titles (`SectionHeader.jsx:17`), `<h3>`/`<h4>`/`<h5>` for card-level and smaller headings. `CertificateModal` correctly uses `role="dialog"` + `aria-modal="true"` (`CertificateModal.jsx:45-46`). Nav buttons have `aria-label`s throughout.

**Alt text**: present and specific everywhere I checked — `ProjectCard.jsx:24` (`alt={project.title}`), `CertificateCard.jsx:16` (`Preview of ${certificate.name}`), `CertificateModal.jsx:54` (`Full view of ...`), `About.jsx:46` (`"Haytham Saba"`). Decorative images are correctly marked `alt="" aria-hidden="true"` (`FloatingIcon.jsx:72-73`).

**Color contrast** (main text/accent pairs, computed from the token hex values, not measured in-browser):
- `background` text (`#f0e7db`) on `darkBackground` (`#0c0c0c`): very high contrast, no concern.
- `primary-400` (`#82e0aa`) / `secondary-400` (`#f7dc6f`) accent text on `darkBackground`: both light, high-contrast against near-black — fine.
- `slate-300`/`slate-400` body/caption text on `darkBackground`: should pass WCAG AA for normal text, but I did not compute exact ratios — UNCLEAR, worth a real contrast-checker pass if this matters to you.
- `textColor` (`#0d1117`) on `primary-400`/`secondary-400` button backgrounds: both near-black-on-bright-accent, very high contrast, fine.

**Bundle size**: single main chunk, last known build output (from earlier work in this project's history, not re-verified in this read-only pass) was roughly 396KB JS / 130KB gzip, plus a separate ~1.4KB `CertificateModal` chunk. UNCLEAR whether this has changed since — a fresh `npm run build` would confirm; I did not run it in this read-only audit.

**Image optimization**: all images are `.webp`, all appropriately sized for their render size (see §3 imagery note) — this is in good shape.

**Fonts**: Gilroy self-hosted as 2 `woff2` files with `font-display: swap` on the first (`index.css:10`) but **not** on the second (`index.css:13-17` has no `font-display` at all) — minor inconsistency, the bold weight could technically block text render differently than the regular weight during load. Cormorant loads via the standard "non-blocking `<link media="print" onload>`" trick (`index.html:14-18`) with a `<noscript>` fallback — a solid, deliberate pattern, not a default.

**Lighthouse concerns I can infer without running it**: no obvious render-blocking resources beyond normal font loading; no massive unoptimized images; single-bundle JS with no route-based splitting (not a real issue for a single-page site); the Hero's mount-time animation cascade (8+ sequential motion elements) could show up as a minor "long main-thread task" signal on low-end devices, though everything targets GPU-safe properties.

---

## 6. Brand & personality read

The site reads as a capable, detail-oriented frontend developer who clearly enjoys motion work and has put real craft into the parts a casual visitor is most likely to engage with first — the Hero and the About bio. The choreographed intro, the Cormorant accent font breaking up an otherwise all-sans-serif page, and the mouse-reactive floating icons all signal "I care about the small stuff," which is exactly the right signal for a frontend/product-engineering audience. The accessibility groundwork (focus rings, a real focus-trapped modal, reduced-motion handling in the highest-traffic areas) is more thorough than the median portfolio, and it's the kind of thing that specifically reads well to a hiring *engineer* rather than just a recruiter, since it's invisible unless someone goes looking for it.

Where the story gets inconsistent is everything after About. The site spends its most distinctive technique (scroll-scrubbed reveal) once and never again, then settles into the single most common portfolio pattern there is — a card grid with a fade-up-on-scroll-into-view, repeated four more times (Projects, Skills, Certificates, Footer) with only cosmetic variation between them. A reviewer who scrolls past Hero/About is left with the impression of "a developer who front-loaded their best ideas into the first screen," rather than "a developer whose whole site feels considered." Combined with a few visible rough edges that a careful code reviewer would notice on inspection (the duplicated, un-gated ring animation in About, the dead `clamp()` bug, the commented-out parallax, the `featured` field that goes nowhere) the overall impression sits closer to "promising work-in-progress with real flashes of craft" than "a finished, cohesive experience" — which, for someone explicitly aiming at product engineering roles, is the gap that matters most: product thinking is as much about finishing and connecting the pieces as it is about any single piece being impressive on its own.

---

## 7. Creative opportunity map (ideas only, no code)

### Per-section ideas

**Hero** — already the strongest section; smallest, highest-leverage gaps:
1. *Compress the first-visit intro timeline* (buttons land ~2s instead of 3.6s). Impact 4, Effort S, Risk low, no new library.
2. *Extend the mouse parallax to the profile ring or gradient dome*, not just the floating icons, so the whole hero feels reactive instead of one isolated element. Impact 3, Effort S, Risk low, no new library.
3. *Gate `ShimmerLine` on `skipIntro`* so repeat visits don't replay it. Impact 2, Effort S, Risk low, no new library.

**About**:
1. *Fix the dead photo parallax* (uncomment and tune `imageY`/`imageScale`, or remove the dead code) — either restores an intended effect or cleans up confusion for your future self. Impact 3, Effort S, Risk low, no new library.
2. *Reuse `ProfileRing` instead of duplicating its rings inline* in `AboutPhoto`, picking up the reduced-motion gating for free and removing the duplication. Impact 3, Effort S, Risk low, no new library.
3. *Extend the scroll-scrub technique* (the thing that makes About distinctive) into a second instance elsewhere — e.g. the Hero description, or a Projects section intro line — so it reads as a signature technique rather than a one-off. Impact 4, Effort M, Risk low, no new library.

**Projects** — the section with the most room to grow (see §6):
1. *Activate the already-present `featured` field* with a visually distinct treatment for 1-3 lead projects (bigger card, different grid span) before anything fancier. Impact 5, Effort M, Risk low, no new library.
2. *Case-study depth on hover/click* — expand a card (or route to a detail view) showing problem/role/outcome instead of just a tag list. Impact 5, Effort M-L, Risk low, no new library (Framer Motion `layout` animations handle card-expansion well).
3. *Cursor-tracked spotlight or magnetic hover on cards* — the one genuinely "award-portfolio" interaction pattern the site is missing outside the Hero. Impact 4, Effort S-M, Risk low, no new library.

**Skills**:
1. *Replace the static show-more toggle with a draggable/scrollable marquee* for the full 14-icon set. Impact 2, Effort M, Risk med (continuous animation + reduced-motion handling needed), no new library.
2. *Wire up the already-built but unused `SkillCircle` component* (proficiency-ring visualization) as an alternate or secondary view. Impact 3, Effort S (it already exists), Risk low, no new library.

**Certificates**:
1. *Animate the modal* (fade+scale in/out via `AnimatePresence`) — the single cheapest fix on this entire list relative to how visible the gap is. Impact 3, Effort S, Risk low, no new library.
2. *Add a subtle shared-element transition* from thumbnail to modal (Framer Motion `layoutId`) so the image appears to "grow" into the modal instead of popping. Impact 3, Effort M, Risk low, no new library.

**Contact**:
1. *A small success-state animation* beyond the current instant text-swap on form submit (`ContactForm.jsx:7-16`) — a checkmark draw-in or confetti-adjacent micro-moment. Impact 3, Effort S, Risk low, no new library.
2. *Field-level focus micro-interactions* (label float, icon color shift) to match the polish level of the rest of the site. Impact 2, Effort S, Risk low, no new library.

**Footer**:
1. Low priority — this section doesn't need more motion. If anything, trim the redundancy with Contact's social pill rather than add animation here.

### Bold "signature" concepts
1. **A real scroll-driven narrative for Projects**, built on the same scroll-scrubbed technique already proven in About — each project pins briefly as you scroll past it, with its case-study content revealing progressively instead of a static grid. This would directly fix the "front-loaded, flat after Hero" impression from §6, and it reuses a technique you've already built and debugged once. Impact 5, Effort L, Risk med (scroll-jacking needs careful mobile/reduced-motion fallbacks — About's implementation is a good reference for how to do this safely).
2. **A cursor-reactive layer that persists across the whole site**, not just the Hero — e.g. a custom cursor that morphs near interactive elements, or extending the Hero's parallax depth concept to a couple of other sections. This turns the site's one standout interaction into a throughline instead of an isolated moment. Impact 4, Effort M, Risk low-med, no new library required (Framer Motion handles this).
3. **An actual intro/loading sequence before Hero's content starts its reveal** — even something as simple as the name assembling from scattered letters, or the grid-lines "drawing in," before the existing Hero sequence picks up. Gives the site a genuine first-frame moment rather than starting mid-reveal. Impact 3, Effort M, Risk low, no new library (reuses `SplitText` patterns already in the codebase).

---

## 8. Constraints & guardrails for the next phase

**Must not break:**
- SEO/meta: `index.html` has canonical URL, OG tags, and a meta description already correctly deduplicated (confirmed single occurrence of each, `index.html:22-34`) — don't reintroduce duplicates.
- Deploy setup: Vercel (`@vercel/analytics` is wired in, `App.jsx:16`; the live URL in `index.html`'s canonical/OG tags is `https://haytham-saba.vercel.app/`). No `vercel.json` found — UNCLEAR what build/output settings Vercel is using beyond its Vite auto-detection defaults.
- Responsiveness: `.template`'s hand-rolled breakpoints (1280/1024/768px) don't line up with Tailwind's own `lg`(1024)/`md`(768) breakpoints used everywhere else for grid columns — any section redesign needs to account for both systems being active simultaneously, or it'll be easy to end up with mismatched transition points.
- Content: all project/certificate/skill data lives in one file (`StaticData.js`) — any new section design should keep reading from there rather than hardcoding content into a component, to preserve the single-source-of-truth you already have.
- The focus-trap/accessibility work in `CertificateModal.jsx` and the `focus-visible` ring pattern used everywhere else — these are easy to accidentally regress if a component gets rewritten from scratch instead of extended.

**Recommended order of work:**
1. **Cheap fixes first** (no design decisions needed): the dead `clamp()` bug (`TextScrollWordReveal.jsx:201`), the commented-out photo parallax, gating the 4 un-gated animations under reduced-motion, reusing `ProfileRing` in `About.jsx` instead of duplicating it, animating `CertificateModal`'s open/close. None of these require picking a creative direction first, and several (the duplicate rings, the dead code) make the codebase easier to extend once cleaned up.
2. **Centralize before you multiply.** `Animation.js` currently exports 2 variants but Footer and NotFound each define their own near-duplicates locally. Before adding more sections' worth of new animation, worth deciding whether to consolidate these into the shared file (so a future "make all card-grids consistent" pass is a one-file change) or deliberately keep them separate.
3. **Decide what `featured` means** before touching Projects' layout — the data already supports a featured/non-featured split; building the UI for it is the highest-impact, lowest-ambiguity change on the whole creative opportunity map.
4. **Projects, then Certificates, then Contact/Footer**, in that order, matches both the impact ratings above and the natural reading order of the page — fixing Projects first means the site's weakest section (relative to its traffic/attention) gets addressed before polishing sections that are already working fine.
5. Save the "bold signature concept" (scroll-driven Projects narrative) for last — it depends on Projects already having real case-study content and a settled `featured` treatment; building the scroll-choreography before the content exists would mean redoing it once the content lands.

---

## Key facts summary (paste into a future session)

- React 18.2 + Vite 7.3 + Tailwind 3.3 (config-file, not v4) + Framer Motion 12.23 + Lenis smooth scroll. Plain JS/JSX, zero TypeScript, no ESLint config, no tests.
- Single-page site (`src/pages/Home.jsx`); `react-router-dom` exists only to serve a 404 for any non-root path.
- All content is hardcoded in `src/data/StaticData.js` (projects, certificates, skills, hero tech-icon positions) — no CMS.
- Page order: Hero → About → Projects → Skills ("Tech Stack") → Certificates → Contact → Footer, each `id`-anchored and navigated via `lenis.scrollTo`, not real routing.
- Custom color tokens in `tailwind.config.js`: `primary`/`secondary` (green/yellow scales), `background` (#f0e7db), `darkBackground` (#0c0c0c), `textColor` (#0d1117). Dark-only, no theme toggle. Tailwind's default `slate-*` grays are used extensively alongside the custom tokens for secondary text.
- Fonts: Gilroy (self-hosted, only weights 400/700 kept) as body default; Cormorant (Google Fonts, italic 500/600 only) as a deliberate accent used in exactly 2 places.
- Hero is the most animated/distinctive section (layered intro reveal + mouse parallax); everything from Projects onward is a conventional "cards fade up on scroll" pattern with no real differentiation between sections.
- `projects` data already has a `featured: true/false` field that **no component currently reads** — Projects.jsx renders a flat, uniform grid.
- Known live bugs found in this pass: (1) `TextScrollWordReveal.jsx:201` has an invalid CSS `clamp()` (max < min); (2) that same component's photo scroll-parallax is dead/commented-out code; (3) `About.jsx`'s profile-photo rings duplicate `ProfileRing.jsx` inline without its reduced-motion gating; (4) `HireMeCard`'s emoji wiggle and `NotFound`'s glitch jitter also lack reduced-motion gating; (5) `ShimmerLine` ignores both the `skipIntro`/session gate and reduced motion, so it always replays.
- `useMobile.js` hook and `SkillCircle.jsx` component are fully built but unused anywhere in the codebase. `react-icons` is an installed but unused dependency (all icons are hand-written SVGs in `TechIcons.jsx`).
- `CertificateModal` has real accessibility work (focus trap, `role="dialog"`, focus restoration) but zero open/close animation — the single most visible "missing micro-interaction" on the site.
- No screenshots were captured for this audit — no Playwright/webapp-testing tool was available in this session.

## UNCLEAR items needing your input
1. Whether `react-icons` is safe to remove as a dependency, or whether something outside `src/` (a build script, a future branch) still expects it.
2. Exact current Lighthouse/bundle numbers — I referenced an earlier session's build output rather than re-running `npm run build` in this read-only audit; worth a fresh check if it matters for a specific decision.
3. What Vercel build/output settings are actually configured (no `vercel.json` in the repo — likely just Vite auto-detection, but not confirmed).
4. Color contrast ratios for `slate-300`/`slate-400` text on the dark background — I reasoned through this rather than measuring it with a contrast tool.
5. Whether the `TextScrollWordReveal.jsx:201` clamp bug and the commented-out photo parallax are known/intentional (e.g. mid-edit) or genuinely unnoticed — I left both untouched per this audit's read-only scope, but they're both live on the deployed site right now.
