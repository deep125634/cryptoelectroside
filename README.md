# Crypto Electrosystem — Static Website

A static React + Vite website converted from the Crypto Electrosystem product
catalogue PDF. All 20+ product categories from the catalogue are presented
with technical specs, features, variants and applications. The original
24-page printed catalogue is also browsable inside an interactive flipbook.

---

## 🎨 Design

A custom **warm industrial editorial** aesthetic — built around the brand's
existing identity (orange + black + warm off-white). Avoids the generic
SaaS-style purple-gradient look entirely.

- **Background:** `#FAF7F2` (warm paper white) with a subtle grain texture
- **Ink:** `#0B0B0C`
- **Accent:** `#E87722` (Crypto brand orange) + `#FF8C2E` hot highlight
- **Type:** Bricolage Grotesque (display) + Inter Tight (body) + JetBrains Mono (technical labels)
- **Motifs:** subtle hex grain, marquee, italic-serif accents, mono labels with `▍` markers

---

## 🚀 Run it

You'll need Node.js 18+ installed.

```bash
# install dependencies
npm install

# start the dev server (opens at http://localhost:5173)
npm run dev

# build for production (outputs to ./dist)
npm run build

# preview the production build locally
npm run preview
```

Deploy the contents of `dist/` to any static host — Netlify, Vercel,
Cloudflare Pages, GitHub Pages, or a plain web server.

---

## 📁 Structure

```
crypto-site/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── catalog/        ← all 24 catalogue pages as JPGs (used in flipbook & product cards)
│   └── images/
│       └── logo.png    ← extracted Crypto logo
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css      ← full design system
    ├── data/
    │   └── products.js ← all product data extracted from the PDF
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Products.jsx
        ├── ProductModal.jsx
        ├── CatalogViewer.jsx
        ├── Certifications.jsx
        └── Contact.jsx
```

---

## 🧩 Sections

1. **Hero** — bold headline, animated marquee, two feature cards
2. **About** — company profile, founder cards, key stats
3. **Products** — filterable grid of all 20 product categories; click for
   a detailed modal with specs, features, variants and applications
4. **Catalog Viewer** — interactive flipbook with all 24 PDF pages
5. **Certifications** — ISO 9001-2015, CE, FCC, RoHS, MSME, IEC, Trust Seal, IndiaMART
6. **Contact** — address, phones, all email addresses; footer

---

## 📝 Notes

- Built as a **static site** — no backend, no API, everything is in the
  bundle. Just upload the `dist/` folder anywhere.
- All product imagery uses the optimized catalogue-page renders (~2.2 MB
  total for all 24 pages), so the site stays light.
- The site is responsive and works well on mobile.
- Open `http://localhost:5173` after `npm run dev` to see it.

---

*Be safe and SECURE.*
