"use client";

import React, { useState, useEffect } from "react";
import Loading from "@/app/loading";

interface InitialLoaderProps {
  children: React.ReactNode;
}

export function InitialLoader({ children }: InitialLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    return (
      <Loading 
        onComplete={() => setIsLoaded(true)} 
        duration={1200} 
      />
    );
  }

  return <>{children}</>;
}
