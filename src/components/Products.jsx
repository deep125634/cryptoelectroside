import React, { useState, useMemo, useEffect } from 'react';
import { products, categories } from '../data/products.js';
import ProductModal from './ProductModal.jsx';

export default function Products() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? products
        : products.filter((p) => p.category === filter),
    [filter]
  );

  // Reset filter to "All" whenever the navbar Products link is clicked
  // (custom event fires from Navbar). Also listens to hashchange as a fallback.
  useEffect(() => {
    const reset = () => setFilter('all');
    const onHashChange = () => {
      if (window.location.hash === '#products') reset();
    };
    window.addEventListener('reset-product-filter', reset);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('reset-product-filter', reset);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return (
    <section className="products circuit-bg" id="products">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              ▍ The Catalogue
            </div>
            <h2>
              Engineered for protection.<br />
              <em>Designed for everyday use.</em>
            </h2>
          </div>
        </div>

        {/* FILTER */}
        <div className="filter-bar">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`filter-chip ${filter === c.id ? 'active' : ''}`}
              onClick={() => setFilter(c.id)}
            >
              {c.label}
              {c.id !== 'all' && (
                <span style={{ marginLeft: 8, opacity: 0.6, fontSize: 11 }}>
                  {products.filter((p) => p.category === c.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="product-grid">
          {filtered.map((p, idx) => (
            <article
              key={p.id}
              className="product-card"
              onClick={() => { setSelected(p); setFilter('all'); }}
            >
              <div
                className={`img-wrap${p.cutout ? ' img-wrap--cutout' : ''}${
                  p.gallery && p.gallery.length > 1 ? ' img-wrap--gallery' : ''
                }`}
              >
                <span className="img-tag">{p.catLabel}</span>
                <span className="img-num">
                  No. {String(p.page - 3).padStart(2, '0')}
                </span>
                {p.gallery && p.gallery.length > 1 ? (
                  <div className={`img-collage img-collage--${Math.min(p.gallery.length, 8)}`}>
                    {p.gallery.slice(0, 8).map((src, i) => (
                      <span
                        className={`collage-cell${
                          i === 0 && p.gallery.length === 3 ? ' collage-cell--main' : ''
                        }`}
                        key={i}
                      >
                        <img src={src} alt={`${p.name} variant ${i + 1}`} loading="lazy" />
                        {p.variants && p.variants[i] && (
                          <em className="collage-name">{p.variants[i]}</em>
                        )}
                      </span>
                    ))}
                  </div>
                ) : (
                  <img src={p.image} alt={p.name} loading="lazy" />
                )}
                <span className="view-cta" aria-hidden="true">
                  View details
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
              <div className="info">
                <div className="category">{p.subtitle}</div>
                <h3>{p.name}</h3>
                <p className="desc">{p.summary.slice(0, 110)}…</p>
                <div className="variants">
                  {p.variants.slice(0, 3).map((v, i) => (
                    <span className="variant-pill" key={i}>
                      {v.length > 22 ? v.slice(0, 22) + '…' : v}
                    </span>
                  ))}
                  {p.variants.length > 3 && (
                    <span className="variant-pill more">
                      +{p.variants.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <ProductModal
          key={selected.id}
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
