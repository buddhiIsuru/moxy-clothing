"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, CurrencyCode } from "@/context/CartContext";
import { CartDrawer } from "../shared/CartDrawer";
import logoImage from "@/assets/logo/black (1).png";
import { navigationService } from "@/services/navigation.service";
import { NavLink } from "@/types";

const SUB_LINKS = ["New Season", "Ready to Wear", "Accessories", "Bespoke", "Archive"];

const INTER = "'Inter', sans-serif";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSub, setActiveSub] = useState("New Season");
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);

  const { cartCount, setIsCartOpen, currency, setCurrency } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    
    // Fetch links asynchronously from the service layer
    navigationService.getNavLinks().then(setNavLinks).catch(console.error);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling while the mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

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
            padding: "0 clamp(1.25rem, 5vw, 2.5rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 68,
          }}
        >
          {/* Left nav — desktop only */}
          <nav
            style={{
              alignItems: "center",
              gap: 32,
              flex: 1,
            }}
            className="hidden lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  position: "relative",
                  fontFamily: INTER,
                  fontSize: 12,
                  fontWeight: 600,
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
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              height: "44px",
            }}
          >
            <Image
              src={logoImage}
              alt="Moxy Logo"
              height={32}
              style={{
                height: "32px",
                width: "auto",
                objectFit: "contain",
              }}
              priority
            />
          </Link>

          {/* Right icons — desktop */}
          <div
            style={{ alignItems: "center", gap: 20, flex: 1, justifyContent: "flex-end" }}
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

            <div style={{ width: "0.5px", height: 14, background: "rgb(0, 0, 0)" }} />

            <button
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgb(0, 0, 0)", fontSize: 16, display: "flex", alignItems: "center", padding: 0, position: "relative" }}
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
                    fontSize: 14,
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
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 100,
              background: "#f7f4ef",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(14,13,11,0.6)",
                padding: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.3} />
            </button>

            {/* Links Centered Vertically */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 28,
              }}
            >
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontFamily: INTER, fontSize: 32, fontWeight: 300, color: "#0e0d0b", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Sub-links */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "12px 24px",
                maxWidth: 340,
                marginTop: 48,
                padding: "0 20px",
              }}
            >
              {SUB_LINKS.map((item) => (
                <span
                  key={item}
                  onClick={() => setActiveSub(item)}
                  style={{
                    fontFamily: INTER,
                    fontSize: 10,
                    fontWeight: 400,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: activeSub === item ? "#b8956a" : "rgba(14,13,11,0.4)",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Search / User Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 44 }}>
              <button
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,13,11,0.45)", padding: 4, display: "flex" }}
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.3} />
              </button>
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,13,11,0.45)", padding: 4, display: "flex" }}
                aria-label="Account"
              >
                <User size={18} strokeWidth={1.3} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
};
