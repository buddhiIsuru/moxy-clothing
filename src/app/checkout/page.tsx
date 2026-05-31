"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock } from "lucide-react";
import { Navbar }  from "@/components/layout/Navbar";
import { Footer }  from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Ornament } from "@/components/ui/Ornament";
import { Grain } from "@/components/ui/Grain";

const ease = [0.22, 1, 0.36, 1] as const;

interface FieldProps {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}
const Field: React.FC<FieldProps> = ({ label, optional, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: ".22em", textTransform: "uppercase", color: "#7A7269" }}>
      {label}
      {optional && <span style={{ fontWeight: 300, opacity: .6, marginLeft: 4 }}>(Optional)</span>}
    </label>
    {children}
  </div>
);

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,.52)",
  border: "0.5px solid rgba(26,23,20,.08)",
  padding: "13px 14px",
  fontFamily: "'Inter', sans-serif",
  fontSize: 12.5,
  fontWeight: 300,
  color: "#1A1714",
  outline: "none",
  transition: "border-color .3s, background .3s",
  WebkitAppearance: "none",
};

const StepPanel: React.FC<{ num: string; title: string; delay?: number; children: React.ReactNode }> = ({ num, title, delay = 0, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { delay, duration: 0.85, ease } }}
    style={{ marginBottom: 0 }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 0", borderBottom: "0.5px solid rgba(26,23,20,.08)" }}>
      <div style={{
        width: 26, height: 26, border: "0.5px solid rgba(184,160,122,.28)", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Inter', sans-serif", fontSize: 9.5, fontWeight: 400, letterSpacing: ".06em", color: "#B8A07A",
      }}>
        {num}
      </div>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: ".28em", textTransform: "uppercase", color: "#1A1714" }}>
        {title}
      </span>
    </div>
    <div style={{ padding: "24px 0 28px", borderBottom: "0.5px solid rgba(26,23,20,.08)" }}>
      {children}
    </div>
  </motion.div>
);

const PROGRESS_STEPS = ["Bag", "Details", "Payment", "Confirm"];

