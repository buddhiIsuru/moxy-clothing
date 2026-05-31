"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navigationService } from "@/services/navigation.service";
import { Ornament } from "@/components/ui/Ornament";

interface HeroSlide {
  imageUrl: string | StaticImageData;
  eyebrow?: string;
  title: string;
  titleItalic?: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const AUTOPLAY_MS = 6000;
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0, fromY = 20) => ({
  initial:  { opacity: 0, y: fromY, filter: "blur(6px)" },
  animate:  { opacity: 1, y: 0,     filter: "blur(0px)",
              transition: { delay, duration: 1.0, ease } },
});

export const HeroSection: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startProgress = useCallback(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);
    const tick = 50;
    let elapsed = 0;
    progressRef.current = setInterval(() => {
      elapsed += tick;
      setProgress(Math.min((elapsed / AUTOPLAY_MS) * 100, 100));
    }, tick);
  }, []);

  const goTo = useCallback((n: number) => {
    if (slides.length === 0) return;
    const next = (n + slides.length) % slides.length;
    setActive(next);
    startProgress();
  }, [slides.length, startProgress]);

  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goTo(active + 1), AUTOPLAY_MS);
  }, [active, goTo]);

  useEffect(() => {
    // Fetch slides from navigationService
    navigationService.getHeroSlides()
      .then((data) => {
        setSlides(data);
        startProgress();
      })
      .catch(console.error);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [startProgress]);

  useEffect(() => {
    if (slides.length > 0) {
      resetAutoplay();
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [slides, resetAutoplay]);

  if (slides.length === 0) {
    return (
      <div style={{ height: "screen", background: "#0C0A09" }} className="w-full h-screen flex items-center justify-center">
        <div className="w-10 h-10 border border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const slide = slides[active];
  const padded = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <>
      <style>{`
        .hs {
          --gold:      #B8A07A;
          --gold-dim:  rgba(184,160,122,.40);
          --cream:     #F3EEE6;
          --ink:       #1A1714;
          font-family: 'Inter', sans-serif;
        }

        .hs-img-wrap {
          position: absolute; inset: -6%; z-index: 0;
          transition: transform 9s cubic-bezier(.22,1,.36,1);
          transform: scale(1);
        }
        .hs-img-wrap.zoomed { transform: scale(1.06); }

        .hs-frame {
          position: absolute; inset: 20px; z-index: 8;
          border: 0.5px solid rgba(255,255,255,.09);
          pointer-events: none;
        }
        .hs-corner {
          position: absolute; width: 20px; height: 20px;
        }
        .hs-corner-tl { top:-1px;left:-1px;   border-top:1px solid var(--gold);border-left:1px solid var(--gold) }
        .hs-corner-tr { top:-1px;right:-1px;  border-top:1px solid var(--gold);border-right:1px solid var(--gold) }
        .hs-corner-bl { bottom:-1px;left:-1px; border-bottom:1px solid var(--gold);border-left:1px solid var(--gold) }
        .hs-corner-br { bottom:-1px;right:-1px;border-bottom:1px solid var(--gold);border-right:1px solid var(--gold) }

        .hs-side-label {
          position: absolute; left: 32px; bottom: 52px; z-index: 20;
          writing-mode: vertical-rl; transform: rotate(180deg);
          font-family: 'Inter', sans-serif;
          font-size: 9px; font-weight: 400; letter-spacing: .36em; text-transform: uppercase;
          color: rgba(255,255,255,.28);
        }

        .hs-counter {
          position: absolute; right: 36px; top: 50%; transform: translateY(-50%);
          z-index: 20; display: flex; flex-direction: column; align-items: center; gap: 10px;
        }
        .hs-counter-cur {
          font-family: 'Inter', sans-serif; font-weight: 200; font-size: 32px;
          color: rgba(255,255,255,.85); line-height: 1;
        }
        .hs-counter-line { width: 1px; height: 28px; background: rgba(184,160,122,.35); }
        .hs-counter-tot  {
          font-family: 'Inter', sans-serif; font-weight: 200; font-size: 16px;
          color: rgba(255,255,255,.28); line-height: 1;
        }

        .hs-eyebrow {
          display: flex; align-items: center; gap: 14px; margin-bottom: 20px;
        }
        .hs-eyebrow-line { width: 28px; height: 1px; background: var(--gold); flex-shrink: 0; }
        .hs-eyebrow-text {
          font-family: 'Inter', sans-serif;
          font-size: 9px; font-weight: 500; letter-spacing: .32em; text-transform: uppercase;
          color: rgba(255,255,255,.5);
        }

        .hs-title {
          font-family: 'Inter', sans-serif; font-weight: 200;
          font-size: clamp(3rem, 7vw, 5.5rem);
          letter-spacing: -.015em; line-height: 1.0;
          color: #FFFFFF;
        }
        .hs-title-italic {
          font-family: 'Inter', sans-serif; font-style: italic; font-weight: 200;
          font-size: clamp(1.2rem, 2.5vw, 1.7rem);
          color: rgba(255,255,255,.55); display: block;
          letter-spacing: .01em; margin-top: 4px;
        }

        .hs-desc {
          font-family: 'Inter', sans-serif; font-weight: 300;
          font-size: 13.5px; line-height: 1.85;
          color: rgba(255,255,255,.48); max-width: 360px;
        }

        .hs-btn-primary {
          position: relative; overflow: hidden;
          font-family: 'Inter', sans-serif;
          font-size: 9.5px; font-weight: 500; letter-spacing: .3em; text-transform: uppercase;
          color: var(--ink); background: rgba(243,238,230,.95);
          border: none; padding: 17px 38px; cursor: pointer;
          text-decoration: none; display: inline-flex; align-items: center; gap: 14px;
          transition: color .65s cubic-bezier(.22,1,.36,1);
        }
        .hs-btn-primary::before {
          content: ''; position: absolute; inset: 0;
          background: var(--ink);
          transform: scaleX(0); transform-origin: left;
          transition: transform .65s cubic-bezier(.22,1,.36,1);
        }
        .hs-btn-primary:hover { color: rgba(243,238,230,.95); }
        .hs-btn-primary:hover::before { transform: scaleX(1); }
        .hs-btn-primary > * { position: relative; z-index: 1; }

        .hs-shimmer {
          position: absolute; top: 0; left: -80%; width: 48%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent);
          transform: skewX(-18deg); pointer-events: none; z-index: 2;
          animation: hs-shimmer 3.5s 1.2s ease-in-out infinite;
        }
        @keyframes hs-shimmer {
          0%   { left: -80%; }
          100% { left: 160%; }
        }

        .hs-btn-ghost {
          font-family: 'Inter', sans-serif;
          font-size: 9.5px; font-weight: 400; letter-spacing: .3em; text-transform: uppercase;
          color: rgba(255,255,255,.5); background: transparent; border: none;
          padding-bottom: 4px; border-bottom: 1px solid rgba(255,255,255,.18);
          cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 10px;
          transition: color .3s, border-color .3s;
        }
        .hs-btn-ghost:hover { color: rgba(255,255,255,.9); border-color: rgba(184,160,122,.55); }

        .hs-ctrl-btn {
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,.06);
          border: 0.5px solid rgba(255,255,255,.12);
          color: rgba(255,255,255,.65); cursor: pointer;
          transition: background .3s, color .3s, border-color .3s;
        }
        .hs-ctrl-btn:hover {
          background: rgba(255,255,255,.14); color: #fff;
          border-color: rgba(184,160,122,.45);
        }

        .hs-dot {
          height: 1.5px; background: rgba(255,255,255,.22);
          cursor: pointer; border: none;
          transition: width .4s cubic-bezier(.22,1,.36,1), background .4s;
        }
        .hs-dot.active { background: rgba(184,160,122,.88); }

        .hs-progress-fill {
          height: 100%;
          background: linear-gradient(to right, #B8A07A, rgba(184,160,122,.35));
          transform-origin: left;
        }
      `}</style>

      <section
        className="hs relative h-screen w-full overflow-hidden"
        style={{ background: "#0C0A09" }}
        aria-label="Hero slideshow"
      >
        {/* ── Slide images ── */}
        <AnimatePresence mode="sync">
          {slides.map((s, i) => (
            <motion.div
              key={i}
              style={{ position: "absolute", inset: 0, zIndex: i === active ? 2 : 1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: i === active ? 1 : 0 }}
              transition={{ duration: 1.8, ease }}
            >
              <div className={`hs-img-wrap ${i === active ? "zoomed" : ""}`}>
                <Image
                  src={s.imageUrl}
                  alt={s.title}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              {/* Overlays */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(12,10,9,.35)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,10,9,.88) 0%, rgba(12,10,9,.16) 40%, rgba(12,10,9,.28) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 28%, rgba(12,10,9,.52) 100%)" }} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* ── Frame ── */}
        <div className="hs-frame" aria-hidden="true">
          <div className="hs-corner hs-corner-tl" />
          <div className="hs-corner hs-corner-tr" />
          <div className="hs-corner hs-corner-bl" />
          <div className="hs-corner hs-corner-br" />
        </div>

        {/* ── Side label ── */}
        <p className="hs-side-label hidden md:block" aria-hidden="true">
          Modern Luxury — Since 2026
        </p>

        {/* ── Counter ── */}
        <div className="hs-counter hidden md:flex" aria-hidden="true">
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease }}
              className="hs-counter-cur"
            >
              {padded(active)}
            </motion.span>
          </AnimatePresence>
          <div className="hs-counter-line" />
          <span className="hs-counter-tot">{padded(slides.length - 1)}</span>
        </div>

        {/* ── Content ── */}
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 15,
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: "0 clamp(2rem, 6vw, 5rem) clamp(4rem, 8vh, 6rem)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {/* Eyebrow */}
              <motion.div className="hs-eyebrow" {...fadeUp(0.1)}>
                <div className="hs-eyebrow-line" />
                <span className="hs-eyebrow-text">
                  {slide.eyebrow ?? "Exclusive Luxury Collection"}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1 className="hs-title" {...fadeUp(0.2, 28)}>
                <span dangerouslySetInnerHTML={{ __html: slide.title }} />
                {slide.titleItalic && (
                  <span className="hs-title-italic">{slide.titleItalic}</span>
                )}
              </motion.h1>

              {/* Ornament */}
              <motion.div {...fadeUp(0.32)}>
                <Ornament style={{ maxWidth: 280, margin: "26px 0" }} />
              </motion.div>

              {/* Description */}
              <motion.p className="hs-desc" {...fadeUp(0.40)} style={{ marginBottom: "2.5rem" }}>
                {slide.description}
              </motion.p>

              {/* Actions */}
              <motion.div
                {...fadeUp(0.50)}
                style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}
              >
                <Link href={slide.ctaHref ?? "#"} className="hs-btn-primary">
                  <span>{slide.ctaLabel ?? "Explore the Edit"}</span>
                  <div className="hs-shimmer" aria-hidden="true" />
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1.5 6h9M7.5 2l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link href={slide.secondaryHref ?? "#"} className="hs-btn-ghost">
                  {slide.secondaryLabel ?? "Discover More"}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Dots ── */}
        <div
          style={{
            position: "absolute", bottom: 44, left: "50%", transform: "translateX(-50%)",
            zIndex: 20, display: "flex", alignItems: "center", gap: 8,
          }}
          role="tablist"
          aria-label="Slide indicators"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to slide ${i + 1}`}
              className={`hs-dot ${i === active ? "active" : ""}`}
              style={{ width: i === active ? 28 : 8 }}
              onClick={() => { setActive(i); startProgress(); }}
            />
          ))}
        </div>

        {/* ── Nav buttons ── */}
        <div
          style={{
            position: "absolute", bottom: 32, right: "clamp(2rem, 6vw, 5rem)",
            zIndex: 20, display: "flex", alignItems: "center", gap: 0,
          }}
        >
          <button
            className="hs-ctrl-btn"
            aria-label="Previous slide"
            onClick={() => goTo(active - 1)}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M9.5 3L5.5 7.5l4 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,.10)" }} />
          <button
            className="hs-ctrl-btn"
            aria-label="Next slide"
            onClick={() => goTo(active + 1)}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M5.5 3l4 4.5-4 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ── Progress bar ── */}
        <div
          style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 1.5, zIndex: 20, background: "rgba(255,255,255,.06)" }}
          aria-hidden="true"
        >
          <div
            className="hs-progress-fill"
            style={{ width: `${progress}%`, transition: "width 50ms linear" }}
          />
        </div>
      </section>
    </>
  );
};
