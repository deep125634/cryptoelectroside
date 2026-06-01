# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # Install dependencies (Node 18+ required)
npm run dev        # Start Vite dev server at http://localhost:5173
npm run build      # Production build → ./dist
npm run preview    # Preview production build locally
```

No linting, testing, or formatting tools are configured.

## Architecture

Single-page React 18 marketing website for Crypto Electrosystem (industrial electrical products). Built with Vite 5. No backend — purely static, deployed to any static host. `vite.config.js` sets `base: './'` so the build works from a subdirectory.

**Entry:** `index.html → src/main.jsx → App.jsx`. `main.jsx` wraps `<App />` in `<BrowserRouter>`, but no `<Route>` components exist — navigation is anchor-based (`#about`, `#products`, `#catalog`, `#certifications`, `#clients`, `#contact`).

**`App.jsx` responsibilities:**
- On mount, disables native `scrollRestoration`, strips any URL hash via `history.replaceState`, and scrolls to top — so refreshing the page never jump-scrolls to a section.
- Runs a single `IntersectionObserver` that toggles the `.in` class on every `.reveal` element when it enters the viewport (threshold 0.12). This drives all scroll-reveal animations across the site.
- Renders sections in fixed order inside `<main>`: Hero → About → Products → CatalogViewer → Certifications → Clients → Contact. `<SocialDropdown />`, `<Chatbot />`, and `<ContactPopup />` are rendered as floating overlays *outside* `<main>`.
- Manages `popupOpen` state: auto-opens `ContactPopup` after 5 s on first page visit (guarded by `sessionStorage.getItem('popupShown')`); also passes `openPopup` to `Navbar` for manual trigger.

**Components** (`src/components/`):
- `Navbar` — sticky nav with anchor links. Clicking the Products link dispatches a `reset-product-filter` custom event on `window` so the grid resets to "All".
- `Hero` — animated marquee, fade-up entrance
- `About` — founder cards, company stats
- `Products` — filterable grid (`useMemo` on category). Listens for the `reset-product-filter` event and `hashchange` to reset its filter. Clicking a card opens `ProductModal` and also resets the filter.
- `ProductModal` — full-screen overlay; closes on Escape or backdrop click; locks body scroll
- `CatalogViewer` — 24-page flipbook using `/public/catalog/page-01.jpg` through `page-24.jpg`
- `Certifications` — static badge grid
- `Clients` — grid of government/PSU clients (NTPC, IOC, BHEL, etc.) with logo fallback to abbreviation chip on image load error
- `Contact` — footer with address, phones, emails
- `SocialDropdown` — fixed-position floating action button (bottom-right) with hover/click-toggled social links
- `Chatbot` — fixed-position floating chat panel. **Fully offline** — no API calls; matches user input against a curated `INTENTS` array of regex/keyword patterns and replies from canned responses with quick-reply chips. Closes on Escape, autofocuses on open.
- `ContactPopup` — modal contact form powered by **EmailJS** (`@emailjs/browser`). Requires three `VITE_EMAILJS_*` env vars; degrades gracefully if absent (shows a "not configured" error rather than throwing). Closes on Escape or backdrop click; resets form state on re-open.

**Environment variables** (create `.env.local` at the project root for local dev):
```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

**Data:** `src/data/products.js` exports `categories` and `products` arrays. Each product has `id`, `category`, `catLabel`, `name`, `subtitle`, `page` (source PDF page #), `image` (path under `/images/products/`), optional `cutout` flag, optional `gallery` array (rendered as a collage when length > 1), `summary`, `variants`, `specs`, `features`, and `applications`. All product data is hardcoded here — there is no CMS.

**Styling:** Single global CSS file `src/styles.css` (~3500 lines). Custom CSS variables define the design system — no Tailwind or CSS-in-JS. Key tokens:
- `--paper` / `--ink` — background and text
- `--amber` (`#E87722`) — brand orange
- `--font-display` Bricolage Grotesque, `--font-body` Inter Tight, `--font-mono` JetBrains Mono

Reveal animations rely on the `.reveal` → `.reveal.in` class swap driven by the observer in `App.jsx`. Responsive breakpoints use `max-width: 880px` and `max-width: 1024px` media queries.

**Static assets** live in `public/`: catalog page renders (`catalog/page-01.jpg` … `page-24.jpg`), product cutouts (`images/products/*.png`), client logos (`images/clients/*`), certifications (`images/certs/*`), and background SVGs (`images/banner*.svg`, `images/circuit-pattern.svg`).
