"use client";

import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sections = [
  {
    number: "01",
    title: "Company\nOverview",
    body: "MOXY is a contemporary luxury clothing house building refined wardrobes across womenswear, menswear, and petite essentials. Our collections focus on considered silhouettes, premium textures, and pieces that move cleanly through daily life.",
  },
  {
    number: "02",
    title: "Brand\nStory",
    body: "The brand began with a simple idea: clothing should feel precise without feeling precious. Every season balances atelier-level finishing with wearable restraint, creating garments that feel modern now and relevant later.",
  },
  {
    number: "03",
    title: "Mission\n& Values",
    body: "We value longevity, responsible production, material honesty, and quiet confidence. Our mission is to design clothing with enough structure to endure and enough softness to become part of a real wardrobe.",
  },
];

const reviews = [
  {
    initials: "SL",
    text: '"Every piece I own from MOXY has outlasted trends and outperformed expectations. The construction is extraordinary — you feel the intention in every seam. This is the brand I return to when I want something that simply endures."',
    author: "Sophia Laurent",
    detail: "Verified · Womenswear",
  },
  {
    initials: "JM",
    text: '"I\'ve been dressing from MOXY for three seasons now. There\'s a discipline to the design — nothing superfluous, nothing missing. The tailoring sits between bespoke and ready-to-wear in a way I haven\'t found elsewhere."',
    author: "James Mercer",
    detail: "Verified · Menswear",
  },
  {
    initials: "AK",
    text: '"As someone who finds luxury fashion often performative, MOXY is a genuine relief. The petite line fits as though it was made for me. Quiet, considered, and worth every penny — this is what refined dressing should feel like."',
    author: "Anika Krishnan",
    detail: "Verified · Petite Essentials",
  },
  {
    initials: "CM",
    text: '"I bought a single coat from MOXY two years ago and it remains the most commented-on piece in my wardrobe. The material ages beautifully. It doesn\'t shout — it simply holds its presence. That\'s a rare thing in fashion today."',
    author: "Claire Montague",
    detail: "Verified · Womenswear",
  },
];

