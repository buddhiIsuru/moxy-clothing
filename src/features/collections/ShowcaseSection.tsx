"use client";

import React, { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

import { Product } from "@/types";
import { ProductCard } from "@/components/shared/ProductCard";

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E\")";

// ─────────────────────────────────────────────────────────────
// SHARED ATOMS
// ─────────────────────────────────────────────────────────────

const Ornament: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div
    aria-hidden="true"
    style={{ display: "flex", alignItems: "center", gap: 10, ...style }}
  >
    <div style={{ flex: 1, height: 1, background: "rgba(184,160,122,.30)" }} />
    <div style={{ width: 6, height: 6, border: "1px solid rgba(184,160,122,.55)", transform: "rotate(45deg)", flexShrink: 0 }} />
    <div style={{ flex: 1, height: 1, background: "rgba(184,160,122,.30)" }} />
  </div>
);

const Corner: React.FC<{ pos: "tl" | "tr" | "bl" | "br" }> = ({ pos }) => (
  <div
    aria-hidden="true"
    style={{
      position: "absolute", zIndex: 10, width: 18, height: 18,
      top:    pos[0] === "t" ? 18 : "auto",
      bottom: pos[0] === "b" ? 18 : "auto",
      left:   pos[1] === "l" ? 18 : "auto",
      right:  pos[1] === "r" ? 18 : "auto",
      borderTop:    pos[0] === "t" ? "1px solid rgba(184,160,122,.60)" : "none",
      borderBottom: pos[0] === "b" ? "1px solid rgba(184,160,122,.60)" : "none",
      borderLeft:   pos[1] === "l" ? "1px solid rgba(184,160,122,.60)" : "none",
      borderRight:  pos[1] === "r" ? "1px solid rgba(184,160,122,.60)" : "none",
    }}
  />
);

const Grain: React.FC = () => (
  <div
    aria-hidden="true"
    style={{
      position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
      backgroundImage: GRAIN_URL, backgroundRepeat: "repeat",
    }}
  />
);

// ─────────────────────────────────────────────────────────────
// FEATURE BANNER
// ─────────────────────────────────────────────────────────────

interface FeatureBannerProps {
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string | StaticImageData;
  hoverImageUrl?: string | StaticImageData;
  linkText: string;
  linkHref: string;
  reverse?: boolean;
  id?: string;
}

export const FeatureBanner: React.FC<FeatureBannerProps> = ({
  category, title, subtitle, description,
  imageUrl, hoverImageUrl, linkText, linkHref, reverse, id,
}) => {
  const [hovered, setHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  const textAlign = reverse ? "right" : "left";
  const alignItems = reverse ? "flex-end" : "flex-start";

  return (
    <section
      id={id}
      ref={sectionRef}
      style={{ position: "relative", width: "100%", overflow: "hidden", background: "#F2EDE5" }}
    >
      <Grain />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {/* ── Image panel ── */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "clamp(480px, 62vh, 720px)",
            order: reverse ? 2 : 1,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <motion.div style={{ y: imgY, position: "absolute", inset: "-8%", zIndex: 0 }}>
            <Image
              src={imageUrl} alt={title} fill className="object-cover"
              style={{
                transition: "opacity 0.9s ease, transform 1.1s cubic-bezier(.22,1,.36,1)",
                opacity: hovered && hoverImageUrl ? 0 : 1,
                transform: hovered ? "scale(1.04)" : "scale(1)",
              }}
            />
            {hoverImageUrl && (
              <Image
                src={hoverImageUrl} alt={`${title} alternate`} fill
                style={{
                  position: "absolute", inset: 0, objectFit: "cover",
                  transition: "opacity 0.9s ease",
                  opacity: hovered ? 1 : 0,
                }}
              />
            )}
          </motion.div>

          {(["tl", "tr", "bl", "br"] as const).map((p) => <Corner key={p} pos={p} />)}

          <div style={{ position: "absolute", bottom: 26, left: 0, right: 0, zIndex: 10, display: "flex", justifyContent: "center" }}>
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 500,
              letterSpacing: ".28em", textTransform: "uppercase",
              color: "rgba(243,238,230,.78)", background: "rgba(26,23,20,.48)",
              backdropFilter: "blur(8px)", padding: "6px 16px",
              border: "0.5px solid rgba(184,160,122,.28)", whiteSpace: "nowrap",
            }}>
              {category}
            </span>
          </div>
        </div>

        {/* ── Text panel ── */}
        <div
          style={{
            order: reverse ? 1 : 2,
            display: "flex",
            flexDirection: "column",
            alignItems,
            justifyContent: "center",
            textAlign,
            padding: "clamp(3rem, 6vw, 5.5rem) clamp(2rem, 5vw, 5rem)",
          }}
        >
          {/* Hairline rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            style={{
              width: 48, height: 1, background: "rgba(184,160,122,.55)",
              marginBottom: 36,
              transformOrigin: reverse ? "right" : "left",
            }}
          />

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.16, ease: EASE }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 200,
              fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
              letterSpacing: "-.02em",
              lineHeight: 1.0,
              color: "#1A1714",
              marginBottom: subtitle ? 6 : 0,
            }}
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.22, ease: EASE }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontStyle: "italic", fontWeight: 300,
                fontSize: "clamp(1rem, 2vw, 1.4rem)",
                color: "#B8A07A", letterSpacing: ".02em",
              }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Ornament */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
            style={{ width: "100%", maxWidth: 280, marginTop: 28, marginBottom: 28 }}
          >
            <Ornament />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.34, ease: EASE }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300, fontSize: 13.5, lineHeight: 1.92,
              color: "rgba(26,23,20,.56)", maxWidth: 380,
            }}
          >
            {description}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
            style={{ marginTop: 48 }}
          >
            <Link
              href={linkHref}
              style={{
                display: "inline-flex", alignItems: "center", gap: 14,
                fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 500,
                letterSpacing: ".30em", textTransform: "uppercase",
                color: "#1A1714", textDecoration: "none",
                paddingBottom: 5, borderBottom: "1px solid rgba(184,160,122,.40)",
                transition: "color .3s, border-color .3s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#8B5E3C"; el.style.borderColor = "#B8A07A"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#1A1714"; el.style.borderColor = "rgba(184,160,122,.40)"; }}
            >
              {linkText}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 6.5h10M8 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>

          {/* Watermark */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.52, ease: EASE }}
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: 8, fontWeight: 400,
              letterSpacing: ".24em", textTransform: "uppercase",
              color: "rgba(26,23,20,.20)", marginTop: 52,
            }}
          >
            MOXY — Maison Atelier
          </motion.p>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// PRODUCT ROW
