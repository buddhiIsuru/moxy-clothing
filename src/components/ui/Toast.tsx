"use client";

import React from "react";
import { AlertCircle, Check, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Typography } from "./Typography";
import { motion, AnimatePresence } from "framer-motion";

export const ToastNotification: React.FC = () => {
  const { toast, hideToast } = useCart();

  const isVisible = toast && toast.visible;
  const message = toast ? toast.message : "";
  const isError = toast?.type === "error";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 max-w-sm w-[calc(100%-3rem)] sm:w-full bg-brand-bg border border-brand-text/[0.08] shadow-[0_18px_46px_rgba(26,26,26,0.10)] p-4 flex items-center justify-between pointer-events-auto"
        >
          <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${isError ? "bg-red-700" : "bg-brand-accent"}`} />

          <div className="flex items-center gap-3 pl-1">
            <div className={`w-5 h-5 flex items-center justify-center flex-shrink-0 ${isError ? "text-red-700" : "text-brand-accent"}`}>
              {isError ? <AlertCircle size={14} /> : <Check size={14} />}
            </div>
            <Typography variant="body" className="text-xs text-[#1A1A1A] font-medium font-sans">
              {message}
            </Typography>
          </div>

          <button
            onClick={hideToast}
            className="text-brand-muted hover:text-brand-text transition-colors duration-300 ml-4 cursor-pointer p-0.5"
            aria-label="Close notification"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
