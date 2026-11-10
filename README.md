# Shantanu Diwedi — Personal Portfolio

A scroll-driven, editorial portfolio built for **Shantanu Diwedi**, restyled strictly in the **Rishi Thakor design system** (Onest typography, warm beige palette `#E8E4E0`, charcoal typography `#1A1818`, and rust accents `#A4552C`).

Live Demo / Deployment Ready: Open `index.html` directly in any modern browser, or serve using any static web server (Vite, Nginx, Vercel, Netlify, or Python `http.server`).

---

## Table of Contents
1. [Overview](#overview)
2. [Experience Flow](#experience-flow)
3. [Folder Structure](#folder-structure)
4. [Design System Summary](#design-system-summary)
5. [Contact Form & FormSubmit Activation](#contact-form--formsubmit-activation)
6. [Change History](#change-history)

---

## 1. Overview

Shantanu Diwedi is a B.Tech Computer Science student at MIT ADT University, Pune (2025–2029), specialising in Agentic Artificial Intelligence, document compliance systems, and modern full-stack architectures.

This portfolio presents his flagship projects (**BharatSetu**, **GoSolar**, **Senior Safe Tech**), national competitive hackathon distinctions (**Ziro.Digital National Agentic AI Rank #13**, **Smart India Hackathon 2026 Finalist**), upcoming software engineering internship at **Namaha Tech** on *ManageMonk*, and direct hire/contact channels.

---

## 2. Experience Flow

The site adheres to the strict 5-stage progressive flow:
1. **Gate Screen**: Shantanu's black-and-white portrait, title, and a pill button (`Start experience`). Zero media autoplays prior to user interaction.
2. **Match-Cut Video**: Plays `match-cut.mp4` full-screen with rhythmic kinetic highlights of the name **"SHANTANU"** synchronized to the cut points. Includes an accessible skip button (`Skip →`).
3. **Palette Loader**: Tabular numerical counter progressing from `00` to `100` alongside a minimal progress track in `#1A1818`.
4. **Vector Swarm Assembly**: High-velocity canvas simulation of architectural directional arrows and particles converging inward to assemble the site layout. Fades smoothly into the top of the page.
5. **Guaranteed Top Position**: On assembly completion, the scroll offset resets to `(0, 0)` so the user invariably begins at Page 1 (Hero), never mid-page.
6. **Fixed Background Frame**: Ambient fixed canvas frame that remains still while content sections scroll smoothly above it.

> **Accessibility Note (`prefers-reduced-motion`)**: When reduced motion is preferred by the operating system or browser, the video and swarm assemblies are cleanly bypassed in favour of a direct, instantaneous fade into the top of the portfolio.

---

## 3. Folder Structure

```
final/
├── index.html                   # Semantic HTML5 markup adhering to the class contract
├── styles.css                   # Rishi Thakor design system CSS (tokens, scale, responsive layout)
├── main.js                      # Experience flow controller, canvas swarm, scroll observer, form handling
├── photo.jpeg                   # Shantanu Diwedi portrait (Gate & Hero visual)
├── match-cut.mp4                # Match-cut intro sequence
├── Bharatsetu_Cheque.jpeg       # MIT-ADT SIH Tinkering Grant-in-Aid Rs 10,000 cheque
├── FBI_Rank.jpeg                # Ziro.Digital National Agentic AI Hackathon Rank #13 certificate
├── Screen_Recording_2026-11-07_204233.mp4 # Reference screen recording
└── README.md                    # Project documentation and chronological change log
```

---

## 4. Design System Summary

### Colour Palette Tokens
- **Primary / Charcoal**: `#1A1818` (main typography, primary action buttons, dark chips)
- **Primary Contrast / Canvas**: `#E8E4E0` (warm beige editorial canvas, button contrast)
- **Accent / Rust**: `#A4552C` (used sparingly for active timeline markers, eyebrow dots, subtle highlights)
- **Neutral**: `#D5CDCA`
- **Surface Elevated**: `#FFFFFF` (elevated cards, input backgrounds, utility pills)
- **Muted**: `#6E6966` (secondary descriptions, meta labels, dates)
- **Border**: `#E5E7EB` (clean hairline borders)
- **Error**: `#B42318`
- **Success**: `#2F6B3C`

### Typography (Google Fonts: Onest)
- **Headline Display**: `clamp(44px, 7vw, 76px)` / line-height `1.2`, weight `600`, letter-spacing `-1.52px`
- **Headline Lg**: `clamp(36px, 5vw, 54.4px)` / line-height `1.2`, weight `600`, letter-spacing `-1.904px`
- **Headline Md**: `clamp(26px, 3.2vw, 34.4px)` / line-height `1.08`, weight `600`, letter-spacing `-0.688px`
- **Headline Sm**: `18px` / line-height `22px`, weight `600`
- **Body Lg**: `16px` / `24px` (400)
- **Body Md**: `14px` / `20px` (500)
- **Body Sm / Caption**: `12px` / `16px` (500)

### Geometry & Radius
- Fully rounded pills: `border-radius: 9999px` (buttons, chips, form inputs, utility badges)
- Card radius: `border-radius: 20px` (`--r-xl`) for main containers, `12px` (`--r-lg`) for media
- Distinctive **Notepad Card**: rotated at `-2deg` with notebook rules and left margin line.

---

## 5. Contact Form (WhatsApp & Background Email Copy)

When a visitor submits the contact form:
1. **WhatsApp Direct Delivery**: The browser immediately opens WhatsApp directed to **+91 8766642337** (`wa.me/918766642337`) with their Name, Email, Work (Project scope), and Message neatly pre-filled and formatted. The visitor then presses **Send** in WhatsApp to deliver it directly to Shantanu. (Note: A client-side static website cannot send WhatsApp messages silently on its own; fully automatic silent dispatch requires the WhatsApp Business Cloud API with a dedicated server and webhook infrastructure).
2. **Background Email Copy**: Simultaneously, a best-effort email copy is dispatched via `fetch` with `keepalive: true` to FormSubmit (`POST https://formsubmit.co/ajax/shantanudiwedi2007@gmail.com`).

### One-Time FormSubmit Email Activation:
> **Important**: On the first submission made from the **LIVE deployed website** (not from a local `file://` or `localhost` test; check spam), FormSubmit sends an automated verification email to **`shantanudiwedi2007@gmail.com`**. Shantanu must click **"Activate Form"** once in that verification email to enable email forwarding.

Form protections include:
- Hidden honeypot field (`_honey`) to silently discard bot spam.
- Client-side validation for name, valid email regex format, project scope, and message.
- "Open WhatsApp again" retry button displayed in the confirmation status.

---

## Change History

### 2026-11-08 (door text placement and WhatsApp contact)
- Fixed: door checklist sits 44px beside the hovered door (right for doors 1 and 2, left for 3 and 4), no overlap.
- Added: contact form opens WhatsApp with name, email, work and message pre-filled.
- Changed: FormSubmit email is now a background copy; button reads "Send on WhatsApp".

### 2026-11-08 (doors restyle)
- Changed: Rebuilt the **Four Doors** section to match the reference screen recording: dark wall and baseboard stage, four arched doors (navy, plum, sage, rust) with reeded panels, brass nameplates, lever handles and keyholes.
- Added: Hover and keyboard-focus behaviour: the door swings ajar (hinged on the left), a dark lit room shows behind it, a "Click to enter" pill appears, the other doors fade, and a checklist panel for that door appears in the middle of the stage.
- Changed: `index.html` doors markup now uses `.door-arch`, `.door-leaf`, `.door-panel`, `.door-plate`, `.door-handle`, `.door-keyhole`, `.door-cta` and `.door-reveal` (replaces the old card layout with index, description and arrow).
- Changed: `styles.css` doors block fully replaced; removed the old `.door` rules from the responsive breakpoints. On tablet and mobile the checklist shows under each door because there is no hover.
- Changed: Section heading now reads "Magic happens behind the doors" and is centred.
- Added: Copied `Screen_Recording_2026-11-07_204233.mp4` into `final/` folder as specified in master assets.

### 2026-11-08
- Added: Initial production build of the Shantanu Diwedi portfolio matching the Rishi Thakor design system.
- Added: `index.html` featuring the 5-step gate sequence, match-cut video screen with kinetic name pulses, 0–100 numerical loader, canvas swarm assembly, Hero, Four Doors, Featured Projects, National Achievements, Timeline, and Hire Me contact section.
- Added: `styles.css` containing design tokens (warm beige `#E8E4E0`, charcoal `#1A1818`, rust `#A4552C`), Onest typography, fluid clamp scales, pill components, notepad card, and responsive breakpoints (desktop, tablet, mobile).
- Added: `main.js` controller managing user gesture gate unlock, full-screen video playback with timed "SHANTANU" highlights, tabular percentage counter, particle swarm convergence canvas, top-of-page scroll restoration, IntersectionObserver scroll reveals, and FormSubmit AJAX submission.
- Added: Complementary CSS rules appended under documented comments in `styles.css` for kinetic match-cut typography overlay (`.intro-video-overlay`, `.intro-video-name`) and mobile hamburger toggle icon states (`.nav-toggle-icon`).
- Fixed: Resolved underscored asset copies for `Bharatsetu_Cheque.jpeg` and `FBI_Rank.jpeg` ensuring seamless cross-platform asset resolution.
- Fixed: Hardened navigation event listeners against null references in `main.js`.

### 2026-11-08 (contact single-viewport restructure)
- Changed: Contact section restructured to a single-viewport layout; removed duplicate sub-heading and "See my work" button.
- Added: Streamlined lead copy, responsive 3-row message textarea, and integrated contact footer inside 100svh viewport.

### 2026-11-08 (creative contact enhancement)
- Added: Tactile channel cards with micro-icons (Email, Phone, GitHub, LinkedIn) and dynamic ↗ indicators.
- Added: Live availability badge with pulsing status dot (`Available for SWE & AI Internships`).
- Added: Interactive "Quick topics" tag cloud (`Agentic AI`, `SWE Internship`, `Hackathon Collab`) that seamlessly auto-fills the Project Scope field on click.
- Added: Direct dispatch stamp header (`MIT-ADT · PUNE // DIRECT DISPATCH`) and micro-elevations on form inputs and send button.
- Preserved: Single-viewport desktop fit (`100svh`), door animations, 44px door reveal offset, and WhatsApp + FormSubmit delivery.

### 2026-11-08 (theme toggle, scroll timeline, LeetCode channel & layout polish)
- Added: Global pull-cord theme toggle button (`#pullCord`) fixed at the top-right with custom twisted-rope styling and wooden bulb. Supports pointer drag (up to 40px with spring overshoot & swing animation), click toggle, keyboard toggle (Enter/Space), OS `prefers-color-scheme` detection, and persistent state in `localStorage`.
- Added: Dynamic dark and light theme palettes in `styles.css` with a smooth 400ms CSS transition across background, typography, and card surfaces.
- Changed: Rebuilt the Education & Experience section into a scroll-driven timeline pinned at 100svh on desktop with a sticky left panel (eyebrow "My story", heading "Let's go back in time.", dynamic year counter `clamp(5rem, 9vw, 11rem)`, mono caps date range, tabular counter `01 / 04`, and progress bar) and active vertical track dot with radial ambient glow.
- Added: Integrated official LeetCode profile channel (`https://leetcode.com/u/shantanudiwedi`) with custom SVG branding as a full-width card beneath the 2x2 channels grid.
- Changed: Redesigned the Contact section to guarantee a single-viewport fit (`100svh`) across standard desktop viewports (1568x780, 1280x720, 1920x1080) with top padding equal to nav height (`clamp(76px, 11vh, 92px)`) to eliminate overlap with the fixed nav and pull-cord.
- Fixed: Standardized global container max-width (`--maxw: 1240px; margin: 0 auto; padding: 0 var(--s-md)`) and repositioned the floating chip to prevent any overlap with the hanging pull-cord or fixed navigation.
- Preserved: Four doors 3D swing animation, exact 44px door-frame gap, WhatsApp link dispatch to `wa.me/918766642337`, and background FormSubmit copy.

### 2026-11-08 (Start Experience splash, full-screen video & maroon tint)
- Added Start Experience splash, full-screen match-cut video, maroon background tint.
- Added: Premier "Start Experience" splash screen with radial maroon glow top-center, circular grayscale portrait (224px) framed by a 2px crimson ring (`#c8202f`) with soft red glow, bold title, muted tagline, autofocus pill button, and keyboard Esc/Skip support.
- Changed: Match-cut video is now truly full-screen (`100vw` × `100dvh`, `object-fit: cover; object-position: 50% 40%`) eliminating all black bars, letterboxing, and aspect-ratio wrappers. Video starts unmuted on direct user gesture with top-right persistent Skip pill.
- Added: Site-wide ambient maroon background tint (`--maroon: #3a0f14; --maroon-glow`) layered via `body::before` with twin radial gradients, calibrated to full intensity in dark mode and a subtle warm 9% tint in light mode without altering text, cards, buttons, or rust accents.
- Preserved: Door animations, 44px door reveal offset, pull-cord theme toggle, timeline section, single-viewport contact layout, and WhatsApp form submission.### 2026-11-08 (door contrast, portrait crop, contact layout & background music)
- Fixed door reveal text contrast, loading portrait crop, and contact page layout.
- Added background music extracted from the recorded video, with fade-in and a mute toggle.

### 2026-11-08 (contact layout refinement, themed chips, flip notepad, music trigger & video polish)
- Refined Contact section: removed duplicate eyebrow dot, stacked content with consistent gap, added lead copy, three rounded service tiles, direct dispatch label, and preserved single-viewport desktop alignment.
- Themed floating tags and chips: standardized National Rank tag, pill utilities, and tech chips with 4.5:1 contrast, dark theme `#161616` / `#f1ede8`, and 400ms pull-cord transitions.
- Replaced Hero About card with an interactive spiral-bound calendar flip notepad: cream paper in both themes, metal rings, stacked page edges, 3-page split, 4s auto-advance, keyboard navigation, and counter `01 / 03`.
- Updated music playback: background music starts immediately upon clicking START EXPERIENCE, ducks to 0.12 during match-cut video, and smoothly fades to 0.30 without stopping across stages or skips.
- Polished match-cut video screen: removed the big "SHANTANU" text overlay, animations, and timers; added subtle film grain, soft vignette, faint maroon tint, 2px rust progress bar, and 500ms seamless cross-fades.




### 2026-11-09 (contact rebranding, code snippet, compact form, hero calendar in-flow, maroon tint on contact)
- Changed contact heading to "Let's Build / Collaborate", replaced lead paragraph with tagline ("Got an idea? Let's build it together.") and a code-style snippet with syntax colours and blinking cursor.
- Compacted contact form card: 2-row textarea with updated placeholder "Tell me about your idea...", height auto, reduced internal gaps.
- Moved flip-pad calendar to hero left column in normal flow (removed absolute positioning); 4 pages with keyword chips (ABOUT, FOCUS, RECOGNITION, BUILDING) and counter `01 / 04`.
- Added maroon radial gradient tint to contact section (strong in dark mode, subtle in light mode).
- Updated contact grid to `align-items: start` so form card is only as tall as its content.

### 2026-11-09 (targeted bug-fixes and content polish)
- Fixed timeline company name: "Shiv [CONFIRM FULL COMPANY NAME]" → "Namaha Tech · Pune, India".
- Added `#nameError`, `#emailError`, `#messageError` spans under form fields; set `display: block` on `.field-error`; removed dead `.scope-pill` JS block and its `reset` call.
- Updated hero eyebrow to "Open to 2027 internships & collaborations".
- Music is no longer auto-started on START EXPERIENCE — it starts only when the visitor clicks the music toggle (default state off).
- Added sessionStorage `introSeen` guard: repeat visits within the same session skip the splash, video, loader and swarm entirely.
- Changed match-cut video `preload` from `auto` to `metadata`.
- Added SEO meta tags: favicon, og:title/description/image/type, twitter:card/title/description/image.
- Added Resume button (links to resume.pdf, opens in new tab, download attribute) in hero actions and in the nav.
- Updated Senior Safe Tech project: real one-line description + corrected chips (ESP8266, Accelerometer, GSM SMS/Call).
- Removed duplicate FBI_Rank.jpeg from GoSolar project card; replaced with a styled dark-green placeholder with solar SVG icon.
