"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { COLLECTIONS } from "@/constants";
import { useCart } from "@/context/CartContext";
import { Collection, Product } from "@/types";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

type Section = "womens" | "mens" | "kids";
type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

const SECTION_LINKS = [
  { label: "Men", href: "/mens", slug: "mens" },
  { label: "Women", href: "/womens", slug: "womens" },
  { label: "Kids", href: "/kids", slug: "kids" },
] as const;

function fmtPrice(n: number) {
  return `$${n.toLocaleString()}`;
}

const CollectionProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [wished, setWished] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();
  const productHref = `/product/${product.slug ?? product.id}`;

  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product, product.sizes?.[0] ?? "One Size");
    setIsCartOpen(true);
  };

  return (
    <Link href={productHref} className="collection-card">
      <div className="collection-image">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="collection-product-image"
        />

        {product.badge && <span className={`collection-badge ${product.badge === "Sale" ? "sale" : ""}`}>{product.badge}</span>}

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setWished((value) => !value);
          }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="collection-wish"
        >
          <Heart size={14} strokeWidth={1.4} fill={wished ? "#b8956a" : "none"} />
        </button>

        <div className="collection-quick">
          <button type="button" onClick={handleAdd}>
            <ShoppingBag size={13} strokeWidth={1.4} />
            Add to Bag
          </button>
        </div>
      </div>

      <div className="collection-info">
        <p className="collection-name">{product.name}</p>
        <p className="collection-category">{product.category}</p>
        <div className="collection-price-row">
          <span>{fmtPrice(product.price)}</span>
          {product.originalPrice && <del>{fmtPrice(product.originalPrice)}</del>}
        </div>
        <div className="collection-swatches">
          {(product.colors ?? ["#c8b89a", "#1a1a1a"]).map((color) => (
            <span key={color} style={{ background: color }} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export function CollectionPage({ initialSection }: { initialSection: Section }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const collection = COLLECTIONS.find((item) => item.slug === initialSection) as Collection;
  const categories = collection.categories ?? ["All"];

  let filtered = [...collection.products];

  if (activeCategory !== "All") {
    filtered = filtered.filter((product) => product.category === activeCategory);
  }

  if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sortBy === "newest") filtered.sort((a, b) => Number(b.badge === "New") - Number(a.badge === "New"));

  return (
    <div className="collection-page">
      <style>{`
        .collection-page {
          --ivory: #f7f4ef;
          --ivory-2: #ede9e1;
          --ink: #0e0d0b;
          --faint: rgba(14,13,11,0.12);
          --gold: #b8956a;
          min-height: 100vh;
          background: var(--ivory);
          color: var(--ink);
          font-family: Inter, sans-serif;
        }

        .collection-main { padding-top: 75px; }

        .collection-hero {
          background: var(--ink);
          padding: 58px 40px 46px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .collection-eyebrow,
        .collection-subtitle,
        .collection-section-links a,
        .collection-slider button,
        .collection-sort label,
        .collection-sort select,
        .collection-count,
        .collection-category,
        .collection-badge,
        .collection-quick button {
          text-transform: uppercase;
        }

        .collection-eyebrow {
          font-size: 11px;
          font-weight: 300;
          letter-spacing: .34em;
          color: var(--gold);
        }

        .collection-hero h1 {
          font-size: clamp(34px, 5vw, 58px);
          font-weight: 300;
          letter-spacing: .03em;
          color: var(--ivory);
          line-height: 1.08;
        }

        .collection-hero p {
          max-width: 560px;
          color: rgba(247,244,239,.58);
          font-size: 13px;
          font-weight: 300;
          line-height: 1.8;
        }

        .collection-section-links {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          padding: 18px 40px;
          border-bottom: .5px solid var(--faint);
        }

        .collection-section-links a {
          text-decoration: none;
          border: .5px solid var(--faint);
          color: rgba(14,13,11,.52);
          padding: 9px 16px;
          font-size: 10px;
          letter-spacing: .24em;
        }

        .collection-section-links a.active {
          background: var(--ink);
          color: var(--ivory);
          border-color: var(--ink);
        }

        .collection-body { padding: 30px 40px 72px; }

        .collection-slider {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 0 0 16px;
          margin-bottom: 16px;
          scroll-snap-type: x proximity;
        }

        .collection-slider button {
          flex: 0 0 auto;
          scroll-snap-align: start;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: .22em;
          color: rgba(14,13,11,.45);
          background: transparent;
          border: .5px solid var(--faint);
          padding: 9px 17px;
          cursor: pointer;
          white-space: nowrap;
        }

        .collection-slider button.active {
          color: var(--ivory);
          background: var(--ink);
          border-color: var(--ink);
        }

        .collection-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }

        .collection-sort { display: flex; align-items: center; gap: 10px; }

        .collection-sort label,
        .collection-count {
          font-size: 11px;
          font-weight: 300;
          letter-spacing: .18em;
          color: rgba(14,13,11,.42);
        }

        .collection-sort select {
          font-size: 11px;
          letter-spacing: .08em;
          color: var(--ink);
          border: .5px solid var(--faint);
          background: var(--ivory);
          padding: 8px 28px 8px 10px;
          outline: none;
        }

        .collection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 34px 20px;
        }

        .collection-card {
          display: block;
          color: inherit;
          text-decoration: none;
        }

        .collection-image {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          background: var(--ivory-2);
          overflow: hidden;
        }

        .collection-product-image {
          object-fit: cover;
          transition: transform .8s cubic-bezier(.4,0,.2,1);
        }

        .collection-card:hover .collection-product-image { transform: scale(1.045); }

        .collection-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: .2em;
          padding: 5px 9px;
          background: var(--ink);
          color: var(--ivory);
        }

        .collection-badge.sale { background: #8b1a1a; color: #f9dede; }

        .collection-wish {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(247,244,239,.92);
          border: none;
          color: rgba(14,13,11,.42);
          cursor: pointer;
        }

        .collection-quick {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 16px;
          background: rgba(14,13,11,.05);
          opacity: 0;
          transition: opacity .2s;
        }

        .collection-card:hover .collection-quick { opacity: 1; }

        .collection-quick button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: .22em;
          color: var(--ivory);
          background: var(--ink);
          border: none;
          padding: 11px 22px;
          cursor: pointer;
        }

        .collection-info { padding-top: 13px; }
        .collection-name { font-size: 16px; font-weight: 400; letter-spacing: .02em; line-height: 1.3; margin-bottom: 4px; }
        .collection-category { font-size: 10px; font-weight: 300; letter-spacing: .22em; color: rgba(14,13,11,.38); margin-bottom: 8px; }
        .collection-price-row { display: flex; align-items: baseline; gap: 8px; font-size: 13px; font-weight: 400; letter-spacing: .07em; }
        .collection-price-row del { font-size: 12px; color: rgba(14,13,11,.35); }
        .collection-swatches { display: flex; gap: 4px; margin-top: 9px; }
        .collection-swatches span { width: 12px; height: 12px; border-radius: 999px; border: .5px solid rgba(14,13,11,.15); }

        .collection-empty {
          text-align: center;
          padding: 80px 0;
          color: rgba(14,13,11,.42);
        }

        @media (max-width: 768px) {
          .collection-main { padding-top: 68px; }
          .collection-hero,
          .collection-section-links,
          .collection-body { padding-left: 20px; padding-right: 20px; }
          .collection-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 12px; }
        }

        @media (max-width: 430px) {
          .collection-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <Navbar />

      <main className="collection-main">
        <section className="collection-hero">
          <span className="collection-eyebrow">{collection.eyebrow}</span>
          <h1>{collection.title} Collection</h1>
          <p>{collection.description}</p>
        </section>


        <section className="collection-body">
          <div className="collection-slider" aria-label={`${collection.title} subcategories`}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "active" : ""}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="collection-toolbar">
            <div className="collection-sort">
              <label htmlFor="collection-sort">Sort</label>
              <select id="collection-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)}>
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low-High</option>
                <option value="price-desc">Price: High-Low</option>
              </select>
            </div>
            <span className="collection-count">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${collection.slug}-${activeCategory}-${sortBy}`}
                className="collection-grid"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: .35, ease: [.4, 0, .2, 1] }}
              >
                {filtered.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * .035, duration: .35 }}
                  >
                    <CollectionProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="empty" className="collection-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Try a different subcategory
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <Footer />
    </div>
  );
}
