"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const WhatsAppFloat: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show premium concierge tooltip after 4 seconds
    const timer = setTimeout(() => setShowTooltip(true), 4000);
    // Auto-hide tooltip after 10 seconds to keep the screen clean
    const hideTimer = setTimeout(() => setShowTooltip(false), 12000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClick = () => {
    const phoneNumber = "94771234567"; // Luxury concierge mock number
    const message = encodeURIComponent("Hello MOXY Concierge, I would like to inquire about your collections.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 99, display: "flex", alignItems: "center", gap: 12 }}>
      {/* Tooltip / Prompt */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 12 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "rgba(247, 244, 239, 0.96)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(184, 160, 122, 0.28)",
              borderRadius: "2px",
              padding: "10px 16px",
              boxShadow: "0 10px 30px rgba(14,13,11,0.06)",
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 400,
              color: "#0e0d0b",
              whiteSpace: "nowrap",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              position: "relative",
            }}
          >
            <span style={{ fontSize: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "#b8956a" }}>
              Moxy Concierge
            </span>
            <span style={{ letterSpacing: "0.02em" }}>How may we assist you?</span>
            
            {/* Close button for tooltip */}
            <button
              onClick={() => setShowTooltip(false)}
              style={{
                position: "absolute",
                top: 4,
                right: 6,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 8,
                color: "rgba(14,13,11,0.4)",
                padding: 2,
              }}
              aria-label="Close tooltip"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "#0e0d0b", // Matches Moxy's deep ink black
          border: "1px solid rgba(184, 160, 122, 0.35)", // Matches Moxy's brand gold
          color: "#b8956a", // Matches Moxy's brand gold
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 12px 36px rgba(14,13,11,0.14)",
          position: "relative",
          outline: "none",
        }}
        className="group"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing ring */}
        <span
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: "50%",
            border: "1px solid rgba(184, 160, 122, 0.22)",
            animation: "pulse-ring 2s cubic-bezier(0.215, 0.610, 0.355, 1) infinite",
            pointerEvents: "none",
          }}
        />

        <style>{`
          @keyframes pulse-ring {
            0% { transform: scale(0.95); opacity: 0.85; }
            100% { transform: scale(1.18); opacity: 0; }
          }
        `}</style>

        {/* WhatsApp Icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ transition: "color 0.3s, transform 0.3s" }}
          className="group-hover:scale-110 group-hover:text-[#25D366]"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.593 1.981 14.121.96 11.498.96c-5.447 0-9.873 4.373-9.877 9.802-.002 1.83.483 3.61 1.402 5.17l-.995 3.635 3.738-.973zm11.226-5.836c-.287-.143-1.697-.833-1.959-.928-.262-.095-.453-.143-.644.143-.191.286-.74.928-.907 1.12-.167.19-.334.214-.621.071-.287-.143-1.21-.444-2.305-1.417-.852-.756-1.428-1.69-1.595-1.975-.167-.285-.018-.44.126-.581.129-.127.287-.333.43-.5.143-.167.191-.285.287-.476.095-.19.048-.357-.024-.5-.071-.143-.644-1.547-.882-2.118-.232-.557-.468-.481-.644-.49-.167-.008-.358-.01-.55-.01-.191 0-.501.071-.764.357-.262.285-1.002.976-1.002 2.38 0 1.404 1.026 2.76 1.169 2.95.143.19 2.019 3.067 4.891 4.302.683.293 1.217.469 1.633.6.686.217 1.311.186 1.804.113.55-.082 1.697-.69 1.936-1.356.239-.666.239-1.237.167-1.356-.072-.119-.263-.19-.55-.333z" />
        </svg>
      </motion.button>
    </div>
  );
};
