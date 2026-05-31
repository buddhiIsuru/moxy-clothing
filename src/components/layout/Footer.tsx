"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navigationService, FooterSection } from "@/services/navigation.service";
import logoImage from "@/assets/logo/black (1).png";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [visible, setVisible] = useState(false);
  const [sections, setSections] = useState<FooterSection[]>([]);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);

    // Fetch links asynchronously from the service layer
    navigationService.getFooterSections().then(setSections).catch(console.error);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .moxy-footer {
          --gold: #B8A07A;
          --gold-dim: #9C8760;
          --ink: #1A1714;
          --mist: #8A8279;
          --cream: #F5F1EA;
          --rule: rgba(26,23,20,0.10);
          font-family: 'Inter', sans-serif;
        }

        .moxy-footer * { box-sizing: border-box; margin: 0; padding: 0; }

        .moxy-footer__inner {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .moxy-footer__inner.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Staggered children */
        .moxy-footer__inner > * {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .moxy-footer__inner.is-visible > *:nth-child(1) { opacity:1; transform:none; transition-delay:0.05s; }
        .moxy-footer__inner.is-visible > *:nth-child(2) { opacity:1; transform:none; transition-delay:0.15s; }
        .moxy-footer__inner.is-visible > *:nth-child(3) { opacity:1; transform:none; transition-delay:0.25s; }
        .moxy-footer__inner.is-visible > *:nth-child(4) { opacity:1; transform:none; transition-delay:0.35s; }

        .moxy-footer__tagline {
          font-family: 'Inter', sans-serif;
          font-style: italic;
          font-weight: 300;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
          color: var(--gold);
          margin-top: 0.75rem;
        }

        .moxy-footer__grid {
          display: grid;
          grid-template-columns: 1fr 1px 1fr 1px 1fr;
          gap: 0;
        }

        @media (max-width: 720px) {
          .moxy-footer__grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .moxy-footer__divider-col { display: none; }
        }

        .moxy-footer__divider-col {
          background: var(--rule);
          width: 1px;
          align-self: stretch;
        }

        .moxy-footer__col {
          padding: 0 2.5rem;
        }
        .moxy-footer__col:first-child { padding-left: 0; }
        .moxy-footer__col:last-child  { padding-right: 0; }

        @media (max-width: 720px) {
          .moxy-footer__col {
            padding: 0;
            border-top: 1px solid var(--rule);
            padding-top: 2rem;
            margin-top: 2rem;
          }
          .moxy-footer__col:first-child { border-top: none; padding-top: 0; margin-top: 0; }
        }

        .moxy-footer__col-title {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1.5rem;
        }

        .moxy-footer__link {
          display: block;
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: 1.05rem;
          letter-spacing: 0.04em;
          color: var(--mist);
          text-decoration: none;
          padding: 0.3rem 0;
          position: relative;
          transition: color 0.3s ease;
        }
        .moxy-footer__link::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0;
          height: 1px;
          width: 0;
          background: var(--gold);
          transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .moxy-footer__link:hover { color: var(--ink); }
        .moxy-footer__link:hover::after { width: 100%; }

        .moxy-footer__rule {
          border: none;
          border-top: 1px solid var(--rule);
        }

        .moxy-footer__bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .moxy-footer__legal {
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--mist);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        a.moxy-footer__legal:hover { color: var(--gold); }

        .moxy-footer__legal-links {
          display: flex;
          gap: 2rem;
        }

        .moxy-footer__ornament {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--gold-dim);
        }
        .moxy-footer__ornament-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--gold-dim) 30%, var(--gold-dim) 70%, transparent);
          min-width: 60px;
        }
        .moxy-footer__ornament-diamond {
          width: 5px;
          height: 5px;
          border: 1px solid var(--gold-dim);
          transform: rotate(45deg);
          flex-shrink: 0;
        }
      `}</style>

      <footer
        ref={ref}
        className="moxy-footer"
        style={{ background: "var(--cream, #F5F1EA)", padding: "5rem 0 3rem" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 3rem" }}>
          <div className={`moxy-footer__inner${visible ? " is-visible" : ""}`}>

            {/* Wordmark block */}
            <div style={{ marginBottom: "4rem",textAlign: "center" }}>
              <Image
                src={logoImage}
                alt="Moxy Logo"
                // height={200}
                style={{
                  height: "200px",
                  width: "auto",
                  objectFit: "contain",
                  marginBottom: "1rem",
                }}
              />
            </div>

            {/* Ornamental rule */}
            <div className="moxy-footer__ornament" style={{ marginBottom: "4rem" }}>
              <div className="moxy-footer__ornament-line" />
              <div className="moxy-footer__ornament-diamond" />
              <div className="moxy-footer__ornament-line" />
            </div>

            {/* Link columns */}
            <div className="moxy-footer__grid" style={{ marginBottom: "4.5rem" }}>
              {sections.map((section, i) => (
                <React.Fragment key={section.title}>
                  {i > 0 && <div className="moxy-footer__divider-col" aria-hidden="true" />}
                  <div className="moxy-footer__col">
                    <p className="moxy-footer__col-title">{section.title}</p>
                    <nav>
                      {section.links.map((link) => (
                        <Link key={link.label} href={link.href} className="moxy-footer__link">
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Bottom bar */}
            <hr className="moxy-footer__rule" style={{ marginBottom: "2rem" }} />
            <div className="moxy-footer__bottom">
              <span className="moxy-footer__legal">
                © {currentYear} Moxy Clothing. All rights reserved.
              </span>
              <div className="moxy-footer__legal-links">
                <Link href="#privacy" className="moxy-footer__legal">
                  Privacy Policy
                </Link>
                <Link href="#terms" className="moxy-footer__legal">
                  Terms of Service
                </Link>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </>
  );
};
