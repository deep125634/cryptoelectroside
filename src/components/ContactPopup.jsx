import React, { useRef, useState, useEffect } from 'react';
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

export default function ContactPopup({ open, onClose }) {
  const formRef = useRef(null);
  const [status, setStatus]           = useState('idle');
  const [sendError, setSendError]     = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  function clearField(name) {
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
  }

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Reset state when popup re-opens
  useEffect(() => {
    if (open) {
      setStatus('idle');
      setSendError('');
      setFieldErrors({});
    }
  }, [open]);

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

  if (!open) return null;

  return (
    <div className="cpopup-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Contact us">
      <div className="cpopup-card" onClick={(e) => e.stopPropagation()}>

        <button className="cpopup-close" onClick={onClose} aria-label="Close contact form">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="cpopup-header">
          <div className="eyebrow" style={{ marginBottom: 8, fontSize: 10 }}>▍ Contact Us</div>
          <h3 className="cpopup-title">Send us a <em>message</em></h3>
          <p className="cpopup-sub">We'll get back to you within 24 hours.</p>
        </div>

        {status === 'success' ? (
          <div className="contact-form-success" style={{ marginTop: 20 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <p>Message sent! We'll get back to you soon.</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate style={{ marginTop: 20 }}>
            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="cp-name">Full Name <span aria-hidden="true">*</span></label>
                <input
                  id="cp-name"
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
                <label htmlFor="cp-email">Email <span aria-hidden="true">*</span></label>
                <input
                  id="cp-email"
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
                <label htmlFor="cp-phone">Phone <span aria-hidden="true">*</span></label>
                <input
                  id="cp-phone"
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
                <label htmlFor="cp-subject">Subject <span aria-hidden="true">*</span></label>
                <input
                  id="cp-subject"
                  type="text"
                  name="subject"
                  placeholder="Product inquiry, quotation…"
                  className={fieldErrors.subject ? 'cf-input-err' : ''}
                  onChange={() => clearField('subject')}
                />
                {fieldErrors.subject && <span className="cf-field-error">{fieldErrors.subject}</span>}
              </div>
            </div>

            <div className="cf-field">
              <label htmlFor="cp-message">Message <span aria-hidden="true">*</span></label>
              <textarea
                id="cp-message"
                name="message"
                placeholder="Describe your requirement or question…"
                rows={4}
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
    </div>
  );
}
