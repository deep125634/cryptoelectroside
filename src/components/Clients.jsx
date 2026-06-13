import React, { useRef, useState, useCallback, useEffect } from 'react';

const departments = [
  {
    abbr: 'NTPC',
    name: 'NTPC Ltd',
    full: 'National Thermal Power Corporation Limited',
    sector: 'Power Generation',
    logo: '/images/clients/ntpc.png',
  },
  {
    abbr: 'IOC',
    name: 'Indian Oil Corporation',
    full: 'Indian Oil Corporation Limited',
    sector: 'Oil & Gas',
    logo: '/images/clients/ioc.png',
  },
  {
    abbr: 'BHEL',
    name: 'BHEL',
    full: 'Bharat Heavy Electricals Limited',
    sector: 'Heavy Engineering',
    logo: '/images/clients/bhel.png',
  },
  {
    abbr: 'CIL',
    name: 'Coal India',
    full: 'Coal India Limited',
    sector: 'Mining & Energy',
    logo: '/images/clients/coal-india.png',
  },
  {
    abbr: 'GeM',
    name: 'Govt. eProcurement',
    full: 'Government eProcurement System',
    sector: 'Public Procurement',
    logo: '/images/clients/gem.svg',
  },
  {
    abbr: 'MDL',
    name: 'MDL',
    full: 'Mazagon Dock Shipbuilders Limited',
    sector: 'Shipbuilding & Defence',
    logo: '/images/clients/mdl.png',
  },
  {
    abbr: 'HSL',
    name: 'HSL',
    full: 'Hindustan Shipyard Limited',
    sector: 'Shipbuilding',
    logo: '/images/clients/hsl.png',
  },
  {
    abbr: 'PMGSY',
    name: 'PMGSY',
    full: 'Pradhan Mantri Gram Sadak Yojana',
    sector: 'Rural Infrastructure',
    logo: '/images/clients/pmgsy.png',
  },
  {
    abbr: 'MOD',
    name: 'Defence',
    full: 'Ministry of Defence, India',
    sector: 'National Defence',
    logo: '/images/clients/defence.png',
  },
  {
    abbr: 'RITES',
    name: 'RITES',
    full: 'Rail India Technical & Economic Service',
    sector: 'Transport & Infrastructure',
    logo: '/images/clients/rites.png',
  },
  {
    abbr: 'NALCO',
    name: 'NALCO',
    full: 'National Aluminium Company Limited',
    sector: 'Aluminium & Mining',
    logo: '/images/clients/nalco.png',
  },
  {
    abbr: 'MSTC',
    name: 'MSTC',
    full: 'Metal Scrap Trade Corporation Limited',
    sector: 'Trade & Commerce',
    logo: '/images/clients/mstc.png',
  },
  {
    abbr: 'DRDO',
    name: 'DRDO',
    full: 'Defence Research & Development Organisation',
    sector: 'Research & Defence',
    logo: '/images/clients/drdo.png',
  },
];

const AUTOPLAY_INTERVAL = 2500;
const AUTOPLAY_RESUME_DELAY = 4000;

export default function Clients() {
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const total = departments.length;
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef(null);

  const scrollTo = useCallback((idx) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: idx * track.clientWidth, behavior: 'smooth' });
    setActiveIdx(idx);
  }, []);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const idx = Math.round(track.scrollLeft / track.clientWidth);
    setActiveIdx(Math.max(0, Math.min(idx, total - 1)));
  }, [total]);

  const pauseAutoplay = useCallback(() => {
    pausedRef.current = true;
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, AUTOPLAY_RESUME_DELAY);
  }, []);

  // Auto-play: advance every AUTOPLAY_INTERVAL ms, loop back to 0
  useEffect(() => {
    const timer = setInterval(() => {
      if (pausedRef.current) return;
      setActiveIdx((prev) => {
        const next = (prev + 1) % total;
        const track = trackRef.current;
        if (track) track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' });
        return next;
      });
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section className="clients circuit-bg" id="clients">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              Trusted by Government
            </div>
            <h2>
              Our <em>Department</em><br />Clients
            </h2>
          </div>
        </div>

        <div className="clients-grid" ref={trackRef} onScroll={handleScroll} onTouchStart={pauseAutoplay}>
          {departments.map((dept) => (
            <div className="client-card reveal" key={dept.abbr}>
              <div className="client-logo-wrap">
                <img
                  src={dept.logo}
                  alt={dept.name}
                  className="client-logo"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="client-abbr-fallback" style={{ display: 'none' }}>
                  {dept.abbr}
                </div>
              </div>
              <div className="client-info">
                <div className="client-name">{dept.full}</div>
                <div className="client-sector">{dept.sector}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel controls — visible on mobile only via CSS */}
        <div className="clients-carousel-controls">
          <button
            className="clients-carousel-btn"
            onClick={() => { pauseAutoplay(); scrollTo(Math.max(0, activeIdx - 1)); }}
            aria-label="Previous client"
            disabled={activeIdx === 0}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="clients-carousel-dots">
            {departments.map((_, i) => (
              <button
                key={i}
                className={`clients-dot${i === activeIdx ? ' active' : ''}`}
                onClick={() => { pauseAutoplay(); scrollTo(i); }}
                aria-label={`Go to client ${i + 1}`}
              />
            ))}
          </div>

          <button
            className="clients-carousel-btn"
            onClick={() => { pauseAutoplay(); scrollTo(Math.min(total - 1, activeIdx + 1)); }}
            aria-label="Next client"
            disabled={activeIdx === total - 1}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
