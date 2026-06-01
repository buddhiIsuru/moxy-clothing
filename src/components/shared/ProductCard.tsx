"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  className?: string;
  /**
   * Optional offer label text, e.g. "New Arrival", "Exclusive", "Limited Edition"
   * If not provided, falls back to product.badge if present
   */
  offerLabel?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  offerLabel,
}) => {
  const { formatPrice } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imagesList = (
    product.images && product.images.length > 0
      ? product.images
      : [product.imageUrl, product.hoverImageUrl].filter(Boolean)
  ) as (string | StaticImageData)[];

  const isSoldOut = product.soldOut ?? false;
  const discountPercent =
    product.originalPrice && product.price < product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;
  const badge = offerLabel ?? product.badge ?? null;

  useEffect(() => {
    if (!isHovered || isSoldOut || imagesList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imagesList.length);
    }, 900);
    return () => clearInterval(interval);
  }, [isHovered, isSoldOut, imagesList]);

  return (
    <>
      <style>{`
        
        .pc-root {
          --gold:      #B8A07A;
          --gold-pale: #D4BFA0;
          --ink:       #1A1714;
          --mist:      #7A7269;
          --cream:     #F3EEE6;
          --sold-bg:   rgba(26, 23, 20, 0.62);
          font-family: 'Inter', sans-serif;
        }

        /* ── Wishlist button ───────────────────────────── */
        .pc-wish {
          position: absolute;
          top: 14px; right: 14px;
          z-index: 20;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(243,238,230,0.82);
          backdrop-filter: blur(6px);
          border: 0.5px solid rgba(184,160,122,0.30);
          cursor: pointer;
          transition: background 0.3s, border-color 0.3s, transform 0.25s;
          transform: translateY(6px);
          opacity: 0;
        }
        .pc-root:hover .pc-wish {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s, border-color 0.3s;
        }
        .pc-wish:hover  { background: rgba(243,238,230,0.96); border-color: var(--gold); }
        .pc-wish.active { background: var(--cream); border-color: var(--gold); }

        @media (max-width: 1024px) {
          .pc-wish {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ── Labels ─────────────────────────────────────── */
        .pc-label {
          position: absolute;
          top: 14px; left: 14px;
          z-index: 20;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .pc-badge {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-size: 8px;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 5px 10px;
          border: 0.5px solid var(--gold);
          color: var(--gold);
          background: rgba(243,238,230,0.88);
          backdrop-filter: blur(4px);
          white-space: nowrap;
        }
        .pc-badge--sale {
          background: var(--ink);
          border-color: var(--ink);
          color: var(--gold-pale);
        }

        /* ── Sold Out overlay ───────────────────────────── */
        .pc-sold-overlay {
          position: absolute;
          inset: 0;
          z-index: 15;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--sold-bg);
          backdrop-filter: blur(2px);
        }
        .pc-sold-text {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-style: italic;
          font-size: 22px;
          letter-spacing: 0.28em;
          color: var(--cream);
          border-top: 0.5px solid rgba(212,191,160,0.5);
          border-bottom: 0.5px solid rgba(212,191,160,0.5);
          padding: 10px 20px;
        }

        /* ── Image frame ────────────────────────────────── */
        .pc-frame {
          position: relative;
          aspect-ratio: 3/4;
          width: 100%;
          overflow: hidden;
          background: #EDEAE3;
          border: 0.5px solid rgba(26,23,20,0.07);
          transition: border-color 0.5s ease, box-shadow 0.5s ease;
        }
        .pc-root:hover .pc-frame {
          border-color: rgba(184,160,122,0.4);
          box-shadow: 0 24px 52px rgba(26,23,20,0.09);
        }

        /* ── Progress dots ──────────────────────────────── */
        .pc-dots {
          position: absolute;
          bottom: 14px;
          left: 50%; transform: translateX(-50%);
          z-index: 10;
          display: flex;
          gap: 5px;
          background: rgba(243,238,230,0.72);
          backdrop-filter: blur(6px);
          border: 0.5px solid rgba(26,23,20,0.08);
          padding: 5px 10px;
        }
        .pc-dot {
          height: 2px;
          background: rgba(26,23,20,0.22);
          transition: width 0.3s ease, background 0.3s ease;
        }
        .pc-dot.active {
          background: var(--gold);
        }

        /* ── Vignette ───────────────────────────────────── */
        .pc-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(26,23,20,0.12) 0%, transparent 40%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .pc-root:hover .pc-vignette { opacity: 1; }

        /* ── Info block ─────────────────────────────────── */
        .pc-info {
          margin-top: 18px;
          padding: 0 4px;
          text-align: center;
          transform: translateY(0);
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .pc-root:hover .pc-info { transform: translateY(-2px); }

        .pc-category {
          font-family: 'Inter', sans-serif;
          font-size: 8px;
          font-weight: 400;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 6px;
        }
        .pc-name {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 300;
          font-size: 17px;
          letter-spacing: 0.04em;
          color: var(--ink);
          line-height: 1.3;
          transition: color 0.3s;
          margin-bottom: 8px;
        }
        .pc-root:hover .pc-name { color: #3A2F25; }

        .pc-price-row {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 8px;
        }
        .pc-price {
          font-family: 'Inter', serif;
          font-weight: 400;
          font-size: 14px;
          letter-spacing: 0.06em;
          color: var(--mist);
        }
        .pc-price-original {
          font-family: 'Inter', serif;
          font-weight: 300;
          font-size: 12px;
          letter-spacing: 0.04em;
          color: rgba(122,114,105,0.5);
          text-decoration: line-through;
        }
        .pc-price-sale {
          color: #8B5E3C;
        }

        /* ── Sold-out price treatment ───────────────────── */
        .pc-price--soldout {
          opacity: 0.45;
        }
      `}</style>

      <div
        className={cn("pc-root group relative flex w-full flex-col", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImageIndex(0);
        }}
      >
        <Link href={`/product/${product.slug ?? product.id}`} className="block w-full" tabIndex={isSoldOut ? -1 : 0}>
          {/* Image Frame */}
          <div className="pc-frame">
            {/* Crossfade slideshow */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0.88 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.88 }}
                transition={{ duration: 0.28 }}
                style={{ position: "absolute", inset: 0 }}
              >
                <Image
                  src={imagesList[currentImageIndex] || ""}
                  alt={`${product.name} — view ${currentImageIndex + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.038]"
                  priority={false}
                  style={{ filter: isSoldOut ? "grayscale(35%) brightness(0.94)" : "none", transition: "transform 1100ms ease-out, filter 0.5s ease" }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Image progress dots */}
            {isHovered && !isSoldOut && imagesList.length > 1 && (
              <div className="pc-dots">
                {imagesList.map((_, idx) => (
                  <div
                    key={idx}
                    className={cn("pc-dot", idx === currentImageIndex ? "active" : "")}
                    style={{ width: idx === currentImageIndex ? "20px" : "6px" }}
                  />
                ))}
              </div>
            )}

            {/* Vignette */}
            <div className="pc-vignette" aria-hidden="true" />

            {/* Sold Out overlay */}
            {isSoldOut && (
              <div className="pc-sold-overlay" aria-label="Sold out">
                <span className="pc-sold-text">Sold Out</span>
              </div>
            )}
          </div>
        </Link>

        {/* Labels — top left */}
        <div className="pc-label" aria-hidden="true">
          {badge && <span className="pc-badge">{badge}</span>}
          {discountPercent && !isSoldOut && (
            <span className="pc-badge pc-badge--sale">−{discountPercent}%</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          type="button"
          onClick={() => setIsWishlisted((c) => !c)}
          className={cn("pc-wish", isWishlisted && "active")}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={14}
            strokeWidth={1.5}
            color={isWishlisted ? "var(--gold)" : "var(--ink)"}
            fill={isWishlisted ? "var(--gold)" : "none"}
            style={{ transition: "fill 0.25s, color 0.25s, transform 0.25s", transform: isWishlisted ? "scale(1.1)" : "scale(1)" }}
          />
        </button>

        {/* Info + CTA */}
        <Link href={`/product/${product.slug ?? product.id}`} className="block">
          <div className="pc-info">
            {product.category && (
              <p className="pc-category">{product.category}</p>
            )}
            <p className="pc-name">{product.name}</p>
            <div className={cn("pc-price-row", isSoldOut && "pc-price--soldout")}>
              {discountPercent && product.originalPrice ? (
                <>
                  <span className="pc-price pc-price-sale">{formatPrice(product.price)}</span>
                  <span className="pc-price-original">{formatPrice(product.originalPrice)}</span>
                </>
              ) : (
                <span className="pc-price">{formatPrice(product.price)}</span>
              )}
            </div>
          </div>
        </Link>
        <br />
      </div>
    </>
  );
};
