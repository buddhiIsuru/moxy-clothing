"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo/black (1).png"; // swap path to your logo asset

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface LoadingPageProps {
  /** Called when the exit animation finishes — unmount / hide the loader */
  onComplete?: () => void;
  /** Duration in ms before exit begins. Default 3 200 */
  duration?: number;
}

// ─────────────────────────────────────────────────────────────
// PARTICLES
// ─────────────────────────────────────────────────────────────

interface Particle {
  id: number;
  left: number;
  bottom: number;
  size: number;
  animDuration: number;
  animDelay: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    bottom: Math.random() * 20,
    size: Math.random() * 2 + 1,
    animDuration: 6 + Math.random() * 10,
    animDelay: Math.random() * 4,
  }));
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export const Loading: React.FC<LoadingPageProps> = ({
  onComplete,
  duration = 3200,
}) => {
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setParticles(generateParticles(28));
  }, []);

  // ── Percentage counter ──────────────────────────────────────
  useEffect(() => {
    const startTime = performance.now() + 800;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / duration, 1);
      setPercent(Math.round(easeOut(progress) * 100));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [duration]);

  // ── Trigger exit ────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setExiting(true), duration + 800 + 200);
    return () => clearTimeout(t);
  }, [duration]);

  // ── Notify parent after exit animation ──────────────────────
  const handleExitComplete = () => { onComplete?.(); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;1,200&family=Inter:wght@300;400;500&display=swap');

        .ld-grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.06'/%3E%3C/svg%3E");
          background-repeat: repeat;
        }

        .ld-glow {
          position: fixed; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(184,160,122,.10) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%,-50%);
          z-index: 0; pointer-events: none;
          animation: ld-glow-pulse 4s ease-in-out infinite;
        }
        @keyframes ld-glow-pulse {
          0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.6}
          50%{transform:translate(-50%,-50%) scale(1.15);opacity:1}
        }

        /* Frame */
        .ld-frame { position: fixed; inset: 18px; z-index: 5; pointer-events: none; border: 0.5px solid rgba(255,255,255,.06); }
        .ld-corner { position: absolute; width: 22px; height: 22px; }
        .ld-c-tl { top:-1px;left:-1px;  border-top:1px solid rgba(184,160,122,.5); border-left:1px solid rgba(184,160,122,.5); }
        .ld-c-tr { top:-1px;right:-1px; border-top:1px solid rgba(184,160,122,.5); border-right:1px solid rgba(184,160,122,.5); }
        .ld-c-bl { bottom:-1px;left:-1px;  border-bottom:1px solid rgba(184,160,122,.5); border-left:1px solid rgba(184,160,122,.5); }
        .ld-c-br { bottom:-1px;right:-1px; border-bottom:1px solid rgba(184,160,122,.5); border-right:1px solid rgba(184,160,122,.5); }

        /* Logo wordmark */
        .ld-wordmark {
          font-family: 'Cormorant Garamond', serif; font-weight: 200;
          font-size: clamp(4rem, 10vw, 7rem); letter-spacing: .62em; text-indent: .62em;
          color: #FFFFFF; line-height: 1; position: relative; overflow: hidden;
        }
        .ld-wordmark::after {
          content: ''; position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
          transform: skewX(-15deg);
          animation: ld-shimmer 3.2s 1.6s ease-in-out infinite;
        }
        @keyframes ld-shimmer {
          0%{left:-60%;opacity:0} 10%{opacity:1} 100%{left:160%;opacity:0}
        }

        /* Ornament */
        .ld-orn-dia {
          width: 7px; height: 7px;
          border: 1px solid rgba(184,160,122,.7); transform: rotate(45deg);
          flex-shrink: 0;
          animation: ld-spin 6s linear infinite;
        }
        @keyframes ld-spin { 0%{transform:rotate(45deg)} 100%{transform:rotate(405deg)} }

        /* Side labels */
        .ld-side { position: fixed; font-family:'Inter',sans-serif; font-size:8.5px; font-weight:400; letter-spacing:.34em; text-transform:uppercase; color:rgba(255,255,255,.20); z-index:10; }
        .ld-side-l { left:32px; bottom:80px; writing-mode:vertical-rl; transform:rotate(180deg); }
        .ld-side-r { right:32px; top:50%; transform:translateY(-50%); writing-mode:vertical-rl; }

        /* Particle */
        .ld-dot {
          position: absolute; border-radius: 50%;
          background: rgba(184,160,122,.55);
          animation: ld-float linear infinite;
        }
        @keyframes ld-float {
          0%{opacity:0;transform:translateY(0)} 10%{opacity:1} 90%{opacity:.4} 100%{opacity:0;transform:translateY(-100vh)}
        }

        /* Progress */
        .ld-progress-fill {
          height: 100%;
          background: linear-gradient(to right, transparent, #B8A07A 40%, rgba(184,160,122,.4));
          transition: width 50ms linear;
        }
      `}</style>

      <AnimatePresence onExitComplete={handleExitComplete}>
        {!exiting && (
          <motion.div
            key="loader"
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              background: "#0C0A09", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              overflow: "hidden",
            }}
            exit={{ scaleY: 1 }} // handled by child reveal div
          >
            {/* Grain */}
            <div className="ld-grain" aria-hidden="true" />

            {/* Glow */}
            <div className="ld-glow" aria-hidden="true" />

            {/* Frame */}
            <div className="ld-frame" aria-hidden="true">
              <div className="ld-corner ld-c-tl" />
              <div className="ld-corner ld-c-tr" />
              <div className="ld-corner ld-c-bl" />
              <div className="ld-corner ld-c-br" />
            </div>

            {/* Particles */}
            <div suppressHydrationWarning style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none", overflow: "hidden" }} aria-hidden="true">
              {particles.map((p) => (
                <div
                  suppressHydrationWarning
                  key={p.id}
                  className="ld-dot"
                  style={{
                    left: `${p.left}%`,
                    bottom: `${p.bottom}%`,
                    width: p.size,
                    height: p.size,
                    animationDuration: `${p.animDuration}s`,
                    animationDelay: `${p.animDelay}s`,
                    opacity: 0,
                  }}
                />
              ))}
            </div>

            {/* Side labels */}
            <motion.p
              className="ld-side ld-side-l"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.6, duration: 0.9 } }}
              aria-hidden="true"
            >
              Maison Atelier — 2026
            </motion.p>
            <motion.p
              className="ld-side ld-side-r"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.7, duration: 0.9 } }}
              aria-hidden="true"
            >
              Luxury Fashion House
            </motion.p>

            {/* ── Centre stage ── */}
            <main
              style={{
                position: "relative", zIndex: 10,
                display: "flex", flexDirection: "column",
                alignItems: "center", flex: 1, justifyContent: "center",
              }}
              aria-label="Loading MOXY"
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: 0.5, duration: 1.4, ease: [0.22, 1, 0.36, 1] } }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                {/* Logo image — visible on light bg; invert for dark */}
                <div style={{ position: "relative", width: "clamp(100px, 18vw, 180px)", marginBottom: 28 }}>
                  <Image
                    src={logo}
                    alt="MOXY"
                    width={250}
                    height={80}
                    style={{ objectFit: "contain", filter: "invert(1) brightness(1)", width: "100%", height: "auto" }}
                    priority
                  />
                </div>

                {/* Fallback / supplementary wordmark */}
                {/* <h1 className="ld-wordmark" aria-hidden="true">MOXY</h1> */}

                {/* Ornament */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 1.2, duration: 0.9 } }}
                  style={{ display: "flex", alignItems: "center", gap: 12, width: "clamp(180px, 28vw, 300px)", marginTop: 20, marginBottom: 18 }}
                  aria-hidden="true"
                >
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(184,160,122,.55))" }} />
                  <div className="ld-orn-dia" />
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(184,160,122,.55))" }} />
                </motion.div>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 1.4, duration: 0.9 } }}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 9, fontWeight: 400, letterSpacing: ".38em", textTransform: "uppercase",
                    color: "rgba(255,255,255,.38)",
                  }}
                >
                  Luxury Fashion House
                </motion.p>
              </motion.div>
            </main>

            {/* ── Progress bar + bottom strip ── */}
            <div
              style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 20 }}
              aria-hidden="true"
            >
              <div
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 32px",
                  background: "rgba(255,255,255,.02)", borderTop: "0.5px solid rgba(255,255,255,.05)",
                }}
              >
                <motion.span
                  initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.9, duration: 0.8 } }}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, fontWeight: 400, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.22)" }}
                >
                  Loading Collection
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.9, duration: 0.8 } }}
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1rem", letterSpacing: ".08em", color: "rgba(184,160,122,.65)", minWidth: 40, textAlign: "right" }}
                >
                  {percent}%
                </motion.span>
              </div>
              <div style={{ width: "100%", height: 1.5, background: "rgba(255,255,255,.06)" }}>
                <div className="ld-progress-fill" style={{ width: `${percent}%` }} />
              </div>
            </div>

            {/* ── Exit reveal curtain ── */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: exiting ? 1 : 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed", inset: 0, zIndex: 50,
                background: "#F2EDE5",
                transformOrigin: "bottom",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─────────────────────────────────────────────────────────────
// USAGE IN layout.tsx / page.tsx
// ─────────────────────────────────────────────────────────────
//
// "use client";
// import { useState } from "react";
// import { LoadingPage } from "@/components/LoadingPage";
//
// export default function RootLayout({ children }) {
//   const [loaded, setLoaded] = useState(false);
//   return (
//     <>
//       {!loaded && <LoadingPage onComplete={() => setLoaded(true)} />}
//       {children}
//     </>
//   );
// }

export default Loading;