import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function validate(form) {
  const d = new FormData(form);
  const errs = {};
  if (!d.get('from_name')?.trim())  errs.from_name  = 'Full name is required.';
  if (!d.get('from_email')?.trim()) errs.from_email = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.get('from_email')))
    errs.from_email = 'Enter a valid email address.';
  if (!d.get('phone')?.trim())      errs.phone      = 'Phone number is required.';
  if (!d.get('subject')?.trim())    errs.subject    = 'Subject is required.';
  if (!d.get('message')?.trim())    errs.message    = 'Message is required.';
  return errs;
}

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus]           = useState('idle');
  const [sendError, setSendError]     = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  function clearField(name) {
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(formRef.current);
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setSendError('Email service is not configured. Please contact us directly.');
      setStatus('error');
      return;
    }
    setStatus('sending');
    setSendError('');
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus('success');
        formRef.current.reset();
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        setSendError('Failed to send. Please try again or email us directly.');
        setStatus('error');
      });
  }

  return (
    <section className="contact circuit-bg circuit-bg--dark" id="contact">
      <div className="contact-bg" aria-hidden="true" />
      <div className="container contact-inner">
        <div className="eyebrow" style={{ marginBottom: 22 }}>
          ▍ Get in touch
        </div>

        <h2>
          Let&rsquo;s talk about<br />
          <em>your project.</em>
        </h2>

        <div className="contact-rule" aria-hidden="true" />
        <div className="contact-grid">
          {/* Address */}
          <div className="contact-block">
            <h4>
              <span className="contact-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              Stay In Touch With Us...
            </h4>
            <p className="big">
              25, Satadhar Industrial Hub,<br />
              B/H Gokul Industrial Park,<br />
              Kathwada Singarwa Road,<br />
              Kathwada, Ahmedabad — 382430<br />
              Gujarat, INDIA
            </p>
            <a
              href="https://maps.app.goo.gl/1WgLq5ogSeHBvPXp7"
              target="_blank"
              rel="noreferrer"
              style={{ marginTop: 10, display: 'inline-block', fontWeight: 600, borderBottom: '1px solid var(--ink)', paddingBottom: 2 }}
            >
              Open in Maps →
            </a>
          </div>

          {/* Call */}
          <div className="contact-block">
            <h4>
              <span className="contact-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
              </span>
              Contact us
            </h4>
            <a href="tel:+919909136367" className="big">+91 99091 36367</a>
            <a href="tel:+917041836367" className="big" style={{ display: 'block' }}>+91 70418 36367</a>
            <a href="https://www.cryptoelectrosystem.com" target="_blank" rel="noreferrer" style={{ marginTop: 14, display: 'block' }}>
              www.cryptoelectrosystem.com
            </a>
          </div>

          {/* Email */}
          <div className="contact-block">
            <h4>
              <span className="contact-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              Email
            </h4>
            <a href="mailto:cryptoelectrosystem@gmail.com?subject=Inquiry%20from%20website&body=Hello%20Crypto%20Electrosystem%2C%0D%0A%0D%0A">cryptoelectrosystem@gmail.com</a>
            <a href="mailto:salescryptoelectrosystem22@gmail.com?subject=Sales%20inquiry&body=Hello%20Sales%20team%2C%0D%0A%0D%0A">salescryptoelectrosystem22@gmail.com</a>
            <a href="mailto:purchasecryptoelectrosystem@gmail.com?subject=Purchase%20inquiry&body=Hello%20Purchase%20team%2C%0D%0A%0D%0A">purchasecryptoelectrosystem@gmail.com</a>
            <a href="mailto:marketingcryptoelectrosystem@gmail.com?subject=Marketing%20inquiry&body=Hello%20Marketing%20team%2C%0D%0A%0D%0A">marketingcryptoelectrosystem@gmail.com</a>
            <a href="mailto:info.cryptoelectrosystem@gmail.com?subject=General%20inquiry&body=Hello%2C%0D%0A%0D%0A">info.cryptoelectrosystem@gmail.com</a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-wrap reveal">
          <h3 className="contact-form-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Send us a message
          </h3>

          {status === 'success' ? (
            <div className="contact-form-success">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <p>Your message has been sent! We&rsquo;ll get back to you soon.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="cf-row">
                <div className="cf-field">
                  <label htmlFor="cf-name">Full Name <span aria-hidden="true">*</span></label>
                  <input
                    id="cf-name"
                    type="text"
                    name="from_name"
                    placeholder="e.g. Rajesh Sharma"
                    autoComplete="name"
                    className={fieldErrors.from_name ? 'cf-input-err' : ''}
                    onChange={() => clearField('from_name')}
                  />
                  {fieldErrors.from_name && <span className="cf-field-error">{fieldErrors.from_name}</span>}
                </div>
                <div className="cf-field">
                  <label htmlFor="cf-email">Email Address <span aria-hidden="true">*</span></label>
                  <input
                    id="cf-email"
                    type="email"
                    name="from_email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={fieldErrors.from_email ? 'cf-input-err' : ''}
                    onChange={() => clearField('from_email')}
                  />
                  {fieldErrors.from_email && <span className="cf-field-error">{fieldErrors.from_email}</span>}
                </div>
              </div>

              <div className="cf-row">
                <div className="cf-field">
                  <label htmlFor="cf-phone">Phone Number <span aria-hidden="true">*</span></label>
                  <input
                    id="cf-phone"
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    autoComplete="tel"
                    className={fieldErrors.phone ? 'cf-input-err' : ''}
                    onChange={() => clearField('phone')}
                  />
                  {fieldErrors.phone && <span className="cf-field-error">{fieldErrors.phone}</span>}
                </div>
                <div className="cf-field">
                  <label htmlFor="cf-subject">Subject <span aria-hidden="true">*</span></label>
                  <input
                    id="cf-subject"
                    type="text"
                    name="subject"
                    placeholder="Product inquiry, quotation, etc."
                    className={fieldErrors.subject ? 'cf-input-err' : ''}
                    onChange={() => clearField('subject')}
                  />
                  {fieldErrors.subject && <span className="cf-field-error">{fieldErrors.subject}</span>}
                </div>
              </div>

              <div className="cf-field">
                <label htmlFor="cf-message">Message <span aria-hidden="true">*</span></label>
                <textarea
                  id="cf-message"
                  name="message"
                  placeholder="Describe your requirement or question..."
                  rows={5}
                  className={fieldErrors.message ? 'cf-input-err' : ''}
                  onChange={() => clearField('message')}
                />
                {fieldErrors.message && <span className="cf-field-error">{fieldErrors.message}</span>}
              </div>

              {status === 'error' && (
                <p className="cf-error" role="alert">{sendError}</p>
              )}

              <button type="submit" className="cf-submit" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <><span className="cf-spinner" aria-hidden="true" /> Sending…</>
                ) : (
                  <>
                    Send Message
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Map embed */}
        <div className="contact-map">
          <iframe
            title="Crypto Electrosystem — Google Map"
            src="https://www.google.com/maps?q=25%20Satadhar%20Industrial%20Hub%2C%20Kathwada%2C%20Ahmedabad%2C%20Gujarat%20382430&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            className="contact-map-overlay"
            href="https://maps.app.goo.gl/1WgLq5ogSeHBvPXp7"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Crypto Electrosystem location in Google Maps"
          >
            <span className="contact-map-cta">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              View on Google Maps
            </span>
          </a>
        </div>

        {/* Footer rule */}
        <div className="footer-rule">
          <div>© {new Date().getFullYear()} CRYPTO ELECTROSYSTEM <span>✦</span> ISO 9001-2015</div>
          <div>FOUNDED 2022 <span>✦</span> CHIRAG PATEL &amp; YAGNIK PATEL</div>
          <div>BE SAFE AND SECURE.</div>
        </div>
      </div>
    </section>
  );
}
