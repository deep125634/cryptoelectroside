import React from 'react';

const links = [
  { label: 'About',          href: '#about' },
  { label: 'Products',       href: '#products' },
  { label: 'Catalog',        href: '#catalog' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Clients',        href: '#clients' },
];

export default function Navbar({ onOpenPopup }) {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <a href="#top" className="brand" aria-label="Crypto Electrosystem — home">
          <img src="./images/logo.png" alt="Crypto Electrosystem" className="brand-mark" />
        </a>

        <nav className="nav-links">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              onClick={() => {
                if (l.href === '#products') {
                  window.dispatchEvent(new CustomEvent('reset-product-filter'));
                }
              }}
            >
              {l.label}
            </a>
          ))}

          {/* Contact Us — opens popup */}
          <button className="nav-link nav-contact-btn" onClick={onOpenPopup}>
            Contact Us
          </button>
        </nav>

        <button className="btn-primary btn-sm" onClick={onOpenPopup}>
          Get in touch
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </header>
  );
}
