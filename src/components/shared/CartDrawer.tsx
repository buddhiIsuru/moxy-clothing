"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import logoImage from "@/assets/logo/LOGO (2).png";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const IVORY   = "#f7f4ef";
const IVORY2  = "#ede9e1";
const INK     = "#0e0d0b";
const INK2    = "rgba(14,13,11,0.55)";
const INK3    = "rgba(14,13,11,0.32)";
const INK4    = "rgba(14,13,11,0.1)";
const GOLD    = "#b8956a";
const INTER   = "'Inter', sans-serif";

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);
  const totalPieces = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            onClick={() => setIsCartOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(14,13,11,0.25)",
              zIndex: 50,
              cursor: "pointer",
            }}
          />

          {/* ── Drawer panel ── */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100%",
              width: "100%",
              maxWidth: 460,
              background: IVORY,
              borderLeft: `0.5px solid ${INK4}`,
              zIndex: 60,
              display: "flex",
              flexDirection: "column",
            }}
          >

            {/* ── Header ── */}
            <div
              style={{
                padding: "24px 32px 20px",
                borderBottom: `0.5px solid ${INK4}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <Image
                  src={logoImage}
                  alt="Moxy Logo"
                  height={18}
                  style={{
                    height: "18px",
                    width: "auto",
                    objectFit: "contain",
                    alignSelf: "flex-start",
                  }}
                />
                <span
                  style={{
                    fontFamily: INTER,
                    fontSize: 22,
                    fontWeight: 300,
                    letterSpacing: "0.03em",
                    color: INK,
                  }}
                >
                  Shopping Bag
                </span>
                <span
                  style={{
                    fontFamily: INTER,
                    fontSize: 11,
                    fontWeight: 200,
                    letterSpacing: "0.15em",
                    color: INK3,
                  }}
                >
                  {totalPieces} {totalPieces === 1 ? "piece" : "pieces"} selected
                </span>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
                style={{
                  width: 30,
                  height: 30,
                  border: `0.5px solid ${INK4}`,
                  background: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: INK3,
                  transition: "border-color 0.25s, color 0.25s",
                  flexShrink: 0,
                }}
              >
                <X size={15} strokeWidth={1.3} />
              </button>
            </div>

            {/* ── Items ── */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "4px 32px 0",
              }}
            >
              {cartItems.length === 0 ? (
                /* Empty state */
                <div
                  style={{
                    height: "100%",
                    minHeight: 300,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 24,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 1,
                      height: 48,
                      background: `rgba(184,149,106,0.35)`,
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 24,
                        fontWeight: 300,
                        fontStyle: "italic",
                        color: INK3,
                      }}
                    >
                      Your bag is empty
                    </span>
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 10,
                        fontWeight: 200,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: INK4,
                      }}
                    >
                      Begin your selection
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    style={{
                      fontFamily: INTER,
                      fontSize: 10,
                      fontWeight: 300,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: INK,
                      background: "none",
                      border: `0.5px solid rgba(14,13,11,0.3)`,
                      padding: "12px 28px",
                      cursor: "pointer",
                    }}
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <motion.div
                    key={`${item.product.id}-${item.selectedSize}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.4 }}
                    style={{
                      display: "flex",
                      gap: 16,
                      padding: "22px 0",
                      borderBottom: `0.5px solid ${INK4}`,
                      position: "relative",
                    }}
                  >
                    {/* Product image */}
                    <div
                      style={{
                        width: 76,
                        flexShrink: 0,
                        aspectRatio: "3/4",
                        background: IVORY2,
                        border: `0.5px solid ${INK4}`,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        sizes="76px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    {/* Info */}
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        paddingTop: 2,
                        paddingBottom: 2,
                        paddingRight: 20,
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontFamily: INTER,
                            fontSize: 9,
                            fontWeight: 200,
                            letterSpacing: "0.38em",
                            textTransform: "uppercase",
                            color: GOLD,
                            marginBottom: 5,
                          }}
                        >
                          {item.product.category}
                        </p>
                        <p
                          style={{
                            fontFamily: INTER,
                            fontSize: 17,
                            fontWeight: 400,
                            color: INK,
                            letterSpacing: "0.01em",
                            lineHeight: 1.2,
                            marginBottom: 5,
                          }}
                        >
                          {item.product.name}
                        </p>
                        <p
                          style={{
                            fontFamily: INTER,
                            fontSize: 10,
                            fontWeight: 200,
                            letterSpacing: "0.18em",
                            color: INK3,
                            marginBottom: 16,
                          }}
                        >
                          Size: <span style={{ color: INK2 }}>{item.selectedSize}</span>
                        </p>
                      </div>

                      {/* Qty + price */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            border: `0.5px solid ${INK4}`,
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            style={{
                              width: 28,
                              height: 28,
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: INK3,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "background 0.2s, color 0.2s",
                            }}
                          >
                            <Minus size={11} strokeWidth={1.3} />
                          </button>
                          <span
                            style={{
                              width: 30,
                              textAlign: "center",
                              fontFamily: INTER,
                              fontSize: 12,
                              fontWeight: 300,
                              color: INK,
                              borderLeft: `0.5px solid ${INK4}`,
                              borderRight: `0.5px solid ${INK4}`,
                              lineHeight: "28px",
                              userSelect: "none",
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                            aria-label="Increase quantity"
                            style={{
                              width: 28,
                              height: 28,
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: INK3,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Plus size={11} strokeWidth={1.3} />
                          </button>
                        </div>

                        <span
                          style={{
                            fontFamily: INTER,
                            fontSize: 13,
                            fontWeight: 300,
                            letterSpacing: "0.08em",
                            color: INK,
                          }}
                        >
                          LKR {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      aria-label="Remove item"
                      style={{
                        position: "absolute",
                        top: 22,
                        right: 0,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: INK4,
                        padding: 2,
                        transition: "color 0.25s",
                      }}
                    >
                      <Trash2 size={14} strokeWidth={1.3} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* ── Footer ── */}
            {cartItems.length > 0 && (
              <div
                style={{
                  borderTop: `0.5px solid ${INK4}`,
                  padding: "20px 32px 28px",
                  background: IVORY,
                  flexShrink: 0,
                }}
              >
                {/* Gold accent rule */}
                <div
                  style={{
                    width: "100%",
                    height: "0.5px",
                    background: GOLD,
                    opacity: 0.3,
                    marginBottom: 18,
                  }}
                />

                {/* Totals */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 11,
                        fontWeight: 200,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: INK3,
                      }}
                    >
                      Subtotal
                    </span>
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 26,
                        fontWeight: 300,
                        color: INK,
                        letterSpacing: "0.02em",
                      }}
                    >
                      LKR {cartSubtotal.toLocaleString()}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 11,
                        fontWeight: 200,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: INK3,
                      }}
                    >
                      Shipping
                    </span>
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 10,
                        fontWeight: 300,
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: GOLD,
                      }}
                    >
                      Complimentary
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 11,
                        fontWeight: 200,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: INK3,
                      }}
                    >
                      Duties &amp; Taxes
                    </span>
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 11,
                        fontWeight: 200,
                        letterSpacing: "0.1em",
                        color: INK3,
                      }}
                    >
                      Calculated at checkout
                    </span>
                  </div>
                </div>

                {/* Hairline separator */}
                <div
                  style={{
                    width: "100%",
                    height: "0.5px",
                    background: INK4,
                    margin: "14px 0",
                  }}
                />

                {/* Brand promise note */}
                <p
                  style={{
                    fontFamily: INTER,
                    fontSize: 10,
                    fontWeight: 200,
                    letterSpacing: "0.12em",
                    color: INK3,
                    lineHeight: 1.8,
                    marginBottom: 20,
                  }}
                >
                  Your pieces will be wrapped in Moxy tissue paper and sealed with our wax emblem. Complimentary express shipping and returns on all orders.
                </p>

                {/* CTA buttons */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <Link href="/cart" onClick={() => setIsCartOpen(false)} style={{ display: "block" }}>
                    <button
                      style={{
                        width: "100%",
                        fontFamily: INTER,
                        fontSize: 10,
                        fontWeight: 300,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: INK,
                        background: "none",
                        border: `0.5px solid rgba(14,13,11,0.3)`,
                        padding: "14px 0",
                        cursor: "pointer",
                        transition: "background 0.3s",
                      }}
                    >
                      View Bag
                    </button>
                  </Link>

                  <Link href="/checkout" onClick={() => setIsCartOpen(false)} style={{ display: "block" }}>
                    <button
                      style={{
                        width: "100%",
                        fontFamily: INTER,
                        fontSize: 10,
                        fontWeight: 300,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: IVORY,
                        background: INK,
                        border: `0.5px solid ${INK}`,
                        padding: "14px 0",
                        cursor: "pointer",
                        transition: "background 0.3s",
                      }}
                    >
                      Checkout
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
