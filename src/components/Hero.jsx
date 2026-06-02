import React from 'react';

export default function Hero() {
  const marqueeItems = [
    { label: 'Motor Starters',            icon: '⚡' },
    { label: 'Water Level Controllers',   icon: '💧' },
    { label: 'Auto Switches',             icon: '🔄' },
    { label: 'Digital Timers',            icon: '⏱' },
    { label: 'ELCB + MCB',               icon: '🛡' },
    { label: 'Submersible Panels',        icon: '🔩' },
    { label: 'Phase Changers',            icon: '🔁' },
    { label: 'Mobile GSM Controllers',    icon: '📶' },
    { label: 'Digital Wall Mounting Meter', icon: '📊' },
    { label: 'ELCB + MCB + RCCB',        icon: '⚡' },
  ];

  return (
    <section className="hero" id="top">
      <div className="hero-banner-full">
        <div className="banner-stage">
          {/* Ribbons — corner accents only */}
          <svg className="banner-ribbon banner-ribbon--top" viewBox="0 0 1920 140" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 0 L1920 0 L1920 60 C 1440 140, 880 130, 360 78 C 240 60, 110 50, 0 56 Z" fill="#0C0A08" />
            <path d="M0 20 C 320 110, 760 130, 1240 90 C 1560 60, 1760 30, 1920 24 L 1920 0 L 0 0 Z" fill="url(#amberA)" opacity="0.95" />
            <defs>
              <linearGradient id="amberA" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#F4A158" />
                <stop offset="50%"  stopColor="#E87722" />
                <stop offset="100%" stopColor="#C46018" />
              </linearGradient>
            </defs>
          </svg>

          <svg className="banner-ribbon banner-ribbon--bottom" viewBox="0 0 1920 140" preserveAspectRatio="none" aria-hidden="true">
            <path d="M1920 140 L0 140 L0 80 C 480 0, 1040 10, 1560 62 C 1680 80, 1810 90, 1920 84 Z" fill="#0C0A08" />
            <path d="M1920 120 C 1600 30, 1160 10, 680 50 C 360 80, 160 110, 0 116 L 0 140 L 1920 140 Z" fill="url(#amberB)" opacity="0.95" />
            <defs>
              <linearGradient id="amberB" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#F4A158" />
                <stop offset="50%"  stopColor="#E87722" />
                <stop offset="100%" stopColor="#C46018" />
              </linearGradient>
            </defs>
          </svg>

          {/* Brand block */}
          <div className="banner-brand">
            <div className="banner-wordmark">
              c<span className="banner-r">r</span>ypto
            </div>
            <div className="banner-sub">electrosystem</div>
            <div className="banner-iso">
              <span className="banner-iso-rule" />
              AN ISO 9001 — 2015 COMPANY
              <span className="banner-iso-rule" />
            </div>
          </div>

          {/* Three product circles */}
          <div className="banner-circles">
            <figure className="banner-circle banner-circle--left">
              <div className="banner-circle-img">
                <img src="./images/banner/industrial.jpg" alt="Industrial electronics" loading="eager" />
              </div>
              <figcaption>INDUSTRIAL</figcaption>
            </figure>
            <figure className="banner-circle banner-circle--center">
              <div className="banner-circle-img">
                <img src="./images/banner/agriculture.jpg" alt="Agriculture" loading="eager" />
              </div>
              <figcaption>AGRICULTURE</figcaption>
            </figure>
            <figure className="banner-circle banner-circle--right">
              <div className="banner-circle-img">
                <img src="./images/banner/home.jpg" alt="Modern home" loading="eager" />
              </div>
              <figcaption>HOME</figcaption>
            </figure>
          </div>

          {/* Bottom typography */}
          <div className="banner-bottom">
            <div className="banner-electronics">
              <h2>ELECTRONICS</h2>
              <p>Product for Industries, Agriculture and Home</p>
            </div>
            <div className="banner-safe">
              <span className="banner-safe-line banner-safe-amber">Better</span>
              <span className="banner-safe-line banner-safe-and">Selection</span>
              <span className="banner-safe-line banner-safe-secure">HIGH SUCCESS</span>
            </div>
          </div>
        </div>

      </div>

      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-glow-2" aria-hidden="true" />
      <div className="container">
        <div className="hero-grid">
          {/* LEFT — headline */}
          <div className="hero-headline">
            <div className="hero-badge fade-up">
              Est. 2022 · Ahmedabad · ISO 9001-2015
            </div>

            <h1 className="fade-up delay-1">
              Be safe<br />
              <span className="outline">and</span>{' '}
              <span className="accent">secure.</span>
            </h1>

            <p className="hero-sub fade-up delay-2">
              Crypto Electrosystem builds reliable electronic starters, controllers
              and protection systems for industries, agriculture and the modern
              home. Micro-controller-driven engineering, certified quality, built
              in Gujarat — trusted across India.
            </p>

            <div className="hero-actions fade-up delay-3">
              <a href="#products" className="btn-primary">
                Browse products
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#catalog" className="btn-ghost">
                View catalog
              </a>
            </div>
          </div>

          {/* RIGHT — feature cards */}
          <div className="hero-side">
            <div className="hero-card fade-up delay-2">
              <span className="tag">▍ TECHNOLOGY</span>
              <h3>Micro-controller based electronics for precision protection.</h3>
              <div className="stat">
                17<small>+</small>
              </div>
              <div className="stat-label">Distinct product categories</div>
            </div>

            <div className="hero-card amber fade-up delay-3">
              <span className="tag">▍ COVERAGE</span>
              <h3>Built for everywhere — from villages to industrial sites.</h3>
              <div className="stat">
                500V
              </div>
              <div className="stat-label">Up to 3-phase operating range</div>
            </div>
          </div>
        </div>

        {/* MARQUEE */}
        <div className="marquee fade-up delay-4" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map(copy => (
              <span key={copy}>
                {marqueeItems.map((item, i) => (
                  <span className="marquee-item" key={i}>
                    <span className="marquee-icon">{item.icon}</span>
                    {item.label}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
