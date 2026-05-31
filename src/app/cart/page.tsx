"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { Navbar }  from "@/components/layout/Navbar";
import { Footer }  from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// TOKENS
// ─────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial:  { opacity: 0, y: 24, filter: "blur(5px)" },
  animate:  { opacity: 1, y: 0,  filter: "blur(0px)",
              transition: { delay, duration: 0.85, ease } },
});

// ─────────────────────────────────────────────────────────────
// ATOMS
// ─────────────────────────────────────────────────────────────

const Ornament = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{ flex: 1, height: 1, background: "rgba(184,160,122,.28)" }} />
    <div style={{ width: 5, height: 5, border: "1px solid rgba(184,160,122,.45)", transform: "rotate(45deg)", flexShrink: 0 }} />
    <div style={{ flex: 1, height: 1, background: "rgba(184,160,122,.28)" }} />
  </div>
);

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────

export default function CartPage() {
  const { cartItems, cartSubtotal, updateQuantity, removeFromCart } = useCart();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');

        .cp {
          --gold:    #B8A07A;
          --gold-d:  rgba(184,160,122,.28);
          --ink:     #1A1714;
          --mist:    #7A7269;
          --cream:   #F2EDE5;
          --surface: rgba(255,255,255,.52);
          --rule:    rgba(26,23,20,.08);
          font-family: 'Inter', sans-serif;
        }

        .cp-grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
          background-repeat: repeat;
        }

        /* ── ITEM ROW ── */
        .cp-item {
          display: grid;
          grid-template-columns: 96px 1fr auto;
          gap: 20px; padding: 24px 0;
          border-bottom: 0.5px solid var(--rule);
          transition: background .3s;
        }
        .cp-item:first-child { padding-top: 0; }
        .cp-item:hover { background: rgba(255,255,255,.25); }

        /* ── IMAGE ── */
        .cp-img {
          position: relative; width: 96px; aspect-ratio: 3/4;
          overflow: hidden; background: #E5E0D6;
          border: 0.5px solid var(--rule); flex-shrink: 0;
        }
        .cp-img img {
          transition: transform 1.1s cubic-bezier(.22,1,.36,1) !important;
        }
        .cp-item:hover .cp-img img { transform: scale(1.04) !important; }

        /* ── TEXT ── */
        .cp-cat  { font-size: 8.5px; font-weight: 500; letter-spacing: .26em; text-transform: uppercase; color: var(--gold); margin-bottom: 6px; }
        .cp-name { font-family: 'Inter', sans-serif; font-weight: 300; font-size: 1.15rem; letter-spacing: .02em; color: var(--ink); text-decoration: none; line-height: 1.3; display: block; transition: color .3s; }
        .cp-name:hover { color: #3A2F25; }
        .cp-meta { font-size: 10.5px; font-weight: 300; color: var(--mist); letter-spacing: .06em; margin-top: 6px; }

        /* ── QTY ── */
        .cp-qty { display: flex; align-items: center; border: 0.5px solid var(--rule); width: fit-content; margin-top: 18px; }
        .cp-qty-btn {
          width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;
          background: transparent; border: none; cursor: pointer; color: var(--mist);
          transition: color .3s, background .3s;
        }
        .cp-qty-btn:hover { color: var(--ink); background: rgba(26,23,20,.04); }
        .cp-qty-num { min-width: 28px; text-align: center; font-size: 12px; font-weight: 400; color: var(--ink); }

        /* ── REMOVE ── */
        .cp-remove {
          padding: 4px; background: transparent; border: none; cursor: pointer;
          color: rgba(26,23,20,.28); transition: color .3s; margin-left: 10px; margin-top: 18px;
          display: flex; align-items: center;
        }
        .cp-remove:hover { color: #8B3A3A; }

        /* ── PRICE ── */
        .cp-price { font-family: 'Inter', sans-serif; font-weight: 300; font-size: 1.15rem; letter-spacing: .04em; color: var(--ink); white-space: nowrap; }

        /* ── SUMMARY ── */
        .cp-summary {
          background: var(--surface); border: 0.5px solid var(--rule);
          backdrop-filter: blur(8px); padding: 32px;
          position: sticky; top: 32px;
        }
        .cp-summary-title { font-family: 'Inter', sans-serif; font-weight: 300; font-size: 1.5rem; letter-spacing: -.01em; color: var(--ink); margin-bottom: 28px; }
        .cp-summary-label { font-size: 11px; font-weight: 300; letter-spacing: .06em; color: var(--mist); }
        .cp-summary-value { font-size: 12px; font-weight: 400; color: var(--ink); }
        .cp-summary-gold  { font-size: 11px; font-weight: 400; letter-spacing: .08em; color: var(--gold); }
        .cp-summary-total { font-family: 'Inter', sans-serif; font-weight: 300; font-size: 2rem; letter-spacing: -.01em; color: var(--ink); }
        .cp-summary-total-label { font-size: 9px; font-weight: 500; letter-spacing: .22em; text-transform: uppercase; color: var(--mist); }

        /* ── CHECKOUT BTN ── */
        .cp-btn-checkout {
          display: block; width: 100%; margin-top: 24px; padding: 17px;
          background: var(--ink); color: var(--cream); border: none; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 9.5px; font-weight: 500;
          letter-spacing: .30em; text-transform: uppercase;
          text-align: center; text-decoration: none;
          position: relative; overflow: hidden;
          transition: color .65s cubic-bezier(.22,1,.36,1);
        }
        .cp-btn-checkout::before {
          content: ''; position: absolute; inset: 0; background: var(--gold);
          transform: scaleX(0); transform-origin: left;
          transition: transform .65s cubic-bezier(.22,1,.36,1);
        }
        .cp-btn-checkout:hover::before { transform: scaleX(1); }
        .cp-btn-checkout span { position: relative; z-index: 1; }

        /* ── CONTINUE BTN ── */
        .cp-btn-ghost {
          display: block; width: 100%; margin-top: 12px; padding: 13px;
          background: transparent; color: var(--mist);
          border: 0.5px solid var(--rule); cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 9.5px; font-weight: 400;
          letter-spacing: .26em; text-transform: uppercase;
          text-align: center; text-decoration: none;
          transition: color .3s, border-color .3s;
        }
        .cp-btn-ghost:hover { color: var(--ink); border-color: rgba(26,23,20,.22); }

        /* ── EMPTY STATE ── */
        .cp-empty {
          text-align: center; padding: 80px 40px;
          border: 0.5px solid var(--rule); background: var(--surface);
        }

        /* ── SERVICE ROWS ── */
        .cp-service { display: flex; align-items: flex-start; gap: 10px; }
        .cp-service-text { font-size: 10.5px; font-weight: 300; color: var(--mist); line-height: 1.65; }
      `}</style>

      <div className="cp" style={{ background: "#F2EDE5", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div className="cp-grain" aria-hidden="true" />
        <Navbar />

        <main style={{ flex: 1, position: "relative", zIndex: 1, maxWidth: 1200, width: "100%", margin: "0 auto", padding: "clamp(6rem, 12vh, 8rem) 40px clamp(4rem, 8vh, 6rem)" }}>

          {/* ── Page header ── */}
          <motion.div {...fadeUp(0.05)} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingBottom: 28, borderBottom: "0.5px solid rgba(26,23,20,.08)", marginBottom: 40 }}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: ".30em", textTransform: "uppercase", color: "#B8A07A", marginBottom: 10 }}>
                Shopping Bag
              </p>
              <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 200, fontSize: "clamp(2.6rem, 5vw, 4rem)", letterSpacing: "-.015em", lineHeight: 1, color: "#1A1714" }}>
                Your Wardrobe
              </h1>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 300, letterSpacing: ".10em", color: "#7A7269" }}>
              {cartItems.length} {cartItems.length === 1 ? "piece" : "pieces"} selected
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.10)} style={{ marginBottom: 40 }}>
            <Ornament />
          </motion.div>

          {/* ── Empty state ── */}
          {cartItems.length === 0 ? (
            <motion.div {...fadeUp(0.15)} className="cp-empty">
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "2rem", letterSpacing: "-.01em", color: "#1A1714", marginBottom: 12 }}>
                Your bag is empty
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 300, color: "#7A7269", lineHeight: 1.8, marginBottom: 36 }}>
                Discover garments crafted for those who understand the value of true luxury.
              </p>
              <Link href="/collections" style={{
                display: "inline-flex", alignItems: "center", gap: 12,
                fontFamily: "'Inter', sans-serif", fontSize: 9.5, fontWeight: 500, letterSpacing: ".28em", textTransform: "uppercase",
                color: "#1A1714", textDecoration: "none", paddingBottom: 5,
                borderBottom: "1px solid rgba(184,160,122,.45)",
                transition: "color .3s, border-color .3s",
              }}>
                Explore the Collection
              </Link>
            </motion.div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 40, alignItems: "start" }}>

              {/* ── Cart items ── */}
              <div role="list" aria-label="Cart items">
                <AnimatePresence>
                  {cartItems.map((item, i) => (
                    <motion.div
                      key={`${item.product.id}-${item.selectedSize}`}
                      role="listitem"
                      className="cp-item"
                      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: 0.12 + i * 0.07, duration: 0.8, ease } }}
                      exit={{ opacity: 0, x: -16, transition: { duration: 0.35, ease } }}
                    >
                      {/* Image */}
                      <div className="cp-img">
                        <Image src={item.product.imageUrl} alt={item.product.name} fill sizes="96px" className="object-cover" />
                      </div>

                      {/* Info */}
                      <div>
                        <p className="cp-cat">{item.product.category}</p>
                        <Link href={`/product/${item.product.slug ?? item.product.id}`} className="cp-name">
                          {item.product.name}
                        </Link>
                        <p className="cp-meta">
                          Size: {item.selectedSize}&nbsp;·&nbsp;Ref. MXY-{String(item.product.id).padStart(3, "0")}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div className="cp-qty">
                            <button className="cp-qty-btn" aria-label="Decrease quantity"
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}>
                              <Minus size={12} strokeWidth={1.5} />
                            </button>
                            <span className="cp-qty-num">{item.quantity}</span>
                            <button className="cp-qty-btn" aria-label="Increase quantity"
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}>
                              <Plus size={12} strokeWidth={1.5} />
                            </button>
                          </div>
                          <button className="cp-remove" aria-label={`Remove ${item.product.name}`}
                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}>
                            <Trash2 size={13} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-start", paddingTop: 2 }}>
                        <p className="cp-price">${(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* ── Order summary ── */}
              <motion.aside {...fadeUp(0.18)} className="cp-summary" aria-label="Order summary">
                <h2 className="cp-summary-title">Order Summary</h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span className="cp-summary-label">Subtotal ({cartItems.length} {cartItems.length === 1 ? "piece" : "pieces"})</span>
                    <span className="cp-summary-value">${cartSubtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span className="cp-summary-label">Delivery</span>
                    <span className="cp-summary-gold">Complimentary</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span className="cp-summary-label">Import duties</span>
                    <span className="cp-summary-gold">Included</span>
                  </div>
                </div>

                <hr style={{ border: "none", borderTop: "0.5px solid rgba(26,23,20,.08)", margin: "20px 0" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span className="cp-summary-total-label">Total</span>
                  <span className="cp-summary-total">${cartSubtotal.toLocaleString()}</span>
                </div>

                <Link href="/checkout" className="cp-btn-checkout"><span>Proceed to Checkout</span></Link>
                <Link href="/collections" className="cp-btn-ghost">Continue Shopping</Link>

                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9.5, fontWeight: 300, color: "#7A7269", letterSpacing: ".04em", marginTop: 20, lineHeight: 1.7, textAlign: "center" }}>
                  All duties and taxes included. Complimentary express shipping on all orders.
                </p>

                {/* Service trust icons */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24, paddingTop: 22, borderTop: "0.5px solid rgba(26,23,20,.08)" }}>
                  {[
                    { Icon: Truck,       text: "Express worldwide delivery, dispatched within 24 hours" },
                    { Icon: RotateCcw,   text: "30-day complimentary returns, collected from your home" },
                    { Icon: ShieldCheck, text: "Secure checkout — SSL encrypted & PCI compliant" },
                  ].map(({ Icon, text }) => (
                    <div key={text} className="cp-service">
                      <Icon size={13} strokeWidth={1.5} color="#B8A07A" style={{ flexShrink: 0, marginTop: 1 }} />
                      <span className="cp-service-text">{text}</span>
                    </div>
                  ))}
                </div>
              </motion.aside>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
