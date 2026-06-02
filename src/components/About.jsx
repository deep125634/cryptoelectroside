import React from 'react';

export default function About() {
  return (
    <section className="about circuit-bg" id="about">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              ▍ Company Profile
            </div>
            <h2>
              Quality electronics<br />
              <em>made in Gujarat</em>, serving India.
            </h2>
          </div>
        </div>

        <div className="about-grid">
          {/* LEFT — copy */}
          <div className="about-copy reveal">
            <p>
              Founded on <strong>January 1, 2022</strong> by{' '}
              <strong>Chirag Kachhadiya</strong> and <strong>Yagnik Gondaliya</strong>,
              Crypto Electro System is a leading provider of electronic
              starters, auto switches, water level controllers, submersible
              panels, digital timers, ELCB + MCB, monoblock starters and phase
              changers.
            </p>
            <p>
              Our business serves a diverse clientele — businesses, consumers
              and government organisations alike — with a clear mission: help
              our customers meet their electronic needs through high-quality
              products and exceptional service.
            </p>
            <p>
              We pride ourselves on being friendly, responsive and
              knowledgeable. We believe in listening, saying thank you, asking
              for feedback, and using that feedback to continually improve.
            </p>

            <div className="about-stats">
              <div className="about-stat">
                <div className="num">
                  2022<span className="amber">.</span>
                </div>
                <div className="label">Founded</div>
              </div>
              <div className="about-stat">
                <div className="num">
                  20<span className="amber">+</span>
                </div>
                <div className="label">Product lines</div>
              </div>
              <div className="about-stat">
                <div className="num">
                  ISO<span className="amber">.</span>
                </div>
                <div className="label">9001-2015 Certified</div>
              </div>
            </div>
          </div>

          {/* RIGHT — founders */}
          <div className="founders reveal">
            <div className="founder-card">
              <div className="founder-avatar">CP</div>
              <div className="founder-info">
                <h4>Chirag Kachhadiya</h4>
                <small>CO-FOUNDER · CRYPTO ELECTROSYSTEM</small>
              </div>
            </div>

            <div className="founder-card">
              <div className="founder-avatar">YP</div>
              <div className="founder-info">
                <h4>Yagnik Gondaliya</h4>
                <small>CO-FOUNDER · CRYPTO ELECTROSYSTEM</small>
              </div>
            </div>

            <div
              className="founder-card"
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                borderColor: 'var(--ink)',
              }}
            >
              <div
                className="founder-avatar"
                style={{
                  background: 'var(--amber)',
                  color: 'var(--ink)',
                }}
              >
                ✦
              </div>
              <div className="founder-info">
                <h4 style={{ color: 'var(--paper)' }}>
                  Our promise.
                </h4>
                <small style={{ color: 'rgba(250,247,242,0.6)' }}>
                  TOP-NOTCH PRODUCTS · EXCEPTIONAL SERVICE
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
