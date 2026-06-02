import React, { useEffect, useRef, useState } from 'react';

/* ────────────────────────────────────────────────────────────
   Self-contained FAQ chatbot. No API calls. Keyword routing
   against a curated knowledge base of product / contact /
   location / quote / company intents.
   ──────────────────────────────────────────────────────────── */

const QUICK_REPLIES_DEFAULT = [
  { label: 'Products',     query: 'products' },
  { label: 'Contact',      query: 'contact' },
  { label: 'Location',     query: 'where are you located' },
  { label: 'Get a quote',  query: 'how do i get a quote' },
];

const INTENTS = [
  {
    name: 'greeting',
    match: (t) => /\b(hi|hello|hey|hii|hola|namaste|good (morning|afternoon|evening))\b/i.test(t),
    reply: () =>
      "Hi there! I'm the Crypto Assistant. I can help with our products, contact info, location, or sending a quote request. What would you like to know?",
    quick: QUICK_REPLIES_DEFAULT,
  },
  {
    name: 'products-overview',
    match: (t) => /\b(product|catalog|catalogue|range|what.*sell|what.*make|what.*offer)\b/i.test(t),
    reply: () =>
      "We make 20+ industrial electrical products across 5 categories: Single Phase, Three Phase, Two Phase, Mobile/Smart, and Control Panels — including motor starters, water-level controllers, ELCB/MCB, timers, auto switches, phase changers, and submersible panels. Which category interests you?",
    quick: [
      { label: 'Single Phase',  query: 'single phase products' },
      { label: 'Three Phase',   query: 'three phase products' },
      { label: 'Mobile / Smart', query: 'mobile smart products' },
      { label: 'Control Panels', query: 'control panel products' },
    ],
  },
  {
    name: 'cat-single',
    match: (t) => /\bsingle\s*phase\b/i.test(t),
    reply: () =>
      "Single Phase line: A.C. Motor Starter (simple & digital), Water Level Controller, Monoblock Starter with WLC, Simple WLC with S1S2+C1C2, Digital Starter & WLC, ELCB+MCB, Auto Switch, and Submersible Control Panel with LLC. Want details on one of these?",
    quick: QUICK_REPLIES_DEFAULT,
  },
  {
    name: 'cat-three',
    match: (t) => /\bthree\s*phase\b|\b3\s*phase\b/i.test(t),
    reply: () =>
      "Three Phase line: Starter & Water Level Controller, ELCB+MCB / MCCB+RCCB, DOL Starter, DOL/SEMI Auto Switch (with optional timer), and Phase Changer & OVP. Tell me which one to dig into.",
    quick: QUICK_REPLIES_DEFAULT,
  },
  {
    name: 'cat-two',
    match: (t) => /\btwo\s*phase\b|\b2\s*phase\b/i.test(t),
    reply: () =>
      "Two Phase: Two Phase Auto Switch (with S1S2 and S1S2+C1C2) — rated for 1 to 5 HP motors with 30-sec starting capacitor timing.",
    quick: QUICK_REPLIES_DEFAULT,
  },
  {
    name: 'cat-mobile',
    match: (t) => /\b(mobile|smart|gsm|app|sms|4g|2g)\b/i.test(t),
    reply: () =>
      "Mobile / Smart range: Mobile Auto Switch (GSM Note+ for 2G and 4G Note for 2G/3G/4G) and Digital Auto Switch (DAS-02 Volt-Amp, CES-001). Control your motors by call, SMS, or our mobile app.",
    quick: QUICK_REPLIES_DEFAULT,
  },
  {
    name: 'cat-panel',
    match: (t) => /\b(panel|control panel|submersible)\b/i.test(t),
    reply: () =>
      "Control Panels: Single Phase Panel with LLC (simple & digital), Smart Digital Submersible Control Panel, and our Submersible Control Panel series — MCB, Mk1 Contactor, PVC body, Openwell, and 3-Phase Heavy Starter variants.",
    quick: QUICK_REPLIES_DEFAULT,
  },
  {
    name: 'product-starter',
    match: (t) => /\b(motor starter|dol|starter)\b/i.test(t),
    reply: () =>
      "Our motor starters are micro-controller based with live voltage/ampere display in digital models, adjustable load range, and LED indication for low/high voltage and overload. Available as single-phase, three-phase DOL, and monoblock variants.",
    quick: QUICK_REPLIES_DEFAULT,
  },
  {
    name: 'product-wlc',
    match: (t) => /\b(water level|wlc|llc|tank)\b/i.test(t),
    reply: () =>
      "Water Level Controllers: two-tank and one-tank systems with S.S., T-Type, Carbon, or float-switch sensors. Available in Digital WLC, Half WLC, Simple WLC, and S1S2+C1C2 configurations — supports submersible and borewell pumps up to 5 HP.",
    quick: QUICK_REPLIES_DEFAULT,
  },
  {
    name: 'product-elcb',
    match: (t) => /\b(elcb|mcb|mccb|rccb|leakage|short circuit|earth)\b/i.test(t),
    reply: () =>
      "ELCB + MCB protection: self-testing switch, ISI-mark MCB, leakage current 3–100 mA adjustable, rated current up to 160 A (3-phase), <30 ms tripping. Available in single-phase and three-phase, with digital and modular variants.",
    quick: QUICK_REPLIES_DEFAULT,
  },
  {
    name: 'product-timer',
    match: (t) => /\b(timer|rtc|schedule|cyc)\b/i.test(t),
    reply: () =>
      "Digital Timer (1 & 3 phase): 4-digit 7-segment display, 1 to 16 ON/OFF time zones (RTC), 24 A load capacity. Ideal for street lights, garden lighting, motor control, and solar-panel cleaning systems.",
    quick: QUICK_REPLIES_DEFAULT,
  },
  {
    name: 'contact',
    match: (t) => /\b(contact|phone|call|number|reach|whatsapp|talk)\b/i.test(t),
    reply: () =>
      "You can reach us at:\n📞 +91 99091 36367\n📞 +91 70418 36367\n💬 WhatsApp: +91 99091 36367\nOr use the social menu in the bottom-right corner.",
    quick: [
      { label: 'Email us',  query: 'email' },
      { label: 'Location',  query: 'where are you located' },
      { label: 'Get a quote', query: 'how do i get a quote' },
    ],
  },
  {
    name: 'email',
    match: (t) => /\b(email|mail|e-mail)\b/i.test(t),
    reply: () =>
      "Our team emails:\n✉ cryptoelectrosystem@gmail.com (general)\n✉ salescryptoelectrosystem22@gmail.com (sales)\n✉ purchasecryptoelectrosystem@gmail.com (purchase)\n✉ info.cryptoelectrosystem@gmail.com (info)",
    quick: QUICK_REPLIES_DEFAULT,
  },
  {
    name: 'location',
    match: (t) => /\b(location|address|where|located|directions|map|find|visit|office|factory)\b/i.test(t),
    reply: () =>
      "📍 25, Satadhar Industrial Hub, B/H Gokul Industrial Park, Kathwada Singarwa Road, Kathwada, Ahmedabad — 382430, Gujarat, India.\nScroll to the footer to see us on Google Maps.",
    quick: QUICK_REPLIES_DEFAULT,
  },
  {
    name: 'hours',
    match: (t) => /\b(hour|timing|open|close|time|working)\b/i.test(t),
    reply: () =>
      "We're typically available Monday to Saturday during regular business hours (IST). For urgent queries please call +91 99091 36367 directly.",
    quick: QUICK_REPLIES_DEFAULT,
  },
  {
    name: 'quote',
    match: (t) => /\b(quote|quotation|price|cost|rate|buy|order|purchase|enquir|inquir)\b/i.test(t),
    reply: () =>
      "For a quote, email purchasecryptoelectrosystem@gmail.com or salescryptoelectrosystem22@gmail.com with your product, quantity, and any spec needs — or call +91 99091 36367. Mention the product variant (e.g. \"Digital DOL Starter, 3 HP\") and we'll respond fast.",
    quick: [
      { label: 'Email purchase', query: 'email' },
      { label: 'Call now',       query: 'contact' },
    ],
  },
  {
    name: 'about',
    match: (t) => /\b(about|company|who|founder|history|story|when.*started|founded)\b/i.test(t),
    reply: () =>
      "Crypto Electrosystem is an ISO 9001-2015 certified manufacturer of industrial electronic starters, controllers and protection systems. Founded in 2022 in Ahmedabad, Gujarat by Chirag Kachhadiya and Yagnik Gondaliya. Our mission: micro-controller-driven engineering, certified quality, trusted across India.",
    quick: QUICK_REPLIES_DEFAULT,
  },
  {
    name: 'iso',
    match: (t) => /\b(iso|certif|quality)\b/i.test(t),
    reply: () =>
      "Yes — we're ISO 9001:2015 certified. All our products are built to ISI-mark standards where applicable and pass our internal quality checks before shipment.",
    quick: QUICK_REPLIES_DEFAULT,
  },
  {
    name: 'thanks',
    match: (t) => /\b(thanks|thank you|thx|ty|cheers)\b/i.test(t),
    reply: () => "You're welcome! Is there anything else I can help with?",
    quick: QUICK_REPLIES_DEFAULT,
  },
  {
    name: 'bye',
    match: (t) => /\b(bye|goodbye|see you|cya|good night)\b/i.test(t),
    reply: () => "Goodbye! Have a great day. Reach out anytime — Be safe and secure.",
    quick: [],
  },
];

