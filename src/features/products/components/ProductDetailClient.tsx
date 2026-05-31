"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Heart, ChevronDown, Star, Clock, Truck, RotateCcw, Sparkles, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/shared/ProductCard";
import { Accordion } from "@/components/ui/Accordion";
import { Ornament } from "@/components/ui/Ornament";
import { Corner } from "@/components/ui/Corner";
import { Grain } from "@/components/ui/Grain";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0, fromY = 24) => ({
  initial:  { opacity: 0, y: fromY, filter: "blur(6px)" },
  animate:  { opacity: 1, y: 0,     filter: "blur(0px)",
              transition: { delay, duration: 0.95, ease } },
});

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { addToCart, triggerToast } = useCart();
  const [activeImage, setActiveImage]   = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [wishlisted, setWishlisted]     = useState(false);
  const [timeLeft, setTimeLeft]         = useState("00:00:00");

  /* Countdown Ticker */
  useEffect(() => {
    const tick = () => {
      const now    = new Date();
      const cutoff = new Date();
      cutoff.setHours(18, 0, 0, 0);
      if (now > cutoff) cutoff.setDate(cutoff.getDate() + 1);
      const d = cutoff.getTime() - now.getTime();
      const p = (n: number) => String(n).padStart(2, "0");
      setTimeLeft(`${p(Math.floor(d / 3600000))}:${p(Math.floor((d % 3600000) / 60000))}:${p(Math.floor((d % 60000) / 1000))}`);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const images = (product.images?.length ? product.images : [product.imageUrl, product.hoverImageUrl].filter(Boolean)) as (string | StaticImageData)[];
  const sizes  = product.sizes || ["XS", "S", "M", "L", "XL"];
  const rating = product.rating ?? 4.5;
  const reviewsCount = product.reviewsCount ?? 24;
  const ratingBars = [{ s: 5, p: 75 }, { s: 4, p: 15 }, { s: 3, p: 8 }, { s: 2, p: 2 }, { s: 1, p: 0 }];

  const handleAdd = () => {
    if (!selectedSize) { triggerToast("Please select a size before adding this piece.", "error"); return; }
    addToCart(product, selectedSize);
  };

  return (
    <>
      <style>{`
        .pd {
          --gold:    #B8A07A;
          --gold-d:  rgba(184,160,122,.32);
          --ink:     #1A1714;
          --mist:    #7A7269;
          --cream:   #F2EDE5;
          --surface: rgba(255,255,255,.52);
          --rule:    rgba(26,23,20,.09);
        }

        /* BREADCRUMB */
        .pd-back {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 400;
          letter-spacing: .24em; text-transform: uppercase;
          color: #7A7269; text-decoration: none;
          transition: color .3s; margin-bottom: 48px; display: inline-flex;
        }
        .pd-back:hover { color: var(--gold); }
        .pd-back svg { transition: transform .3s; }
        .pd-back:hover svg { transform: translateX(-3px); }

        /* GALLERY */
        .pd-gallery-main {
          position: relative; aspect-ratio: 3/4; overflow: hidden;
          background: #E5E0D6; border: 0.5px solid rgba(26,23,20,.08);
        }
        .pd-gallery-main img {
          transition: transform 1.1s cubic-bezier(.22,1,.36,1) !important;
        }
        .pd-gallery-main:hover img { transform: scale(1.04) !important; }

        /* THUMB */
        .pd-thumb {
          aspect-ratio: 3/4; overflow: hidden; cursor: pointer;
          border: 0.5px solid rgba(26,23,20,.09);
          opacity: .52; transition: opacity .3s, border-color .3s;
        }
        .pd-thumb:hover, .pd-thumb.active {
          opacity: 1; border-color: var(--gold);
        }

        /* SIZE BUTTONS */
        .pd-size {
          width: 48px; height: 48px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 400; letter-spacing: .06em;
          border: 0.5px solid rgba(26,23,20,.12); color: #7A7269;
          background: transparent; cursor: pointer;
          transition: border-color .3s, color .3s, background .3s, box-shadow .3s;
        }
        .pd-size:hover { border-color: var(--gold); color: var(--ink); }
        .pd-size.active {
          background: #1A1714; color: #F2EDE5; border-color: #1A1714;
          box-shadow: 0 12px 28px rgba(26,23,20,.12);
        }

        /* ADD TO BAG BUTTON */
        .pd-add {
          flex: 1; padding: 17px 24px;
          background: #1A1714; color: #F2EDE5; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 9.5px; font-weight: 500;
          letter-spacing: .28em; text-transform: uppercase;
          position: relative; overflow: hidden;
          transition: color .65s cubic-bezier(.22,1,.36,1);
        }
        .pd-add::before {
          content: ''; position: absolute; inset: 0;
          background: var(--gold);
          transform: scaleX(0); transform-origin: left;
          transition: transform .65s cubic-bezier(.22,1,.36,1);
        }
        .pd-add:hover::before { transform: scaleX(1); }
        .pd-add span { position: relative; z-index: 1; }

        /* WISH BUTTON */
        .pd-wish {
          width: 52px; display: flex; align-items: center; justify-content: center;
          border: 0.5px solid rgba(26,23,20,.12); background: transparent; cursor: pointer;
          transition: border-color .3s, background .3s;
        }
        .pd-wish:hover, .pd-wish.active {
          border-color: var(--gold); background: rgba(184,160,122,.08);
        }

        /* SERVICE CARDS */
        .pd-service {
          padding: 14px;
          background: var(--surface); border: 0.5px solid var(--rule);
          backdrop-filter: blur(4px);
          display: flex; flex-direction: column; gap: 6px;
        }
        .pd-service-title { font-size: 10.5px; font-weight: 500; color: #1A1714; }
        .pd-service-text  { font-size: 10.5px; font-weight: 300; color: #7A7269; line-height: 1.6; }

        /* RATING */
        .pd-rating-num {
          font-family: 'Inter', sans-serif; font-weight: 300;
          font-size: 4.5rem; letter-spacing: -.02em; color: #1A1714; line-height: 1;
        }
        .pd-rating-bar {
          flex: 1; height: 1.5px; background: rgba(26,23,20,.1); overflow: hidden;
        }
        .pd-rating-fill { height: 100%; background: var(--gold); }

        /* REVIEW CARD */
        .pd-review {
          padding: 24px;
          background: var(--surface); border: 0.5px solid var(--rule);
          backdrop-filter: blur(4px);
        }
        .pd-review-author {
          font-family: 'Inter', sans-serif; font-weight: 300;
          font-size: 1.05rem; letter-spacing: .02em; color: #1A1714;
        }
        .pd-review-date {
          font-size: 9px; letter-spacing: .16em; text-transform: uppercase; color: #7A7269;
        }
        .pd-review-body {
          font-size: 13px; font-weight: 300; line-height: 1.88; color: #7A7269; margin-top: 14px;
        }

        /* SECTION HEADER */
        .pd-section-head {
          display: flex; align-items: baseline; justify-content: space-between;
          border-top: 0.5px solid rgba(26,23,20,.09); padding: 48px 0 32px;
        }
        .pd-section-title {
          font-family: 'Inter', sans-serif; font-weight: 300;
          font-size: clamp(1.8rem, 3vw, 2.8rem); letter-spacing: -.02em; color: #1A1714;
        }
        .pd-section-link {
          font-size: 9px; font-weight: 400; letter-spacing: .24em; text-transform: uppercase;
          color: #7A7269; text-decoration: none;
          padding-bottom: 3px; border-bottom: 1px solid rgba(26,23,20,.12);
          transition: color .3s, border-color .3s;
        }
        .pd-section-link:hover { color: var(--gold); border-color: var(--gold); }

        /* COUNTDOWN */
        .pd-countdown {
          display: flex; align-items: center; gap: 12px; padding: 14px 18px;
          background: var(--surface); border: 0.5px solid var(--rule);
          backdrop-filter: blur(6px); margin-bottom: 28px;
        }
        .pd-countdown-time {
          font-family: 'Inter', sans-serif; font-weight: 300;
          font-size: 1.05rem; letter-spacing: .06em; color: #1A1714;
        }
      `}</style>

      <div className="pd" style={{ background: "#F2EDE5", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Grain />
        <Navbar />

        <main style={{ flex: 1, position: "relative", zIndex: 1, maxWidth: 1280, width: "100%", margin: "0 auto", padding: "clamp(6rem, 12vh, 9rem) 40px clamp(5rem, 10vh, 8rem)" }}>

          {/* ── Breadcrumb ── */}
          <motion.div {...fadeUp(0.05, 10)}>
            <Link href="/" className="pd-back">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              The Collection
            </Link>
          </motion.div>

          {/* ── Showcase (Responsive Grid columns fix) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

            {/* Gallery */}
            <motion.div {...fadeUp(0.1)}>
              {/* Main image */}
              <div className="pd-gallery-main">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                    style={{ position: "absolute", inset: 0 }}
                  >
                    <Image src={images[activeImage]} alt={`${product.name} — view ${activeImage + 1}`}
                      fill priority className="object-cover" />
                  </motion.div>
                </AnimatePresence>

                {/* Corner brackets */}
                {(["tl","tr","bl","br"] as const).map((pos) => (
                  <Corner key={pos} pos={pos} offset={14} />
                ))}
              </div>

              {/* Thumbnails */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 10 }}>
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    className={cn("pd-thumb", i === activeImage && "active")}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image src={img} alt={`${product.name} thumbnail ${i + 1}`}
                      width={120} height={160} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Info panel */}
            <motion.div {...fadeUp(0.18)} style={{ display: "flex", flexDirection: "column" }}>

              {/* Category */}
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: ".30em", textTransform: "uppercase", color: "#B8A07A", marginBottom: 12 }}>
                {product.category}
              </p>

              {/* Name */}
              <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 200, fontSize: "clamp(2.4rem, 4vw, 3.6rem)", letterSpacing: "-.01em", lineHeight: 1.02, color: "#1A1714" }}>
                {product.name}
                {product.season && (
                  <em style={{ fontStyle: "italic", display: "block", fontSize: ".7em", fontWeight: 200, color: "rgba(26,23,20,.52)", letterSpacing: ".02em", marginTop: 4 }}>
                    {product.season}
                  </em>
                )}
              </h1>

              {/* Price */}
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1.6rem", letterSpacing: ".04em", color: "#7A7269", marginTop: 8 }}>
                ${product.price.toLocaleString()}
              </p>

              <Ornament style={{ margin: "24px 0" }} />

              {/* Countdown */}
              <div className="pd-countdown">
                <Clock size={14} strokeWidth={1.5} style={{ color: "#B8A07A", flexShrink: 0 }} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 300, color: "#7A7269", letterSpacing: ".02em" }}>
                  Order within &nbsp;
                  <span className="pd-countdown-time">{timeLeft}</span>
                  &nbsp; for next-day delivery
                </p>
              </div>

              {/* Size selector */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: ".26em", textTransform: "uppercase", color: "#B8A07A" }}>Select Size</p>
                  <Link href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 400, letterSpacing: ".18em", textTransform: "uppercase", color: "#7A7269", textDecoration: "none", paddingBottom: 2, borderBottom: "1px solid rgba(26,23,20,.12)", transition: "color .3s" }}>Size Guide</Link>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {sizes.map((s) => (
                    <button key={s} onClick={() => setSelectedSize(s)}
                      className={cn("pd-size", selectedSize === s && "active")}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA row */}
              <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
                <button className="pd-add" onClick={handleAdd}>
                  <span>Add to Wardrobe</span>
                </button>
                <button
                  className={cn("pd-wish", wishlisted && "active")}
                  onClick={() => setWishlisted((w) => !w)}
                  aria-label="Wishlist"
                >
                  <Heart size={16} strokeWidth={1.4}
                    color={wishlisted ? "#B8A07A" : "#7A7269"}
                    fill={wishlisted ? "#B8A07A" : "none"}
                    style={{ transition: "fill .25s, color .25s, transform .25s", transform: wishlisted ? "scale(1.1)" : "scale(1)" }}
                  />
                </button>
              </div>

              {/* Accordions */}
              <div style={{ borderTop: "0.5px solid rgba(26,23,20,.09)" }}>
                <Accordion label="Description & Fit" defaultOpen>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 300, lineHeight: 1.9, color: "#7A7269", paddingBottom: 20 }}>
                    {product.description || "Every garment at MOXY is built from carefully selected textiles, utilizing high-shoulder cuts and drape forms to embody sophisticated luxury and modern utility."}
                  </p>
                  {product.details?.length && (
                    <ul style={{ paddingLeft: 16, marginTop: -8, paddingBottom: 20, display: "flex", flexDirection: "column", gap: 6 }}>
                      {product.details.map((d, i) => (
                        <li key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 300, color: "#7A7269", lineHeight: 1.7 }}>{d}</li>
                      ))}
                    </ul>
                  )}
                </Accordion>

                <Accordion label="Shipping & Concierge">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8, paddingBottom: 20 }}>
                    {[
                      { icon: Truck,     title: "Express Delivery",       text: "Complimentary express worldwide shipping on all orders." },
                      { icon: RotateCcw, title: "Complimentary Returns",  text: "30-day returns collected directly from your home." },
                      { icon: Sparkles,  title: "Restoration Concierge",  text: "Access garment cleaning and expert repairs." },
                      { icon: Clock,     title: "Next-Day Arrival",       text: "Dispatch within 24 hours of confirmed order." },
                    ].map(({ icon: Icon, title, text }) => (
                      <div key={title} className="pd-service">
                        <Icon size={13} strokeWidth={1.5} color="#B8A07A" />
                        <p className="pd-service-title">{title}</p>
                        <p className="pd-service-text">{text}</p>
                      </div>
                    ))}
                  </div>
                </Accordion>
              </div>
            </motion.div>
          </div>

          {/* ── Reviews (Responsive Grids columns fix) ── */}
          <motion.section
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease }}
          >
            <div className="pd-section-head" style={{ marginTop: 80 }}>
              <h2 className="pd-section-title">Rating &amp; Reviews</h2>
              <a href="#" className="pd-section-link">Write a Review</a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">

              {/* Rating panel */}
              <div className="lg:col-span-5 pd-review flex flex-col gap-6">
                <div>
                  <p className="pd-rating-num">{rating.toFixed(1)}</p>
                  <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < Math.floor(rating) ? "#B8A07A" : "rgba(26,23,20,.10)"} stroke="none" />
                    ))}
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 400, letterSpacing: ".18em", textTransform: "uppercase", color: "#7A7269", marginTop: 6 }}>
                    {reviewsCount} Verified Reviews
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {ratingBars.map(({ s, p }) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Inter', sans-serif", fontSize: 9.5, color: "#7A7269" }}>
                      <span>{s}</span>
                      <div className="pd-rating-bar">
                        <div className="pd-rating-fill" style={{ width: `${p}%`, transition: "width 1s cubic-bezier(.22,1,.36,1)" }} />
                      </div>
                      <span style={{ width: 28, textAlign: "right" }}>{p}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                {[
                  { name: "Alex Mathio",    date: "13 Oct 2024", stars: 5, body: "MOXY's dedication to sustainability and ethical practices resonates strongly with today's values, positioning the brand as a responsible choice in the fashion world." },
                  { name: "Elena Rostova",  date: "08 Nov 2024", stars: 5, body: "The fit is immaculate, and the fabric has a weight and drape that you only find in true luxury brands. Absolutely gorgeous silhouette." },
                ].map(({ name, date, stars, body }) => (
                  <div key={name} className="pd-review">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <p className="pd-review-author">{name}</p>
                        <div style={{ display: "flex", gap: 3, marginTop: 6 }}>
                          {[...Array(stars)].map((_, i) => <Star key={i} size={10} fill="#B8A07A" stroke="none" />)}
                        </div>
                      </div>
                      <span className="pd-review-date">{date}</span>
                    </div>
                    <p className="pd-review-body">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ── Related Products (Responsive Related fix) ── */}
          {relatedProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, ease }}
            >
              <div className="pd-section-head">
                <h2 className="pd-section-title">You Might Also Like</h2>
                <Link href={product.collectionSlug ? `/${product.collectionSlug}` : "/collections"} className="pd-section-link" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  View Collection
                  <ArrowRight size={10} />
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {relatedProducts.map((p, i) => (
                  <motion.div key={p.id}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.08, ease }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
