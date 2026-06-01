"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const IVORY   = "#f7f4ef";
const IVORY2  = "#ede9e1";
const INK     = "#0e0d0b";
const INK2    = "rgba(14,13,11,0.55)";
const INK3    = "rgba(14,13,11,0.32)";
const INK4    = "rgba(14,13,11,0.1)";
const GOLD    = "#b8956a";
const GOLD2   = "#d4b48a";
const INTER   = "'Inter', sans-serif";

// ─── Sub-components ────────────────────────────────────────────────────────────

const FieldLabel: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    style={{
      fontFamily: INTER,
      fontSize: 10,
      fontWeight: 200,
      letterSpacing: "0.38em",
      textTransform: "uppercase",
      color: GOLD,
      display: "block",
      marginBottom: 8,
    }}
  >
    {children}
  </label>
);

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect") || "/cart";
    localStorage.setItem("moxy_auth", "true");
    localStorage.setItem("moxy_customer_email", email);
    router.push(redirect);
  }

  const inputStyle = (id: string): React.CSSProperties => ({
    width: "100%",
    background: IVORY2,
    border: `0.5px solid ${focusedField === id ? "rgba(184,149,106,0.6)" : INK4}`,
    padding: "13px 40px 13px 14px",
    fontFamily: INTER,
    fontSize: 13,
    fontWeight: 300,
    letterSpacing: "0.08em",
    color: INK,
    outline: "none",
    transition: "border-color 0.3s",
  });

  return (
    <div style={{ minHeight: "100vh", background: IVORY, display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main
        style={{
          flex: 1,
          marginTop: 64, // navbar height offset
        }}
        className="grid grid-cols-1 md:grid-cols-2"
      >

        {/* ── LEFT PANEL — brand editorial ── */}
        <div
          style={{
            background: INK,
            padding: "clamp(2.5rem, 6vw, 4.5rem) clamp(1.25rem, 5vw, 3.5rem)",
          }}
          className="hidden md:flex flex-col items-center justify-center"
        >
          {/* Top ornament */}
          <div style={{ width: "0.5px", height: 48, background: "rgba(184,149,106,0.4)", marginBottom: 28 }} />

          <span
            style={{
              fontFamily: INTER,
              fontSize: 10,
              fontWeight: 200,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 16,
            }}
          >
            Member Access
          </span>

          <h2
            style={{
              fontFamily: INTER,
              fontSize: "clamp(36px,4vw,52px)",
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: "0.03em",
              color: IVORY,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Welcome
          </h2>

          <p
            style={{
              fontFamily: INTER,
              fontSize: 11,
              fontWeight: 200,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(247,244,239,0.3)",
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            Summer Atelier 2026
          </p>

          {/* Gold divider */}
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
            <div style={{ flex: 1, height: "0.5px", background: "rgba(184,149,106,0.2)" }} />
            <div style={{ width: 5, height: 5, background: GOLD, transform: "rotate(45deg)", flexShrink: 0 }} />
            <div style={{ flex: 1, height: "0.5px", background: "rgba(184,149,106,0.2)" }} />
          </div>

          <p
            style={{
              fontFamily: INTER,
              fontSize: 12,
              fontWeight: 200,
              lineHeight: 1.9,
              color: "rgba(247,244,239,0.38)",
              textAlign: "center",
              maxWidth: 280,
            }}
          >
            <span style={{ fontWeight: 300, color: "rgba(247,244,239,0.6)" }}>Exclusive member benefits</span>
            {" "}— early access to new collections, complimentary alterations, and bespoke atelier appointments reserved only for our community.
          </p>

          {/* Bottom ornament */}
          <div style={{ width: "0.5px", height: 32, background: "rgba(184,149,106,0.3)", marginTop: 40 }} />
        </div>

        {/* ── RIGHT PANEL — login form ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(2.5rem, 8vw, 4.5rem) clamp(1.25rem, 5vw, 3.5rem)",
            background: IVORY,
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              maxWidth: 360,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Form header */}
            <span
              style={{
                fontFamily: INTER,
                fontSize: 10,
                fontWeight: 200,
                letterSpacing: "0.5em",
                textTransform: "uppercase",
                color: GOLD,
                marginBottom: 12,
              }}
            >
              My Account
            </span>

            <h1
              style={{
                fontFamily: INTER,
                fontSize: 42,
                fontWeight: 300,
                letterSpacing: "0.02em",
                color: INK,
                lineHeight: 1.05,
                marginBottom: 6,
              }}
            >
              Sign In
            </h1>

            <p
              style={{
                fontFamily: INTER,
                fontSize: 11,
                fontWeight: 200,
                letterSpacing: "0.18em",
                color: INK3,
                marginBottom: 32,
              }}
            >
              Access your wardrobe
            </p>

            {/* Gold rule */}
            <div style={{ width: "100%", height: "0.5px", background: GOLD, opacity: 0.3, marginBottom: 28 }} />

            {/* Email field */}
            <div style={{ marginBottom: 16, position: "relative" }}>
              <FieldLabel htmlFor="lp-email">Email Address</FieldLabel>
              <input
                id="lp-email"
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                style={inputStyle("email")}
              />
              <Mail
                size={15}
                strokeWidth={1.3}
                style={{
                  position: "absolute",
                  right: 12,
                  bottom: 14,
                  color: INK4,
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Password field */}
            <div style={{ marginBottom: 8, position: "relative" }}>
              <FieldLabel htmlFor="lp-password">Password</FieldLabel>
              <input
                id="lp-password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                style={inputStyle("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: 10,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 2,
                  color: INK3,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword
                  ? <EyeOff size={15} strokeWidth={1.3} />
                  : <Eye size={15} strokeWidth={1.3} />
                }
              </button>
            </div>

            {/* Forgot password */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
              <Link
                href="/forgot-password"
                style={{
                  fontFamily: INTER,
                  fontSize: 10,
                  fontWeight: 200,
                  letterSpacing: "0.2em",
                  color: INK3,
                  textDecoration: "none",
                  borderBottom: `0.5px solid transparent`,
                  paddingBottom: 1,
                  transition: "color 0.25s, border-color 0.25s",
                }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Primary CTA */}
            <button
              type="submit"
              style={{
                width: "100%",
                fontFamily: INTER,
                fontSize: 11,
                fontWeight: 300,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: IVORY,
                background: INK,
                border: `0.5px solid ${INK}`,
                padding: "15px 0",
                cursor: "pointer",
                transition: "background 0.3s",
                marginBottom: 12,
              }}
            >
              Sign In to Account
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ flex: 1, height: "0.5px", background: INK4 }} />
              <span
                style={{
                  fontFamily: INTER,
                  fontSize: 9,
                  fontWeight: 200,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: INK3,
                }}
              >
                or
              </span>
              <div style={{ flex: 1, height: "0.5px", background: INK4 }} />
            </div>

            {/* Guest CTA */}
            <button
              type="button"
              onClick={() => router.push("/collections")}
              style={{
                width: "100%",
                fontFamily: INTER,
                fontSize: 11,
                fontWeight: 300,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: INK,
                background: "none",
                border: `0.5px solid rgba(14,13,11,0.25)`,
                padding: "14px 0",
                cursor: "pointer",
                transition: "background 0.3s",
                marginBottom: 32,
              }}
            >
              Continue as Guest
            </button>

            {/* Register link */}
            <p style={{ textAlign: "center" }}>
              <span
                style={{
                  fontFamily: INTER,
                  fontSize: 11,
                  fontWeight: 200,
                  letterSpacing: "0.12em",
                  color: INK3,
                }}
              >
                New here?{" "}
              </span>
              <Link
                href="/register"
                style={{
                  fontFamily: INTER,
                  fontSize: 11,
                  fontWeight: 300,
                  letterSpacing: "0.15em",
                  color: INK,
                  textDecoration: "none",
                  borderBottom: `0.5px solid rgba(14,13,11,0.3)`,
                  paddingBottom: 1,
                }}
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
