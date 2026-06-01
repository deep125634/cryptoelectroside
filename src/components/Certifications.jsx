import React from 'react';

const certs = [
  { name: 'ISO 9001-2015',       logo: '/images/certs/iso.svg'        },
  { name: 'CE Certified',        logo: '/images/certs/ce.svg'         },
  { name: 'FCC Compliant',       logo: '/images/certs/fcc.png'        },
  { name: 'RoHS Compliant',      logo: '/images/certs/rohs.png'       },
  { name: 'MSME Registered',     logo: '/images/certs/msme.png'       },
  { name: 'Import Export Code',  logo: '/images/certs/iec.svg'        },
  { name: 'Trust Seal Verified', logo: '/images/certs/trustseal.png'  },
  { name: 'IndiaMART Member',    logo: '/images/certs/indiamart.png'  },
];

export default function Certifications() {
  return (
    <section className="certs circuit-bg" id="certifications">
      <div className="container">
        <div className="certs-grid">
          <div className="reveal">
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              ▍ Quality &amp; Trust
            </div>
            <h3>
              Certified.<br />
              Compliant. <em>Trusted.</em>
            </h3>
            <p
              style={{
                marginTop: 18,
                color: 'var(--ink-mute)',
                fontSize: 15,
                lineHeight: 1.6,
                maxWidth: 360,
              }}
            >
              Every Crypto Electrosystem product meets stringent international
              and Indian quality standards. Look for these marks on our
              packaging and documentation.
            </p>
          </div>

          <div className="cert-list reveal">
            {certs.map((c) => (
              <div className="cert-badge" key={c.name}>
                <div className="cert-logo-wrap">
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="cert-logo"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="cert-icon-fallback" style={{ display: 'none' }}>
                    {c.name.slice(0, 3).toUpperCase()}
                  </div>
                </div>
                <div className="name">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
