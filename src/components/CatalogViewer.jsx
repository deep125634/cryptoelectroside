import React, { useEffect, useRef, useState } from 'react';

const TOTAL_PAGES = 24;
const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => ({
  num: i + 1,
  src: `/catalog/page-${String(i + 1).padStart(2, '0')}.jpg`,
}));

const MIN_SCALE = 1;
const MAX_SCALE = 2;
const ZOOM_STEP = 0.25;

export default function CatalogViewer() {
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const stageRef = useRef(null);

  const current = pages[page - 1];

  const goTo = (n) => {
    setLoading(true);
    setScale(1);
    setPage(n);
  };
  const goPrev = () => {
    setLoading(true);
    setScale(1);
    setPage((p) => (p > 1 ? p - 1 : TOTAL_PAGES));
  };
  const goNext = () => {
    setLoading(true);
    setScale(1);
    setPage((p) => (p < TOTAL_PAGES ? p + 1 : 1));
  };

  const zoomIn  = () => setScale((s) => Math.min(MAX_SCALE, +(s + ZOOM_STEP).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(MIN_SCALE, +(s - ZOOM_STEP).toFixed(2)));
  const resetZoom = () => setScale(1);

  // Keyboard navigation while viewer is on screen
  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    let active = false;
    const io = new IntersectionObserver(
      ([entry]) => { active = entry.isIntersecting; },
      { threshold: 0.4 },
    );
    io.observe(node);
    const onKey = (e) => {
      if (!active) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goPrev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      io.disconnect();
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  // Keep the active thumbnail in view in the sidebar
  useEffect(() => {
    const el = document.querySelector('.viewer-thumb.active');
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    }
  }, [page]);

  return (
    <section className="catalog" id="catalog">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              ▍ The Original Catalogue
            </div>
            <h2>
              Browse every page.<br />
              <em>The full book, online.</em>
            </h2>
          </div>
        </div>

        <div className="viewer reveal">
          {/* LEFT — vertical thumbnail rail */}
          <aside className="viewer-sidebar" aria-label="Catalogue pages">
            <div className="viewer-sidebar-head">
              <span className="viewer-sidebar-title">Pages</span>
              <span className="viewer-sidebar-count">{TOTAL_PAGES}</span>
            </div>
            <div className="viewer-thumbs" role="listbox" aria-orientation="vertical">
              {pages.map((p) => (
                <button
                  key={p.num}
                  type="button"
                  className={`viewer-thumb${page === p.num ? ' active' : ''}`}
                  onClick={() => goTo(p.num)}
                  aria-current={page === p.num ? 'page' : undefined}
                  aria-label={`Go to page ${p.num}`}
                >
                  <span className="viewer-thumb-img">
                    <img src={p.src} alt="" loading="lazy" />
                  </span>
                  <span className="viewer-thumb-num">
                    Page {String(p.num).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* RIGHT — main viewer */}
          <div className="viewer-main">
            <div className="viewer-toolbar">
              <span className="viewer-pagepill" aria-live="polite">
                <strong>{String(page).padStart(2, '0')}</strong>
                <em>/ {String(TOTAL_PAGES).padStart(2, '0')}</em>
              </span>
              <div className="viewer-toolbar-right">
                <button
                  type="button"
                  className="viewer-tool"
                  onClick={zoomOut}
                  disabled={scale <= MIN_SCALE}
                  aria-label="Zoom out"
                  title="Zoom out"
                >−</button>
                <span className="viewer-zoom">{Math.round(scale * 100)}%</span>
                <button
                  type="button"
                  className="viewer-tool"
                  onClick={zoomIn}
                  disabled={scale >= MAX_SCALE}
                  aria-label="Zoom in"
                  title="Zoom in"
                >+</button>
                <button
                  type="button"
                  className="viewer-tool"
                  onClick={resetZoom}
                  disabled={scale === 1}
                  aria-label="Reset zoom"
                  title="Reset zoom"
                >⊙</button>
              </div>
            </div>

            <div className="viewer-stage" ref={stageRef}>
              {loading && <div className="viewer-skeleton" aria-hidden="true" />}
              <img
                key={current.num}
                src={current.src}
                alt={`Catalogue page ${current.num}`}
                className={`viewer-page${loading ? ' is-loading' : ''}`}
                style={{ transform: `scale(${scale})` }}
                onLoad={() => setLoading(false)}
              />
              <button
                type="button"
                className="viewer-nav viewer-nav--prev"
                onClick={goPrev}
                aria-label="Previous page"
              >‹</button>
              <button
                type="button"
                className="viewer-nav viewer-nav--next"
                onClick={goNext}
                aria-label="Next page"
              >›</button>
            </div>

            <div className="viewer-hint">
              Use <kbd>←</kbd> <kbd>→</kbd> arrows to navigate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
