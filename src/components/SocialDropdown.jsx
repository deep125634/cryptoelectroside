import React, { useEffect, useRef, useState } from 'react';

const socials = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/919909136367',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
        <path
          fill="#fff"
          d="M23.5 8.5A10.45 10.45 0 0 0 16 5.5C10.2 5.5 5.5 10.2 5.5 16c0 1.85.48 3.65 1.4 5.24L5.5 26.5l5.4-1.38A10.48 10.48 0 0 0 16 26.5c5.8 0 10.5-4.7 10.5-10.5 0-2.8-1.09-5.44-3-7.5zm-7.5 16.1a8.7 8.7 0 0 1-4.43-1.21l-.32-.19-3.2.82.85-3.1-.21-.33A8.6 8.6 0 0 1 7.4 16c0-4.75 3.87-8.6 8.6-8.6 2.3 0 4.46.9 6.08 2.53A8.54 8.54 0 0 1 24.6 16c0 4.74-3.86 8.6-8.6 8.6zm4.72-6.44c-.26-.13-1.53-.75-1.77-.84-.24-.09-.41-.13-.58.13-.17.26-.65.84-.8 1.01-.15.17-.29.2-.55.07-.26-.13-1.1-.4-2.1-1.28-.77-.68-1.3-1.53-1.45-1.79-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.16.17-.26.26-.43.09-.17.04-.32-.02-.45-.07-.13-.58-1.4-.8-1.92-.21-.5-.43-.43-.58-.44h-.5c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.14s.92 2.48 1.05 2.65c.13.17 1.81 2.76 4.38 3.87.61.26 1.09.42 1.46.54.61.19 1.17.16 1.61.1.49-.07 1.53-.62 1.74-1.23.22-.6.22-1.12.15-1.23-.06-.11-.23-.17-.49-.3z"
        />
      </svg>
    ),
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/crypto_electrosystem?igsh=MXZ6ZWMzZm4wMjkydA==',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          fill="#fff"
          d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 2.16c-3.14 0-3.5.01-4.74.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.27.83-.39.39-.63.76-.83 1.27-.15.39-.33.97-.38 2.04-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.05 1.07.23 1.65.38 2.04.2.51.44.88.83 1.27.39.39.76.63 1.27.83.39.15.97.33 2.04.38 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c1.07-.05 1.65-.23 2.04-.38.51-.2.88-.44 1.27-.83.39-.39.63-.76.83-1.27.15-.39.33-.97.38-2.04.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.05-1.07-.23-1.65-.38-2.04a3.4 3.4 0 0 0-.83-1.27 3.4 3.4 0 0 0-1.27-.83c-.39-.15-.97-.33-2.04-.38-1.24-.06-1.6-.07-4.74-.07Zm0 3.68a3.96 3.96 0 1 1 0 7.92 3.96 3.96 0 0 1 0-7.92Zm0 2.16a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Zm5.04-2.4a.92.92 0 1 1 0-1.84.92.92 0 0 1 0 1.84Z"
        />
      </svg>
    ),
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/crypto-electrosystem-0b8830403?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          fill="#fff"
          d="M6.94 7.5a1.94 1.94 0 1 1 0-3.88 1.94 1.94 0 0 1 0 3.88ZM5.06 20.5V8.96h3.76V20.5H5.06Zm5.7 0V8.96h3.6v1.58h.05c.5-.9 1.73-1.86 3.56-1.86 3.8 0 4.5 2.5 4.5 5.75v6.07h-3.75v-5.38c0-1.28-.02-2.93-1.79-2.93-1.79 0-2.06 1.4-2.06 2.84v5.47h-3.75Z"
        />
      </svg>
    ),
  },
  {
    key: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1Hc3o9NedL/?mibextid=wwXIfr',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          fill="#fff"
          d="M13.5 21v-7.5h2.52l.38-2.93H13.5V8.7c0-.85.24-1.43 1.46-1.43h1.56V4.66c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9v2.17H7.92v2.93h2.52V21h3.06Z"
        />
      </svg>
    ),
  },
];

export default function SocialDropdown() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`social-fab ${open ? 'is-open' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="social-fab__list" aria-hidden={!open}>
        {socials.map((s, i) => (
          <a
            key={s.key}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className={`social-fab__item social-fab__item--${s.key}`}
            style={{ transitionDelay: `${open ? i * 0.05 : (socials.length - 1 - i) * 0.04}s` }}
            tabIndex={open ? 0 : -1}
          >
            {s.svg}
            <span className="social-fab__tip">{s.label}</span>
          </a>
        ))}
      </div>

      <button
        type="button"
        className="social-fab__trigger"
        aria-label={open ? 'Close social menu' : 'Open social menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="18" cy="5"  r="3" />
          <circle cx="6"  cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
          <line x1="15.4" y1="6.5"  x2="8.6"  y2="10.5" />
        </svg>
      </button>
    </div>
  );
}
