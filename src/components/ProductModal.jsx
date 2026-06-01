import React, { useEffect, useState } from 'react';

export default function ProductModal({ product, onClose }) {
  const gallery =
    product?.gallery && product.gallery.length ? product.gallery : [product?.image];
  const [active, setActive] = useState(0);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!product) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target.classList.contains('modal-backdrop') && onClose()}
    >
      <div className="modal" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className={`modal-image${product.cutout ? ' modal-image--cutout' : ''} modal-image--${product.id}`}>
          <img src={gallery[active]} alt={product.name} />
          {gallery.length > 1 && (
            <div className="modal-thumbs">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  className={`modal-thumb${i === active ? ' active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1} of ${gallery.length}`}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="modal-content">
          <div className="cat">▍ {product.catLabel}</div>
          <h2>{product.name}</h2>
          <p className="summary">
            <em style={{ color: 'var(--amber-deep)' }}>{product.subtitle}.</em>{' '}
            {product.summary}
          </p>

          <div className="spec-block">
            <h4>Technical Specification</h4>
            {Object.entries(product.specs).map(([k, v]) => (
              <div className="spec-row" key={k}>
                <span className="key">{k}</span>
                <span className="val">{v}</span>
              </div>
            ))}
          </div>

          <div className="spec-block">
            <h4>Features</h4>
            <ul className="feature-list">
              {product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="spec-block">
            <h4>Variants</h4>
            <div className="app-tags">
              {product.variants.map((v, i) => (
                <span
                  key={i}
                  className="app-tag"
                  style={{
                    background: 'var(--paper-warm)',
                    color: 'var(--ink-soft)',
                  }}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          <div className="spec-block" style={{ marginBottom: 0 }}>
            <h4>Application</h4>
            <div className="app-tags">
              {product.applications.map((a, i) => (
                <span key={i} className="app-tag">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
