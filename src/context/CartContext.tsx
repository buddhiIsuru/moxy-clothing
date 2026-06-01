"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface ToastInfo {
  message: string;
  visible: boolean;
  type?: "success" | "error";
}

export type CurrencyCode = "USD" | "LKR" | "GBP" | "EUR";

export const CURRENCIES: Record<CurrencyCode, { symbol: string; rate: number; name: string }> = {
  USD: { symbol: "$", rate: 1.0, name: "USD" },
  LKR: { symbol: "LKR ", rate: 300.0, name: "LKR" },
  GBP: { symbol: "£", rate: 0.78, name: "GBP" },
  EUR: { symbol: "€", rate: 0.92, name: "EUR" },
};

export const countryToCurrency = (country: string): CurrencyCode => {
  const norm = country.toLowerCase().trim();
  if (norm === "lk" || norm.includes("sri lanka")) return "LKR";
  if (norm === "gb" || norm.includes("united kingdom") || norm.includes("uk") || norm.includes("britain")) return "GBP";
  if (
    norm === "es" || norm === "fr" || norm === "de" || norm === "it" ||
    norm.includes("spain") || norm.includes("france") || norm.includes("germany") || norm.includes("italy") || norm.includes("europe")
  ) return "EUR";
  return "USD";
};

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toast: ToastInfo | null;
  triggerToast: (message: string, type?: "success" | "error") => void;
  hideToast: () => void;
  
  // Currency System
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  setCurrencyByCountry: (country: string) => void;
  formatPrice: (amountInUSD: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const storedCart = localStorage.getItem("moxy_cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<ToastInfo | null>(null);
  const hasMounted = useRef(false);

  // Save cart to localStorage on change
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    try {
      localStorage.setItem("moxy_cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cartItems]);

  // Manage Toast Auto-Hide
  useEffect(() => {
    if (toast && toast.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => (prev ? { ...prev, visible: false } : null));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const triggerToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, visible: true, type });
  };

  const hideToast = () => {
    setToast((prev) => (prev ? { ...prev, visible: false } : null));
  };

  const addToCart = (product: Product, size: string, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prevItems, { product, quantity, selectedSize: size }];
      }
    });

    // Trigger premium toast instead of blocking screen with drawer
    triggerToast(`Added ${product.name} (${size}) to shopping bag.`);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const detectDefaultCurrency = (): CurrencyCode => {
    if (typeof window === "undefined") return "USD";
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const lang = navigator.language.toLowerCase();
      const offset = new Date().getTimezoneOffset();
      
      // Sri Lanka and India are GMT+5:30. Timezone offset is -330 minutes
      if (
        offset === -330 ||
        tz.includes("Colombo") ||
        tz.includes("Kolkata") ||
        tz.includes("Calcutta") ||
        tz.includes("Asia/Colombo") ||
        tz.includes("Asia/Kolkata") ||
        lang.includes("si") ||
        lang.includes("ta") ||
        lang.includes("en-lk")
      ) {
        return "LKR";
      }
      if (tz.includes("London") || lang.includes("en-gb")) {
        return "GBP";
      }
      if (
        tz.includes("Madrid") ||
        tz.includes("Paris") ||
        tz.includes("Rome") ||
        tz.includes("Berlin") ||
        lang.includes("es") ||
        lang.includes("fr") ||
        lang.includes("de") ||
        lang.includes("it")
      ) {
        return "EUR";
      }
    } catch (e) {
      console.error("Failed to detect browser timezone/locale:", e);
    }
    return "USD";
  };

  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    if (typeof window === "undefined") return "USD";
    try {
      // Prioritize active checkout country selection if present
      const checkoutCountry = localStorage.getItem("moxy_checkout_country");
      if (checkoutCountry) {
        return countryToCurrency(checkoutCountry);
      }
      // Otherwise, dynamically auto-detect
      return detectDefaultCurrency();
    } catch {
      return "USD";
    }
  });

  // Dynamic client-side GeoIP detection on mount to support VPN changes
  useEffect(() => {
    const fetchGeoIP = async () => {
      // If the user has manually chosen a checkout country, respect that preference
      const checkoutCountry = localStorage.getItem("moxy_checkout_country");
      if (checkoutCountry) return;

      // Try primary GeoIP api: ipapi.co
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data && (data.country_name || data.country)) {
            const detectedCountry = data.country_name || data.country;
            console.log("GeoIP (ipapi.co) detected country:", detectedCountry);
            setCurrencyState(countryToCurrency(detectedCountry));
            return;
          }
        }
      } catch (err) {
        console.warn("ipapi.co failed, attempting secondary fallback:", err);
      }

      // Try secondary GeoIP api: ipwho.is
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        const res = await fetch("https://ipwho.is/", { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data && data.success && (data.country || data.country_code)) {
            const detectedCountry = data.country || data.country_code;
            console.log("GeoIP (ipwho.is) detected country:", detectedCountry);
            setCurrencyState(countryToCurrency(detectedCountry));
            return;
          }
        }
      } catch (err) {
        console.warn("ipwho.is failed, using local fallback:", err);
      }

      // Local offline fallback
      setCurrencyState(detectDefaultCurrency());
    };

    fetchGeoIP();
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem("moxy_currency", code);
    } catch (e) {
      console.error(e);
    }
  };

  const setCurrencyByCountry = (country: string) => {
    try {
      localStorage.setItem("moxy_checkout_country", country);
    } catch (e) {
      console.error(e);
    }
    const code = countryToCurrency(country);
    setCurrency(code);
  };

  const formatPrice = (amountInUSD: number) => {
    const config = CURRENCIES[currency];
    const converted = amountInUSD * config.rate;
    const options = currency === "LKR" ? { maximumFractionDigits: 0 } : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    return `${config.symbol}${converted.toLocaleString(undefined, options)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        toast,
        triggerToast,
        hideToast,
        currency,
        setCurrency,
        setCurrencyByCountry,
        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
