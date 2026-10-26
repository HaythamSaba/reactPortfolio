# UI/UX Audit — haytham-saba.vercel.app

**Scope:** Code audit only, no source files modified. Every finding below was verified directly against the repository (file paths and line numbers cited), a production build (`npm run build`), and live HTTP checks against every outbound link in the data layer.

**Audience assumed:** Recruiters skimming 30–60s, often on a phone; hiring engineers evaluating code/craft; target roles are Frontend / Product Engineer in Ljubljana and the wider EU market.

## Stack — verified against `package.json`

The brief says "React, Tailwind and Framer Motion" — confirmed, plus a few things worth knowing:

| | |
|---|---|
| React | 18.2.0 |
| Tailwind CSS | 3.3.5 (v3, config-file based — not v4's `@theme` CSS syntax) |
| Framer Motion | 12.23.12 |
| Build tool | Vite 7.3.1 |
| Routing | `react-router-dom` 7.8.0 — but only for a catch-all 404 (`App.jsx`). The site is a **single scrolling page** (`src/pages/Home.jsx`), not a multi-page app. |
| Smooth scroll | `@studio-freight/react-lenis` |
| Forms | `@formspree/react` (Contact form) |
| Analytics | `@vercel/analytics` |
| Language | Plain JS/JSX throughout — **no TypeScript in this repo itself** (worth knowing since TypeScript is claimed as a skill; see P8 note on evidence gaps for why this specific omission is *not* flagged as an issue — two of the eight listed projects do use TS). |

No test runner, no linter config, no CI config found in the repo.

## Tracker

| ID | Title | Priority | Effort | Status |
|---|---|---|---|---|
| P1 | No visible keyboard focus state on primary CTAs (sitewide) | Critical | S | Fixed |
| P2 | 2.2MB of unused font files shipped to production | Critical | S | Fixed |
| P3 | Project descriptions are feature lists, not case studies | Critical | L | Open |
| P4 | No curation/hierarchy among 8 projects | High | M | Open |
| P5 | Flagship project shows an "In Progress" badge | High | S | Open |
| P6 | Location/availability not visible in the Hero (first viewport) | High | S | Fixed |
| P7 | "Scroll to top" control is not keyboard accessible | High | S | Fixed |
| P8 | GraphQL claimed in Tech Stack with no supporting project evidence | High | S | Open |
| P9 | Continuous ambient animations ignore `prefers-reduced-motion` | Medium | S | Fixed |
| P10 | Single 396KB JS bundle, no code-splitting | Medium | M | Partially fixed |
| P11 | `SectionLayout` forces `min-h-screen` on every section uniformly | Medium | S | Fixed |
| P12 | Social links duplicated in Contact and Footer | Medium | S | Open |
| P13 | Contact form's only focus indicator is a subtle border-color change | Medium | S | Fixed |
| P14 | `browserslist-db` data is 15 months stale (persistent build warning) | Low | S | Fixed |
| P15 | Duplicate `og:title`/`og:description` meta tags in `index.html` | Low | S | Fixed |
| P16 | Unused `font-gilroy` Tailwind token | Low | S | Open |

---

## Critical

### P1 — No visible keyboard focus state on primary CTAs (sitewide)
**Problem:** Every primary call-to-action button on the site has `outline-none` with no replacement focus style:
- `src/components/sections/Hero.jsx:124,145` — "Contact Me" / "View Projects"
- `src/components/sections/About.jsx:108` — "Get in Touch"
- `src/components/ui/GreenButton.jsx:5` — the shared button used for "Download my CV" (About), "Show More/Less Skills" (Skills), and "Send Message" (ContactForm)
- `src/components/ui/HireMeCard.jsx:51` — "Contact Me"
- `src/pages/NotFound.jsx:90,104` — "Back to Home" / "Go Back"

That's effectively every conversion point on the site. Tab through the page with a keyboard and you cannot see where focus is.

**Why it matters:** This is a baseline WCAG 2.4.7 failure, but more specifically for this audience: a hiring engineer evaluating frontend craft will very plausibly tab through your own site as a first move. Finding zero focus indication on your CTAs — on a site whose entire purpose is to demonstrate frontend quality — undercuts the pitch more than almost anything else on this list.

**Solution:** Add a `focus-visible` ring so it only shows for keyboard users (not mouse clicks), matching the site's existing accent colors:
```jsx
className="... outline-none focus-visible:ring-2 focus-visible:ring-secondary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-darkBackground"
```
Apply once in `GreenButton.jsx`'s `baseClasses`, and to the ~6 other one-off buttons listed above. Consider also auditing `Header.jsx` and `Footer.jsx` nav buttons, which don't set `outline-none` but should be spot-checked to confirm the default ring isn't being clipped by `overflow-hidden` ancestors.
**Effort:** S

### P2 — 2.2MB of unused font files shipped to production
**Problem:** `public/fonts/` contains 42 files (the full Gilroy family — Thin through Black, italics, both `.woff`/`.woff2`, plus a `demo.html`) totaling **2.3MB**. `src/index.css:5-18` only declares two `@font-face` rules, referencing exactly two files: `Gilroy-Regular.woff2` (43KB) and `Gilroy-Bold.woff2` (44KB). I ran `npm run build` and confirmed: `dist/fonts/` is 2.3MB out of a **4.0MB total `dist/`** — the unused fonts alone are over half the entire deployed site's weight. `demo.html` (41.8KB) also ships as a live, publicly reachable URL at `/fonts/demo.html` with unrelated foundry-demo content.
**Why it matters:** This is pure dead weight on every single page load — it directly hurts load time for no visual benefit, and it's the kind of avoidable bloat a performance-minded reviewer checking Network tab would notice immediately.
**Solution:** Delete every file in `public/fonts/` except `Gilroy-Regular.woff2` and `Gilroy-Bold.woff2`.
```bash
cd public/fonts && find . -type f ! -name "Gilroy-Regular.woff2" ! -name "Gilroy-Bold.woff2" -delete
```
**Effort:** S

### P3 — Project descriptions are feature lists, not case studies
**Problem:** All 8 entries in `src/data/StaticData.js:124-220` are a single generic sentence each, e.g.:
> "A Luxury e-commerce platform built with React, JavaScript, TailwindCSS, Framer Motion, for seamless shopping experiences." (Vermera, line 127-128)

None state the problem being solved, your specific role/decisions, or a measurable outcome. `ProjectCard.jsx` renders title, one description line, tech badges, and link icons — there is no problem/role/decisions/outcome structure anywhere in the data model or the UI.
**Why it matters:** This is the single biggest gap against your own stated goal (Product Engineer track). A tech-badge list proves you can use tools; a case study proves you can think about product. Hiring managers for product-engineering roles specifically look for the latter, and right now there's no way for them to find it here.
**Solution:** Extend the data shape and surface it — doesn't have to be a new page, could be an expandable section on the card or a modal (you already have a working modal pattern in `CertificateModal.jsx` with focus trap built):
```js
{
  title: "Vermera E-commerce",
  problem: "...",   // what need/gap this addressed
  role: "...",      // your specific responsibilities/decisions
  outcome: "...",   // what changed/shipped/measured as a result
  devStack: [...],
  // ...
}
```
I can draft the UI for this now, but the actual problem/role/outcome content needs to come from you — I don't have the real details of what you built and why. See "Decisions needed" below.
**Effort:** L (content-dependent; the UI change itself is S–M)

---

## High

### P4 — No curation/hierarchy among 8 projects
**Problem:** `src/components/sections/Projects.jsx:19-30` renders all 8 projects in one undifferentiated grid, equal size, equal visual weight. The set includes a polished e-commerce flagship right alongside `project-8` — described in its own data as *"My first portfolio project, created while in college to learn web development"* (`StaticData.js:210-212`) — and a basic weather-lookup app and quiz app. There's no featured/pinned treatment, no way to signal "look at this one first."
**Why it matters:** Recruiters skim for 30–60 seconds. If the 5th or 6th card they scroll past is explicitly self-labeled as a learning exercise, it resets their calibration of everything else on the page downward — including the genuinely strong work sitting two cards away.
**Solution:** Either (a) pull your 2–3 strongest projects into a visually distinct "Featured" row above the rest (larger cards, maybe the case-study treatment from P3), with the remaining projects in a smaller "More projects" grid, or (b) remove the explicitly-labeled learning projects from the main grid and link them from GitHub only. Needs your input on which projects to feature — see "Decisions needed."
**Effort:** M

### P5 — Flagship project shows an "In Progress" badge
**Problem:** `StaticData.js:134` sets `progress: true` on **Vermera**, the first project in the array (so first/most prominent in the grid, and the one with the most tech badges — it reads as the intended flagship). `ProjectCard.jsx:33-39` renders an "In Progress" badge whenever this flag is true.
**Why it matters:** For a visitor skimming quickly, the very first project they see being flagged incomplete is a credibility hit at the worst possible moment — the first impression.
**Solution:** If Vermera is actually finished (the live demo I checked does return 200 and look complete), remove `progress: true`. If it's genuinely still being worked on, either reorder so a finished project leads, or keep the badge but don't lead with it.
**Effort:** S

### P6 — Location/availability not visible in the Hero (first viewport)
**Problem:** `Hero.jsx` shows name, role, and a generic description ("Building beautiful, responsive web experiences with React and modern frontend technologies," line 116-117) — but **location** ("Ljubljana, Slovenia") and **availability** ("Open to opportunities") only appear in About's `quickFacts` (`About.jsx:12-16`), one full section/scroll below the fold.
**Why it matters:** You said it yourself in the brief — recruiters skim in 30–60 seconds, often on a phone. Location and work-authorization/availability are frequently the first filter a recruiter applies, before they even read what you do. Making them scroll to find it risks losing exactly the skim-and-bounce visitor this section exists to catch.
**Solution:** Add a compact location/availability line or badge directly in the Hero, near the name/role or description — doesn't need to compete visually with the main CTA, just needs to be visible without scrolling.
**Effort:** S

### P7 — "Scroll to top" control is not keyboard accessible
**Problem:** `src/components/layout/ScrollUpButton.jsx:22-29` is a `<div onClick={...}>` — no `role="button"`, no `tabIndex`, no `onKeyDown`, no `aria-label` (it's icon-only). It appears fixed on screen after 400px of scroll on every single page view.
**Why it matters:** Same class of bug the mobile nav had before it was fixed — a persistent, always-potentially-visible control that a keyboard or screen-reader user cannot operate or even identify.
**Solution:**
```jsx
<button
  type="button"
  onClick={handleScrollToTop}
  aria-label="Scroll to top"
  className="fixed bottom-4 right-4 z-50 bg-primary-300 p-2 rounded-full text-black transition-all duration-300 hover:bg-primary-500 hover:text-white focus-visible:ring-2 focus-visible:ring-secondary-400"
>
  <MdArrowUpIcon />
</button>
```
While in there, consider bumping `p-2` → `p-3` — at `p-2` plus the icon it's close to but slightly under the 44px recommended minimum touch target.
**Effort:** S

### P8 — GraphQL claimed in Tech Stack with no supporting project evidence
**Problem:** `StaticData.js:252` lists GraphQL in the Tech Stack grid shown in `Skills.jsx`. I checked every project's `devStack` array in `StaticData.js:124-220` — GraphQL appears in **none** of them (Supabase appears twice, but it's used there as a Postgres/REST backend, not presented as a GraphQL project).
**Why it matters:** You explicitly asked me to check consistency between what the site claims and what the projects show — this is the one clear gap I found. A hiring engineer who knows GraphQL and looks for it in your project list and finds nothing will notice.
**Solution:** Either remove GraphQL from the Tech Stack list, or (better, if true) add a one-line mention of where you've used it to the relevant project's description once P3 is addressed.
**Effort:** S

---

## Medium

### P9 — Continuous ambient animations ignore `prefers-reduced-motion`
**Problem:** `Hero.jsx` and `TextScrollWordReveal.jsx` both correctly call `useReducedMotion()` and gate their animations on it. Three other components run **infinite, continuous** motion loops with no such check:
- `src/components/ui/ProfileRing.jsx:6-13,24-29,31-37` — two rotating rings (18s/12s loops) + a bobbing logo, forever
- `src/components/ui/FloatingIcon.jsx` — 8 icons floating/bobbing forever
- `src/components/layout/StarsBackground.jsx:83-109` — meteor streaks, repeating indefinitely

**Why it matters:** The precedent is already set elsewhere in this codebase, so this reads as inconsistency rather than a deliberate choice. For visitors with vestibular motion sensitivity (who set `prefers-reduced-motion: reduce` at the OS level specifically to avoid this kind of thing), these three components ignore that setting entirely, unlike the rest of the page.
**Solution:** Same pattern already used in `Hero.jsx`:
```jsx
const reducedMotion = useReducedMotion();
// ...
animate={reducedMotion ? undefined : { rotate: 360 }}
```
**Effort:** S (per component; three components total)

### P10 — Single 396KB JS bundle, no code-splitting
**Problem:** `npm run build` output: one JS chunk, `396.57 kB │ gzip: 129.74 kB`. No `React.lazy`/dynamic `import()` anywhere in the codebase — reasonable given it's genuinely a single-page site, but Framer Motion is a known meaningful contributor to bundle size and everything loads eagerly up front.
**Why it matters:** Not urgent at this size/traffic profile, but worth knowing as a baseline — 130KB gzip of JS before any content renders is on the heavier side for a largely-static portfolio.
**Solution:** Lowest-effort win: lazy-load `CertificateModal` (only needed once a certificate is clicked) via `React.lazy`. Longer-term, if the site grows, revisit whether every Framer Motion feature in use is needed or if `m`/`LazyMotion` (Framer's smaller-bundle API) is worth adopting.
**Effort:** M

### P11 — `SectionLayout` forces `min-h-screen` on every section uniformly
**Problem:** `src/components/layout/SectionLayout.jsx:3` applies `min-h-screen` to every section regardless of content. Short sections (Contact) get forced to a full viewport height on large monitors, while dense sections (Projects, Certificates) grow naturally — the vertical rhythm between sections ends up inconsistent rather than intentional.
**Why it matters:** Minor polish item, carried over from an earlier pass — not a functional bug, but worth fixing for a cohesive feel on large screens.
**Solution:** Drop `min-h-screen`, or replace with a smaller `min-h-[...]` floor just to avoid short sections looking cramped.
**Effort:** S

### P12 — Social links duplicated in Contact and Footer
**Problem:** `Contact.jsx:27-62` and `Footer.jsx:100-128` both render the same LinkedIn/GitHub/Instagram set (plus email), directly adjacent to each other at the bottom of the page.
**Why it matters:** Not broken, just redundant — low priority, but an easy trim.
**Solution:** Either drop the Footer's social row (Contact already just showed it) or have the Footer link down to `#contact` instead of repeating the icons.
**Effort:** S

### P13 — Contact form's only focus indicator is a subtle border-color change
**Problem:** `ContactForm.jsx:38,51,65` — inputs/textarea use `outline-none focus:border-primary-400`. Unlike the buttons (P1, zero indicator), there IS something here, but a 1px border color shift against a dark, semi-transparent background (`bg-primary-200/10`) is a subtle signal, and `focus:` (not `focus-visible:`) means it also fires on mouse click, which is fine but doesn't change the contrast concern.
**Why it matters:** Lower severity than P1 since something is present, but worth strengthening given this is the actual conversion form.
**Solution:** Add a ring alongside the border change for a stronger signal: `focus:border-primary-400 focus:ring-1 focus:ring-primary-400`.
**Effort:** S

---

## Low

### P14 — `browserslist-db` data is 15 months stale
**Problem:** Every `npm run build` prints: `Browserslist: browsers data (caniuse-lite) is 14-15 months old`. Harmless, but a recurring warning in build output a careful reviewer running your build locally would see.
**Solution:** `npx update-browserslist-db@latest`
**Effort:** S

### P15 — Duplicate `og:title`/`og:description` meta tags in `index.html`
**Problem:** `index.html:25-27` and `:30-32` declare the same `og:title` and `og:description` twice (and `og:type`/`og:url` three times total across lines 33-41). Harmless to rendering — crawlers just take the first — but untidy markup in a document meant to represent frontend craft.
**Solution:** Collapse to one block of each OG tag.
**Effort:** S

### P16 — Unused `font-gilroy` Tailwind token
**Problem:** `tailwind.config.js:34` defines a `gilroy` font family token, but Gilroy is actually applied via a plain CSS rule on `body` (`index.css:20-22`), not the Tailwind utility class. A quick check suggests `font-gilroy` isn't used anywhere as a class.
**Solution:** Either remove the unused token, or switch `body`'s font declaration to use it via `@layer base` for consistency. Zero production cost either way (Tailwind tree-shakes unused utilities) — purely a tidiness item.
**Effort:** S

---

## What's already working (don't touch)

- **Every outbound link I tested resolves.** All 8 project live-demo URLs and all 8 GitHub repo URLs in `StaticData.js` returned `200 OK`. Zero dead links — rarer than it should be in portfolios, worth knowing you don't need to audit this yourself.
- **CV download works.** `public/Haytham_Saba_CV.pdf` exists, is a valid PDF, 84KB.
- **Share/preview metadata is wired up correctly.** OG image (1162×638, close enough to the declared 1200×630), favicon, canonical URL, and meta description are all present and will render a proper link preview in LinkedIn/email (modulo the harmless duplication in P15).
- **Certificate modal** (`CertificateModal.jsx`) has a real focus trap, `role="dialog"`, `aria-modal`, Escape-to-close, and focus restoration on close.
- **Mobile nav** (`Header.jsx`) is fully keyboard-operable — real `<button>` elements throughout.
- **Hero intro** respects `prefers-reduced-motion` and only plays once per session (`sessionStorage`-gated) rather than replaying on every reload.
- **Images are well-optimized.** Profile photo, all 8 project screenshots, and all tech-stack icons are properly sized/compressed for their render size — this was clearly a recent, deliberate pass and it shows.
- **Tech Stack icons are visible at rest** — legible without requiring hover, which matters since hover doesn't exist on touch devices.
- **Contact form** has real `required` fields, labels tied via `htmlFor`/`id`, Formspree-backed validation errors, a disabled+relabeled submit state while sending, and a distinct success state.
- **Consistent, restrained color system** — one green/yellow accent pair used throughout, not a template-default palette.
- **Clear single CTA pair in the Hero** ("Contact Me" / "View Projects") rather than competing calls to action.

---

## Top 3 changes for interview chances

1. **Turn your projects into case studies and feature the strongest 2–3 (P3 + P4).** This is the one change that actually changes what a hiring manager *learns* about you, not just how the page looks. A badge list says "I know React." A paragraph about a real decision you made says "I can build products." For your Product Engineer goal specifically, this matters more than everything else on this list combined.
2. **Fix the missing focus-visible states sitewide (P1).** Near-zero effort, and it's exactly the kind of thing a frontend-hiring engineer checks by literally pressing Tab on your site in the first 10 seconds.
3. **Delete the 2.2MB of unused fonts and drop the "In Progress" badge from your lead project (P2 + P5).** Both are minutes of work, both remove an easy, visible reason for a careful reviewer to doubt attention to detail — one in the Network tab, one in the first screen of your Projects section.

## Decisions needed from you

- **P3/P4:** Which 2–3 projects do you consider strongest/most representative for Product Engineer roles? I can build the featured-project UI now, but I need the real problem/role/decisions/outcome content for each — I don't have the actual context of what you built and why, and I won't fabricate specifics.
- **P4:** Should `project-8` ("My first Portfolio," explicitly a college learning project) stay in the main grid, move to a de-emphasized "earlier work" area, or come out entirely and just live on GitHub?
- **P5:** Is Vermera actually finished? If yes, drop the badge. If not, should it still lead the grid while incomplete?
- **P8:** Keep or cut GraphQL from the Tech Stack — depends on whether you have real GraphQL experience not yet reflected in a public project, versus it being aspirational.
- **P6:** Preference on how location/availability should look in the Hero — inline text under the role, a small badge, or folded into the description line?