// ─────────────────────────────────────────────────────────────

interface ProductRowProps {
  subtitle: string;
  title: string;
  products: Product[];
  id?: string;
}

export const ProductRow: React.FC<ProductRowProps> = ({ subtitle, title, products, id }) => {
  const headRef  = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const inView   = useInView(headRef, { once: true, margin: "-80px" });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = stripRef.current;
    if (!el) return;
    el.style.cursor = "grabbing";
    const startX     = e.pageX - el.offsetLeft;
    const scrollLeft = el.scrollLeft;
    const onMove = (ev: MouseEvent) => { el.scrollLeft = scrollLeft - (ev.pageX - el.offsetLeft - startX); };
    const onUp   = () => { el.style.cursor = "grab"; window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <section
      id={id}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: "#F2EDE5",
        paddingTop: "clamp(3rem, 5vw, 4rem)",
        paddingBottom: "clamp(3rem, 5vw, 4rem)",
      }}
    >
      <Grain />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1680,
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        {/* ── Header ── */}
        <div
          ref={headRef}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <div>
            {/* Eyebrow row */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <motion.div
                animate={{ scaleX: inView ? 1 : 0 }}
                initial={{ scaleX: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                style={{ originX: 0, width: 32, height: 1, background: "#B8A07A", flexShrink: 0 }}
              />
              <motion.p
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
                initial={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.7, delay: 0.14, ease: EASE }}
                style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 500,
                  letterSpacing: ".28em", textTransform: "uppercase", color: "#B8A07A",
                }}
              >
                {subtitle}
              </motion.p>
            </div>

            {/* Title */}
            <motion.h2
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 36 }}
              initial={{ opacity: 0, y: 36 }}
              transition={{ duration: 1.1, delay: 0.20, ease: EASE }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 200,
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                letterSpacing: "-.025em",
                lineHeight: 1,
                color: "#1A1714",
              }}
            >
              {title}
            </motion.h2>
          </div>

          {/* View Collection */}
          <motion.div
            animate={{ opacity: inView ? 1 : 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          >
            <Link
              href="#"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 500,
                letterSpacing: ".26em", textTransform: "uppercase",
                color: "#7A7269", textDecoration: "none",
                paddingBottom: 4, borderBottom: "1px solid rgba(26,23,20,.14)",
                transition: "color .3s, border-color .3s", whiteSpace: "nowrap", flexShrink: 0,
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#1A1714"; el.style.borderColor = "#B8A07A"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#7A7269"; el.style.borderColor = "rgba(26,23,20,.14)"; }}
            >
              View Collection
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1 5.5h9M6.5 1.5l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Ornament */}
        <motion.div
          animate={{ opacity: inView ? 1 : 0, scaleX: inView ? 1 : 0 }}
          initial={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE }}
          style={{ originX: 0, marginTop: 28, marginBottom: 52 }}
        >
          <Ornament />
        </motion.div>

        {/* ── Product strip ── */}
        <div
          ref={stripRef}
          style={{
            display: "flex",
            gap: 20,
            overflowX: "auto",
            overflowY: "hidden",
            scrollbarWidth: "none",
            scrollSnapType: "x mandatory",
            paddingBottom: 4,
            cursor: "grab",
          }}
          onMouseDown={handleMouseDown}
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 52, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1, delay: i * 0.09, ease: EASE }}
              style={{
                flexShrink: 0,
                scrollSnapAlign: "start",
                minWidth: "clamp(240px, 36vw, 320px)",
                transition: "transform .65s cubic-bezier(.22,1,.36,1)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}

          {/* Terminal fade */}
          <div
            aria-hidden="true"
            style={{
              flexShrink: 0,
              minWidth: 72,
              alignSelf: "stretch",
              background: "linear-gradient(to right, transparent, #F2EDE5)",
              position: "sticky",
              right: 0,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </section>
  );
};
