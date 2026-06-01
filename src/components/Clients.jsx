import React from 'react';

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

export default function Clients() {
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

        <div className="clients-grid">
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
      </div>
    </section>
  );
}
