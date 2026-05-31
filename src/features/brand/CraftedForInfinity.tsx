"use client";

// Design A — Dark Prestige
import React from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Animate";
import { BRAND_POLICIES } from "@/constants";
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
  return (
    <section
      style={{
        width: "100%",
        background: INK,
        padding: "96px 48px",
        borderTop: "0.5px solid rgba(14,13,11,0.06)",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* ── Top: editorial split ── */}
        <FadeIn direction="up" delay={0.1}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "end",
              paddingBottom: 56,
              borderBottom: "0.5px solid rgba(184,149,106,0.15)",
              marginBottom: 56,
            }}
          >
            {/* Left — heading */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <span
                style={{
                  fontFamily: INTER,
                  fontSize: 10,
                  fontWeight: 200,
                  letterSpacing: "0.52em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <span style={{ display: "block", width: 28, height: "0.5px", background: GOLD }} />
                The Moxy Standard
              </span>

              <h2
                style={{
                  fontFamily: INTER,
                  fontSize: "clamp(44px, 5vw, 58px)",
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
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 20 }}>
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
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  paddingTop: 20,
                  borderTop: "0.5px solid rgba(184,149,106,0.15)",
                }}
              >
                {STATS.map((s) => (
                  <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 28,
                        fontWeight: 300,
                        color: GOLD2,
                      }}
                    >
                      {s.num}
                    </span>
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 9,
                        fontWeight: 200,
                        letterSpacing: "0.38em",
                        textTransform: "uppercase",
                        color: "rgba(247,244,239,0.28)",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Policies grid ── */}
        <Stagger staggerChildren={0.12} className="w-full">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
            {BRAND_POLICIES.map((policy, i) => (
              <StaggerItem key={policy.title}>
                <div
                  style={{
                    padding: `32px ${i < 2 ? "36px" : "0"} 32px ${i > 0 ? "36px" : "0"}`,
                    borderRight: i < 2 ? "0.5px solid rgba(184,149,106,0.1)" : "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                  }}
                >
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
      </div>
    </section>
  );
};
