"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionProps {
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const ease = [0.22, 1, 0.36, 1] as const;

export const Accordion: React.FC<AccordionProps> = ({ label, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "0.5px solid rgba(26,23,20,.09)" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%", padding: "16px 0",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 500,
          letterSpacing: ".22em", textTransform: "uppercase",
          color: "#1A1714", background: "transparent", border: "none", cursor: "pointer",
          transition: "color .3s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#B8A07A")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#1A1714")}
      >
        {label}
        <ChevronDown
          size={12}
          strokeWidth={1.5}
          style={{ transition: "transform .35s cubic-bezier(.22,1,.36,1)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