const FALLBACK = {
  reply:
    "I didn't quite catch that. I can help with our products, contact details, location, ISO certification, or a quote request. Try one of these:",
  quick: QUICK_REPLIES_DEFAULT,
};

function routeMessage(text) {
  const trimmed = (text || '').trim();
  if (!trimmed) return FALLBACK;
  const intent = INTENTS.find((i) => i.match(trimmed));
  if (intent) return { reply: intent.reply(), quick: intent.quick };
  return FALLBACK;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text:
        "👋 Hi! I'm the Crypto Assistant. Ask me about our products, contact details, or send me a topic below.",
      quick: QUICK_REPLIES_DEFAULT,
    },
  ]);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom on new messages / typing changes
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  // Focus the input when the panel opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 220);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const send = (raw) => {
    const text = (raw ?? input).trim();
    if (!text) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);

    const { reply, quick } = routeMessage(text);
    const delay = 420 + Math.min(reply.length * 6, 900);

    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: 'bot', text: reply, quick }]);
    }, delay);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send();
  };

  return (
    <div className={`chatbot${open ? ' is-open' : ''}`}>
      {/* Trigger */}
      <button
        type="button"
        className="chatbot-trigger"
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12a8 8 0 1 1-3.2-6.4L21 5l-1 3.4A8 8 0 0 1 21 12z" />
              <path d="M8 11h.01M12 11h.01M16 11h.01" />
            </svg>
            <span className="chatbot-trigger-dot" aria-hidden="true" />
          </>
        )}
      </button>

      {/* Panel */}
      <div
        className="chatbot-panel"
        role="dialog"
        aria-label="Crypto Assistant chat"
        aria-hidden={!open}
      >
        <header className="chatbot-header">
          <div className="chatbot-avatar" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a8 8 0 1 1-3.2-6.4L21 5l-1 3.4A8 8 0 0 1 21 12z" />
            </svg>
          </div>
          <div className="chatbot-header-info">
            <strong>Crypto Assistant</strong>
            <span><i /> Online · usually replies instantly</span>
          </div>
          <button
            type="button"
            className="chatbot-close"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="chatbot-messages" ref={listRef}>
          {messages.map((m, i) => (
            <div key={i} className={`chatbot-msg chatbot-msg--${m.role}`}>
              <div className="chatbot-bubble">
                {m.text.split('\n').map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
              {m.role === 'bot' && m.quick && m.quick.length > 0 && (
                <div className="chatbot-quickies">
                  {m.quick.map((q, j) => (
                    <button
                      key={j}
                      type="button"
                      className="chatbot-chip"
                      onClick={() => send(q.query)}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {typing && (
            <div className="chatbot-msg chatbot-msg--bot">
              <div className="chatbot-bubble chatbot-bubble--typing" aria-label="Assistant is typing">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        <form className="chatbot-input" onSubmit={onSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about products, location, quotes…"
            aria-label="Type a message"
            autoComplete="off"
          />
          <button
            type="submit"
            className="chatbot-send"
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
