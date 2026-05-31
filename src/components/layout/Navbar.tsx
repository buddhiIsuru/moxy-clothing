"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "../shared/CartDrawer";

const NAV_LINKS = [
  { label: "Men", href: "/mens" },
  { label: "Women", href: "/womens" },
  { label: "Kids", href: "/kids" },
  { label: "About", href: "/about" },
];

const SUB_LINKS = ["New Season", "Ready to Wear", "Accessories", "Bespoke", "Archive"];

const INTER = "'Inter', sans-serif";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSub, setActiveSub] = useState("New Season");

  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── MAIN HEADER ── */}
      <header
        style={{
          position: "fixed",
          left: 0,
          width: "100%",
          zIndex: 50,
          background: "#f7f4ef",
          boxShadow: isScrolled ? "0 4px 32px rgba(0,0,0,0.04)" : "none",
          transition: "top 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* ── TOP BAR ── */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 68,
          }}
        >
          {/* Left nav — desktop only */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              flex: 1,
            }}
            className="hidden lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  position: "relative",
                  fontFamily: INTER,
                  fontSize: 11,
                  fontWeight: 300,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase" as const,
                  color: "rgba(14,13,11,0.55)",
                  textDecoration: "none",
                  paddingBottom: 2,
                }}
                className="group"
              >
                <span className="group-hover:text-[#0e0d0b] transition-colors duration-300">
                  {link.label}
                </span>
                <span
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: "#b8956a" }}
                />
              </Link>
            ))}
          </nav>

          {/* Logo — always centred */}
          <Link
            href="/"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily: INTER,
                fontWeight: 300,
                fontSize: 24,
                letterSpacing: "0.38em",
                color: "#0e0d0b",
                textTransform: "uppercase",
                lineHeight: 1,
                paddingLeft: "0.38em",
              }}
            >
              Moxy
            </span>
            <span
              style={{
                fontFamily: INTER,
                fontWeight: 200,
                fontSize: 8,
                letterSpacing: "0.5em",
                color: "#b8956a",
                textTransform: "uppercase",
                paddingLeft: "0.5em",
              }}
            >
              Luxury Fashion House
            </span>
          </Link>

          {/* Right icons — desktop */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 20, flex: 1, justifyContent: "flex-end" }}
            className="hidden lg:flex"
          >
            <button
              aria-label="Search"
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,13,11,0.4)", fontSize: 15, display: "flex", alignItems: "center", padding: 0 }}
              className="hover:text-[#0e0d0b] transition-colors duration-300"
            >
              <Search size={15} strokeWidth={1.3} />
            </button>

            <div style={{ width: "0.5px", height: 14, background: "rgba(14,13,11,0.14)" }} />

            <Link
              href="/login"
              aria-label="Account"
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,13,11,0.4)", fontSize: 15, display: "flex", alignItems: "center", padding: 0 }}
              className="hover:text-[#0e0d0b] transition-colors duration-300"
            >
              <User size={15} strokeWidth={1.3} />
            </Link>

            <div style={{ width: "0.5px", height: 14, background: "rgba(14,13,11,0.14)" }} />

            <button
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,13,11,0.4)", fontSize: 15, display: "flex", alignItems: "center", padding: 0, position: "relative" }}
              className="hover:text-[#0e0d0b] transition-colors duration-300"
            >
              <ShoppingBag size={15} strokeWidth={1.3} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -6,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#0e0d0b",
                    color: "#f7f4ef",
                    fontSize: 8,
                    fontWeight: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,13,11,0.5)", position: "relative", padding: 0, display: "flex" }}
            >
              <ShoppingBag size={17} strokeWidth={1.3} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -5,
                    width: 13,
                    height: 13,
                    borderRadius: "50%",
                    background: "#0e0d0b",
                    color: "#f7f4ef",
                    fontSize: 7,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,13,11,0.55)", padding: 0, display: "flex" }}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={1.3} />
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE FULL-SCREEN MENU ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "#f7f4ef",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Head */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "0.5px solid rgba(14,13,11,0.1)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontFamily: INTER, fontWeight: 300, fontSize: 20, letterSpacing: "0.35em", color: "#0e0d0b", textTransform: "uppercase", lineHeight: 1 }}>
                  Moxy
                </span>
                <span style={{ fontFamily: INTER, fontWeight: 200, fontSize: 7, letterSpacing: "0.5em", color: "#b8956a", textTransform: "uppercase" }}>
                  Luxury Fashion House
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,13,11,0.45)", padding: 0, display: "flex" }}
                aria-label="Close menu"
              >
                <X size={18} strokeWidth={1.3} />
              </button>
            </div>

            {/* Links */}
            <div style={{ borderBottom: "0.5px solid rgba(14,13,11,0.08)" }}>
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 + 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 20px",
                      borderBottom: "0.5px solid rgba(14,13,11,0.06)",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ fontFamily: INTER, fontSize: 28, fontWeight: 300, color: "rgba(14,13,11,0.65)", letterSpacing: "0.04em" }}>
                      {link.label}
                    </span>
                    <span style={{ fontFamily: INTER, fontSize: 10, fontWeight: 200, letterSpacing: "0.3em", color: "#b8956a" }}>
                      0{idx + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Sub-links */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px 20px",
                padding: "16px 20px",
                borderBottom: "0.5px solid rgba(14,13,11,0.08)",
              }}
            >
              {SUB_LINKS.map((item) => (
                <span
                  key={item}
                  onClick={() => setActiveSub(item)}
                  style={{
                    fontFamily: INTER,
                    fontSize: 11,
                    fontWeight: 200,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: activeSub === item ? "#0e0d0b" : "rgba(14,13,11,0.4)",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div
              style={{
                marginTop: "auto",
                padding: "16px 20px",
                borderTop: "0.5px solid rgba(14,13,11,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: INTER, fontSize: 9, fontWeight: 200, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(14,13,11,0.3)" }}>
                  Colombo · London
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,13,11,0.4)", padding: 0, display: "flex" }} aria-label="Search">
                    <Search size={16} strokeWidth={1.3} />
                  </button>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,13,11,0.4)", padding: 0, display: "flex" }} aria-label="Account">
                    <User size={16} strokeWidth={1.3} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
};