export default function AboutPage() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const go = (n: number) => {
    setCurrent((n + reviews.length) % reviews.length);
  };

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${current * 100}%)`;
    }
  }, [current]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? current + 1 : current - 1);
  };

  return (
    <div
      className="min-h-screen font-sans flex flex-col justify-between"
      style={{ background: "#F8F7F4", color: "#1a1916", fontFamily: "'Inter', sans-serif" }}
    >
      <Navbar />

      <main className="flex-1 w-full pt-16">
        {/* Hero */}
        <section
          className="relative"
          style={{
            padding: "72px 48px 64px",
            borderBottom: "1px solid rgba(26,25,22,.08)",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 48,
              width: 48,
              height: 1.5,
              background: "#b8925a",
            }}
          />
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#b8925a",
              marginBottom: 20,
              fontWeight: 500,
            }}
          >
            About Us
          </p>
          <h1
            style={{
              fontSize: "clamp(48px, 10vw, 96px)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "#1a1916",
            }}
          >
            MOXY
          </h1>
          <p
            style={{
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(26,25,22,.35)",
              marginTop: 14,
            }}
          >
            Contemporary Luxury Clothing House
          </p>
        </section>

        {/* Sections */}
        <div
          className="sections-wrap"
          style={{ padding: "0 48px" }}
        >
          {sections.map((s, i) => (
            <div
              key={s.number}
              className="section-item"
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                borderBottom: "1px solid rgba(26,25,22,.07)",
                padding: "52px 0",
                alignItems: "start",
                animationDelay: `${0.08 + i * 0.1}s`,
              }}
            >
              <div style={{ paddingRight: 40 }}>
                <p
                  style={{
                    fontSize: 10,
                    color: "rgba(26,25,22,.2)",
                    letterSpacing: "0.2em",
                    marginBottom: 14,
                    fontWeight: 400,
                    textTransform: "uppercase",
                  }}
                >
                  {s.number}
                </p>
                <h2
                  style={{
                    fontSize: "clamp(17px, 2.2vw, 24px)",
                    fontWeight: 300,
                    color: "#1a1916",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                    whiteSpace: "pre-line",
                  }}
                >
                  {s.title}
                </h2>
                <div
                  style={{
                    width: 24,
                    height: 1.5,
                    background: "#b8925a",
                    margin: "22px 0",
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.95,
                  color: "rgba(26,25,22,.52)",
                  fontWeight: 300,
                  maxWidth: 520,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <section
          style={{
            padding: "80px 48px",
            background: "#f2f0eb",
            borderTop: "1px solid rgba(26,25,22,.07)",
          }}
        >
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#b8925a",
              marginBottom: 14,
              fontWeight: 500,
            }}
          >
            Client Voices
          </p>
          <h2
            style={{
              fontSize: "clamp(22px, 4vw, 40px)",
              fontWeight: 300,
              color: "#1a1916",
              letterSpacing: "-0.02em",
              marginBottom: 52,
            }}
          >
            What our customers say
          </h2>

          {/* Slider */}
          <div
            style={{ overflow: "hidden" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={trackRef}
              style={{
                display: "flex",
                transition: "transform 0.5s cubic-bezier(.4,0,.2,1)",
              }}
            >
              {reviews.map((r) => (
                <div key={r.author} style={{ minWidth: "100%", padding: "0 2px" }}>
                  <div
                    style={{
                      border: "1px solid rgba(26,25,22,.09)",
                      padding: "44px 48px",
                      background: "#F8F7F4",
                      position: "relative",
                    }}
                  >
                    {/* Opening quote */}
                    <span
                      style={{
                        fontFamily: "Georgia, serif",
                        fontSize: 72,
                        color: "#b8925a",
                        opacity: 0.25,
                        position: "absolute",
                        top: 16,
                        left: 36,
                        lineHeight: 1,
                        pointerEvents: "none",
                      }}
                    >
                      &ldquo;
                    </span>
                    <p
                      style={{
                        fontSize: "clamp(14px, 1.8vw, 18px)",
                        fontWeight: 300,
                        lineHeight: 1.85,
                        color: "rgba(26,25,22,.65)",
                        marginBottom: 36,
                        paddingTop: 36,
                        fontStyle: "italic",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {r.text}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          border: "1px solid rgba(184,146,90,.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          letterSpacing: "0.1em",
                          color: "#b8925a",
                          fontWeight: 500,
                          flexShrink: 0,
                          background: "rgba(184,146,90,.06)",
                        }}
                      >
                        {r.initials}
                      </div>
                      <div>
                        <div style={{ display: "flex", gap: 3, marginBottom: 5 }}>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ color: "#b8925a", fontSize: 11 }}>★</span>
                          ))}
                        </div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: "#1a1916", letterSpacing: "0.02em" }}>
                          {r.author}
                        </p>
                        <p
                          style={{
                            fontSize: 11,
                            color: "rgba(26,25,22,.3)",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            marginTop: 3,
                          }}
                        >
                          {r.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
            <button
              onClick={() => go(current - 1)}
              aria-label="Previous"
              style={{
                width: 38,
                height: 38,
                border: "1px solid rgba(26,25,22,.15)",
                background: "transparent",
                color: "rgba(26,25,22,.45)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                fontFamily: "inherit",
                transition: "all .25s",
              }}
            >
              ←
            </button>
            <button
              onClick={() => go(current + 1)}
              aria-label="Next"
              style={{
                width: 38,
                height: 38,
                border: "1px solid rgba(26,25,22,.15)",
                background: "transparent",
                color: "rgba(26,25,22,.45)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                fontFamily: "inherit",
                transition: "all .25s",
              }}
            >
              →
            </button>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {reviews.map((_, i) => (
                <div
                  key={i}
                  onClick={() => go(i)}
                  style={{
                    height: 1.5,
                    width: i === current ? 32 : 18,
                    background: i === current ? "#b8925a" : "rgba(26,25,22,.15)",
                    cursor: "pointer",
                    transition: "all .3s",
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontSize: 11,
                color: "rgba(26,25,22,.25)",
                letterSpacing: "0.15em",
                marginLeft: "auto",
              }}
            >
              {current + 1} / {reviews.length}
            </span>
          </div>
        </section>

        {/* Footer Strip */}
        <div
          style={{
            padding: "28px 48px",
            borderTop: "1px solid rgba(26,25,22,.07)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(26,25,22,.25)",
              fontWeight: 400,
            }}
          >
            MOXY
          </span>
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(184,146,90,.5)",
            }}
          >
            Refined · Enduring · Considered
          </span>
        </div>
      </main>

      <Footer />

      {/* Responsive styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        @media (max-width: 640px) {
          .sections-wrap { padding: 0 24px !important; }
          .section-item {
            grid-template-columns: 1fr !important;
            padding: 36px 0 !important;
          }
          section:first-child { padding: 52px 24px 48px !important; }
          section:first-child > div[style*="position: absolute"] { left: 24px !important; }
        }

        @media (min-width: 641px) and (max-width: 900px) {
          .sections-wrap { padding: 0 36px !important; }
          .section-item { grid-template-columns: 160px 1fr !important; }
        }
      `}</style>
    </div>
  );
}