export default function CheckoutPage() {
  const router = useRouter();
  const { cartSubtotal, cartItems, triggerToast } = useCart();
  const [delivery, setDelivery] = useState<"express" | "pickup">("express");

  useEffect(() => {
    const loggedIn = localStorage.getItem("moxy_auth") === "true";
    if (!loggedIn) router.replace(`/login?redirect=${encodeURIComponent("/checkout")}`);
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Order confirmed. Thank you — your wardrobe is on its way.", "success");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');

        .co { --gold:#B8A07A; --gold-d:rgba(184,160,122,.25); --ink:#1A1714; --mist:#7A7269; --cream:#F2EDE5; --surface:rgba(255,255,255,.52); --rule:rgba(26,23,20,.08); font-family:'Inter',sans-serif; }

        /* Input focus */
        .co-input:focus { border-color: #B8A07A !important; background: rgba(255,255,255,.72) !important; }
        .co-input::placeholder { color: rgba(122,114,105,.42); }
        .co-input option { font-family:'Inter',sans-serif; font-size:13px; background:#F2EDE5; color:#1A1714; }

        /* Method card */
        .co-method { display:flex; align-items:center; gap:14px; padding:16px 18px; border:0.5px solid rgba(26,23,20,.08); background:rgba(255,255,255,.52); cursor:pointer; transition:border-color .35s, background .35s; }
        .co-method.active { border-color:#B8A07A; background:rgba(255,255,255,.72); }
        .co-method-radio { width:16px; height:16px; border:0.5px solid rgba(26,23,20,.22); border-radius:50%; flex-shrink:0; position:relative; transition:border-color .3s; }
        .co-method.active .co-method-radio { border-color:#B8A07A; }
        .co-method-radio::after { content:''; position:absolute; inset:4px; border-radius:50%; background:#B8A07A; opacity:0; transition:opacity .25s; }
        .co-method.active .co-method-radio::after { opacity:1; }

        /* Pay button */
        .co-pay { display:block; width:100%; margin-top:28px; padding:17px; background:#1A1714; color:#F2EDE5; border:none; cursor:pointer; font-family:'Inter',sans-serif; font-size:9.5px; font-weight:500; letter-spacing:.3em; text-transform:uppercase; text-align:center; position:relative; overflow:hidden; transition:color .65s cubic-bezier(.22,1,.36,1); }
        .co-pay::before { content:''; position:absolute; inset:0; background:#B8A07A; transform:scaleX(0); transform-origin:left; transition:transform .65s cubic-bezier(.22,1,.36,1); }
        .co-pay:hover::before { transform:scaleX(1); }
        .co-pay-inner { position:relative; z-index:1; display:flex; align-items:center; justify-content:center; gap:12px; }
        .co-pay-shimmer { position:absolute; top:0; left:-80%; width:48%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent); transform:skewX(-18deg); animation:co-shimmer 3.5s 1s ease-in-out infinite; pointer-events:none; }
        @keyframes co-shimmer { 0%{left:-80%} 100%{left:160%} }

        /* Aside */
        .co-aside-item { display:flex; gap:14px; padding:14px 0; border-bottom:0.5px solid rgba(26,23,20,.08); }
        .co-aside-item:last-child { border-bottom:none; }
        .co-aside-img { width:52px; aspect-ratio:3/4; flex-shrink:0; background:#E0DDD5; border:0.5px solid rgba(26,23,20,.08); position:relative; overflow:hidden; }
      `}</style>

      <div className="co" style={{ background: "#F2EDE5", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Grain />
        <Navbar />

        <main style={{ flex: 1, position: "relative", zIndex: 1, maxWidth: 1160, width: "100%", margin: "0 auto", padding: "clamp(6rem,12vh,8rem) 40px clamp(4rem,8vh,6rem)" }}>

          {/* ── Header ── */}
          <motion.div initial={{ opacity: 0, y: 22, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: 0.05, duration: 0.85, ease } }}
            style={{ marginBottom: 36 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 24, height: 1, background: "#B8A07A" }} />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: ".30em", textTransform: "uppercase", color: "#B8A07A" }}>Secure Checkout</p>
            </div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 200, fontSize: "clamp(2.6rem,5vw,3.8rem)", letterSpacing: "-.015em", lineHeight: 1, color: "#1A1714" }}>
              Complete Your Order
            </h1>
          </motion.div>

          {/* ── Progress steps ── */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.08, duration: 0.7 } }}
            style={{ display: "flex", alignItems: "center", marginBottom: 40 }} role="list" aria-label="Checkout steps"
          >
            {PROGRESS_STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div role="listitem" style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 400, letterSpacing: ".18em", textTransform: "uppercase",
                  color: i === 0 ? "#B8A07A" : i === 1 ? "#1A1714" : "rgba(26,23,20,.28)" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", border: `0.5px solid ${i <= 1 ? "#B8A07A" : "rgba(26,23,20,.22)"}`, background: i <= 1 ? "#B8A07A" : "transparent" }} />
                  {s}
                </div>
                {i < PROGRESS_STEPS.length - 1 && <div style={{ flex: 1, height: 1, background: "rgba(184,160,122,.22)", margin: "0 10px" }} />}
              </React.Fragment>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.7 } }} style={{ marginBottom: 44 }}>
            <Ornament />
          </motion.div>

          {/* Responsive Split Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 0 }}>

              {/* 01 Customer */}
              <StepPanel num="01" title="Customer Details" delay={0.12}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Full Name">
                    <input required placeholder="Alexandre Laurent" className="co-input" style={inputStyle} />
                  </Field>
                  <Field label="Email Address">
                    <input required type="email" placeholder="a.laurent@email.com" className="co-input" style={inputStyle} />
                  </Field>
                  <div style={{ gridColumn: "span 2" }}>
                    <Field label="Contact Number">
                      <input required type="tel" placeholder="+1 (000) 000-0000" className="co-input" style={inputStyle} />
                    </Field>
                  </div>
                </div>
              </StepPanel>

              {/* 02 Address */}
              <StepPanel num="02" title="Delivery Address" delay={0.18}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Country">
                    <select required className="co-input" style={inputStyle} defaultValue="">
                      <option value="" disabled>Select country</option>
                      <option>Sri Lanka</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>France</option>
                      <option>Japan</option>
                    </select>
                  </Field>
                  <Field label="Region / State">
                    <select required className="co-input" style={inputStyle} defaultValue="">
                      <option value="" disabled>Select region</option>
                      <option>Western Province</option>
                      <option>Central Province</option>
                      <option>California</option>
                      <option>London</option>
                      <option>Île-de-France</option>
                    </select>
                  </Field>
                  <div style={{ gridColumn: "span 2" }}>
                    <Field label="Address Line 1">
                      <input required placeholder="Street address" className="co-input" style={inputStyle} />
                    </Field>
                  </div>
                  <div style={{ gridColumn: "span 2" }}>
                    <Field label="Address Line 2" optional>
                      <input placeholder="Apartment, suite, floor…" className="co-input" style={inputStyle} />
                    </Field>
                  </div>
                  <Field label="City">
                    <input required placeholder="City" className="co-input" style={inputStyle} />
                  </Field>
                  <Field label="Postal Code">
                    <input required placeholder="00000" className="co-input" style={inputStyle} />
                  </Field>
                </div>
              </StepPanel>

              {/* 03 Method */}
              <StepPanel num="03" title="Delivery Method" delay={0.24}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    { key: "express", label: "Express Delivery", sub: "Complimentary · 1–3 days" },
                    { key: "pickup",  label: "Atelier Pickup",   sub: "Ready within 24 hours" },
                  ].map(({ key, label, sub }) => (
                    <label key={key} className={`co-method ${delivery === key ? "active" : ""}`}
                      onClick={() => setDelivery(key as "express" | "pickup")}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="co-method-radio" />
                      <div>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 400, letterSpacing: ".08em", color: "#1A1714" }}>{label}</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9.5, fontWeight: 300, color: "#7A7269", marginTop: 2 }}>{sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <AnimatePresence>
                  {delivery === "pickup" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto", transition: { duration: 0.38, ease } }}
                      exit={{ opacity: 0, height: 0, transition: { duration: 0.28, ease } }}
                      style={{ overflow: "hidden", marginTop: 16 }}
                    >
                      <div style={{ padding: "14px 18px", background: "rgba(184,160,122,.07)", border: "0.5px solid rgba(184,160,122,.25)", fontFamily: "'Inter', sans-serif", fontSize: 11.5, fontWeight: 300, color: "#7A7269", lineHeight: 1.75 }}>
                        <span style={{ fontWeight: 400, color: "#1A1714" }}>MOXY Atelier</span> — 42 Galle Road, Colombo 03.
                        Orders confirmed by our concierge team within the hour.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StepPanel>

              {/* 04 Payment */}
              <StepPanel num="04" title="Payment" delay={0.30}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ gridColumn: "span 2" }}>
                    <Field label="Cardholder Name">
                      <input required placeholder="Name as on card" className="co-input" style={inputStyle} />
                    </Field>
                  </div>
                  <div style={{ gridColumn: "span 2" }}>
                    <Field label="Card Number">
                      <input required placeholder="0000  0000  0000  0000" className="co-input" style={{ ...inputStyle, letterSpacing: ".06em" }} />
                    </Field>
                  </div>
                  <Field label="Expiry (MM / YY)">
                    <input required placeholder="MM / YY" className="co-input" style={inputStyle} />
                  </Field>
                  <Field label="CVC">
                    <input required placeholder="•••" className="co-input" style={inputStyle} />
                  </Field>
                </div>

                <button type="submit" className="co-pay">
                  <div className="co-pay-inner">
                    <Lock size={12} strokeWidth={1.5} />
                    Confirm &amp; Pay — ${cartSubtotal.toLocaleString()}
                  </div>
                  <div className="co-pay-shimmer" aria-hidden="true" />
                </button>

                <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 14, fontFamily: "'Inter', sans-serif", fontSize: 9.5, fontWeight: 300, color: "#7A7269", letterSpacing: ".06em" }}>
                  <Lock size={11} strokeWidth={1.5} />
                  SSL encrypted · PCI compliant · All duties included
                </p>
              </StepPanel>
            </form>

            {/* ── Order Summary aside ── */}
            <motion.aside
              initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: 0.15, duration: 0.85, ease } }}
              style={{ background: "rgba(255,255,255,.52)", border: "0.5px solid rgba(26,23,20,.08)", backdropFilter: "blur(8px)", padding: 28, position: "sticky", top: 32 }}
              aria-label="Order summary"
            >
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1.4rem", letterSpacing: "-.01em", color: "#1A1714", marginBottom: 24 }}>
                Your Order
              </h2>

              {/* Items */}
              <div>
                {cartItems.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="co-aside-item">
                    <div className="co-aside-img">
                      <Image src={item.product.imageUrl} alt={item.product.name} fill sizes="52px" className="object-cover" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: ".95rem", letterSpacing: ".02em", color: "#1A1714", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.product.name}
                      </p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9.5, fontWeight: 300, color: "#7A7269", letterSpacing: ".04em" }}>
                        Size {item.selectedSize} · Qty {item.quantity}
                      </p>
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: ".95rem", color: "#7A7269", flexShrink: 0, paddingTop: 2 }}>
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <hr style={{ border: "none", borderTop: "0.5px solid rgba(26,23,20,.08)", margin: "16px 0" }} />

              {[
                { label: "Subtotal",       value: `$${cartSubtotal.toLocaleString()}`, gold: false },
                { label: "Delivery",       value: "Complimentary", gold: true },
                { label: "Duties & taxes", value: "Included",      gold: true },
              ].map(({ label, value, gold }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 300, letterSpacing: ".06em", color: "#7A7269" }}>{label}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: gold ? 11 : 12, fontWeight: 400, color: gold ? "#B8A07A" : "#1A1714", letterSpacing: gold ? ".08em" : 0 }}>{value}</span>
                </div>
              ))}

              <hr style={{ border: "none", borderTop: "0.5px solid rgba(26,23,20,.08)", margin: "16px 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: ".22em", textTransform: "uppercase", color: "#7A7269" }}>Total</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1.9rem", letterSpacing: "-.01em", color: "#1A1714" }}>
                  ${cartSubtotal.toLocaleString()}
                </span>
              </div>
            </motion.aside>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
