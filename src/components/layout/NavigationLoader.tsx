"use client";

import React, { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

function NavigationLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      // 1. Get the closest anchor tag
      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor) return;

      // 2. Get the href attribute
      const href = anchor.getAttribute("href");
      if (!href) return;

      // 3. Ignore special links (external, hashes, mailto, tel, blank targets)
      if (
        href.startsWith("http") || 
        href.startsWith("#") || 
        href.startsWith("mailto:") || 
        href.startsWith("tel:") ||
        anchor.target === "_blank"
      ) {
        return;
      }

      // 4. Ignore clicks with modifier keys (ctrl, cmd, shift, etc. to open in new tab)
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
        return;
      }

      // 5. Parse targets and verify if it's the exact same location
      try {
        const targetUrl = new URL(href, window.location.href);
        const currentUrl = new URL(window.location.href);
        
        if (
          targetUrl.pathname === currentUrl.pathname && 
          targetUrl.search === currentUrl.search
        ) {
          // If navigating to the same page, we don't need a loader
          return;
        }
      } catch (err) {
        // Safe fallback in case of malformed URLs
        return;
      }

      // 6. Set loading to true to trigger transition page immediately
      setIsLoading(true);
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <Loading 
      duration={600} 
      onComplete={() => setIsLoading(false)} 
    />
  );
}

export function NavigationLoader() {
  return (
    <Suspense fallback={null}>
      <NavigationLoaderContent />
    </Suspense>
  );
}
