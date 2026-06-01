"use client";

import React, { useEffect, useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Animate";
import { serviceService } from "@/services/service.service";
import { BrandPolicy } from "@/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const INTER = "'Inter', sans-serif";
const IVORY = "#f7f4ef";
const GOLD  = "#b8956a";
const GOLD2 = "#d4b48a";
const INK   = "#0e0d0b";

const STATS = [
  { num: "100%", label: "Natural fibre" },
  { num: "∞",    label: "Lifetime pledge" },
  { num: "01",   label: "Artisan per piece" },
];

export const CraftedForInfinity: React.FC = () => {
  const [policies, setPolicies] = useState<BrandPolicy[]>([]);

  useEffect(() => {
    serviceService.getBrandPolicies().then(setPolicies).catch(console.error);
  }, []);

  return (
    <section
      style={{
        width: "100%",
        background: INK,
        padding: "clamp(3.5rem, 10vw, 6rem) clamp(1.25rem, 5vw, 3rem)",
        borderTop: "0.5px solid rgba(14,13,11,0.06)",
      }}
    >
      <style>{`
        .cfi-split {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          padding-bottom: 36px;
          border-bottom: 0.5px solid rgba(184,149,106,0.15);
          margin-bottom: 36px;
        }
        .cfi-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0;
        }
        .cfi-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
        }
        .cfi-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }
        .cfi-eyebrow-line {
          display: none !important;
        }
        .cfi-stats-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          width: 100%;
          padding-top: 24px;
          border-top: 0.5px solid rgba(184,149,106,0.15);
        }
        .cfi-stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 12px 6px;
          background: rgba(255,255,255,0.02);
          border: 0.5px solid rgba(184,149,106,0.09);
          border-radius: 4px;
        }
        .cfi-stat-num {
          font-family: 'Inter', sans-serif;
          font-size: 24px;
          font-weight: 300;
          color: #d4b48a;
          line-height: 1.1;
        }
        .cfi-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 8px;
          font-weight: 200;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(247,244,239,0.35);
          margin-top: 4px;
          line-height: 1.3;
        }
        .cfi-policies {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        .cfi-policy-card {
          padding: 28px 0;
          border-bottom: 0.5px solid rgba(184,149,106,0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0;
        }
        .cfi-policy-card:last-child {
          border-bottom: none;
        }
        @media (min-width: 768px) {
          .cfi-split {
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            padding-bottom: 56px;
            margin-bottom: 56px;
          }
          .cfi-left {
            align-items: flex-start;
            text-align: left;
          }
          .cfi-right {
            align-items: flex-start;
            text-align: left;
            gap: 20px;
          }
          .cfi-eyebrow {
            justify-content: flex-start;
          }
          .cfi-eyebrow-line {
            display: block !important;
          }
          .cfi-stats-container {
            display: flex;
            gap: 32px;
            padding-top: 20px;
            background: transparent;
            border: none;
            border-top: 0.5px solid rgba(184,149,106,0.15);
          }
          .cfi-stat-item {
            padding: 0;
            background: transparent;
            border: none;
            align-items: flex-start;
            text-align: left;
            justify-content: flex-start;
          }
          .cfi-stat-num {
            font-size: 28px;
          }
          .cfi-stat-label {
            font-size: 9px;
            letter-spacing: 0.38em;
            margin-top: 0;
          }
          .cfi-policies {
            grid-template-columns: repeat(3, 1fr);
          }
          .cfi-policy-card {
            padding: 32px 36px;
            border-bottom: none;
            border-right: 0.5px solid rgba(184,149,106,0.1);
            align-items: flex-start;
            text-align: left;
          }
          .cfi-policy-card:first-child {
            padding-left: 0;
          }
          .cfi-policy-card:last-child {
            padding-right: 0;
            border-right: none;
          }
        }
      `}</style>

      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* ── Top: editorial split ── */}
        <FadeIn direction="up" delay={0.1}>
          <div className="cfi-split">
            {/* Left — heading */}
            <div className="cfi-left">
              <span
                style={{
                  fontFamily: INTER,
                  fontSize: 10,
                  fontWeight: 200,
                  letterSpacing: "0.52em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginBottom: 20,
                }}
                className="cfi-eyebrow"
              >
                <span className="cfi-eyebrow-line" style={{ display: "block", width: 28, height: "0.5px", background: GOLD }} />
                The Moxy Standard
              </span>

              <h2
                style={{
                  fontFamily: INTER,
                  fontSize: "clamp(36px, 5vw, 58px)",
                  fontWeight: 300,
                  lineHeight: 0.92,
                  letterSpacing: "0.01em",
                  color: IVORY,
                }}
              >
                crafted<br />
                for{" "}
                <em style={{ fontStyle: "italic", color: GOLD2 }}>infinity</em>
              </h2>
            </div>

            {/* Right — body + stats */}
            <div className="cfi-right">
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: 13,
                  fontWeight: 200,
                  lineHeight: 1.95,
                  color: "rgba(247,244,239,0.42)",
                }}
              >
                Every piece we construct is designed to transcend seasons and lifetimes — crafted with bespoke precision using pure natural yarns and hand-finished details that endure through generations.
              </p>

              {/* Stats */}
              <div className="cfi-stats-container">
                {STATS.map((s) => (
                  <div key={s.label} className="cfi-stat-item">
                    <span className="cfi-stat-num">
                      {s.num}
                    </span>
                    <span className="cfi-stat-label">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Policies grid ── */}
        {policies.length > 0 && (
          <Stagger staggerChildren={0.12} className="w-full">
            <div className="cfi-policies">
              {policies.map((policy, i) => (
                <StaggerItem key={policy.title}>
                  <div className="cfi-policy-card">
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 10,
                        fontWeight: 200,
                        letterSpacing: "0.42em",
                        color: "rgba(184,149,106,0.5)",
                        marginBottom: 16,
                      }}
                    >
                      0{i + 1}
                    </span>

                    <p
                      style={{
                        fontFamily: INTER,
                        fontSize: 22,
                        fontWeight: 400,
                        color: IVORY,
                        lineHeight: 1.15,
                        marginBottom: 14,
                      }}
                    >
                      {policy.title}
                    </p>

                    <p
                      style={{
                        fontFamily: INTER,
                        fontSize: 12,
                        fontWeight: 200,
                        lineHeight: 1.95,
                        color: "rgba(247,244,239,0.38)",
                        flex: 1,
                        marginBottom: 20,
                      }}
                    >
                      {policy.description}
                    </p>

                    <Link
                      href="/about"
                      style={{
                        fontFamily: INTER,
                        fontSize: 10,
                        fontWeight: 300,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: GOLD,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        textDecoration: "none",
                      }}
                    >
                      Learn more
                      <ArrowRight size={13} strokeWidth={1.3} />
                    </Link>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        )}
      </div>
    </section>
  );
};
