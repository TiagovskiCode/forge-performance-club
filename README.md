# FORGE — Built by You

> Cinematic one-page website for a fictional premium strength & performance club — built with HTML, CSS, vanilla JS and GSAP.

A **fictional** premium strength & performance club: a design and development concept built with
plain HTML5, CSS3, vanilla JavaScript, GSAP 3.12.5 and ScrollTrigger (cdnjs). No framework, no build step.

> All brand details, prices, allowances, policies and facility specs are **illustrative** and must be
> confirmed by a real business before publication.

## Run

```bash
npx http-server -p 5173 -c-1 .
```

Open <http://localhost:5173>.

## The page

1. **Opening** — ~1 s curtain (skippable, never waits for assets) → image mask opens → headline lines → copy → CTAs. Layered photo, light beam and outline wordmark move at different depths with the pointer.
2. **Philosophy** — bone surface rises over the hero; detail image straddles the edge; word-by-word statement; scrolling "No shortcuts" band.
3. **Training** — interactive service index (Strength floor · Personal training · Performance coaching · Recovery): accessible tabs, image wipes, prices from `js/data.js`.
4. **Membership** — panel opens out of the dark; three plans, selection carries to the form and highlights the comparison column; add-ons, policies and FAQ.
5. **Campaign** — the only pin (desktop, ~1.5 screens): frame expands → "Show up." → "Do the work." → FORGE YOUR LEGACY.
6. **Join** — CTA, four steps, inquiry form, footer.

A chapter rail (desktop ≥ 1280 px) shows where you are and jumps between chapters.

## Files

```
index.html                 structure & copy
css/style.css              design system (tokens at the top, sections in page order)
js/data.js                 ★ prices, plan inclusions, comparison rows, add-ons, policies, form endpoint
js/main.js                 nav, mobile menu, chapter rail, service tabs, plan selection, form, image fallbacks
js/animations.js           GSAP motion system — one function per chapter, one matchMedia lifecycle
assets/images/placeholders SVG light studies used until the photographs exist
IMAGE_GENERATION_BRIEF.md  prompts, sizes and placements for the 8 photographs
```

## Images

The eight photographs are **not generated yet**. Save them with these exact names in `assets/images/`:

```
forge-hero.jpg  forge-hero-mobile.jpg  forge-detail-hands.jpg  forge-floor-wide.jpg
forge-coaching.jpg  forge-conditioning.jpg  forge-recovery.jpg  forge-campaign.jpg
```

Until a file exists the page shows the matching placeholder (`<img data-fallback>`, handled in `js/main.js`);
the browser console logs a 404 for each missing JPG until it is added.

## Inquiry form

Validates and shows a confirmation, but **nothing is sent** by default. Set `formEndpoint` in `js/data.js`
to POST JSON to a real service; the confirmation then shows only on a successful response.

## Motion & accessibility

- Motion language is documented at the top of `js/animations.js`.
- `prefers-reduced-motion` (or the **Motion** toggle in the nav/menu) → opacity-only reveals, no curtain, no pin, no parallax.
- If GSAP fails to load, a 3 s failsafe releases every hidden start-state.
- Native scrolling only — no smooth-scroll library.
