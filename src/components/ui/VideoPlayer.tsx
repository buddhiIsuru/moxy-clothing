"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  overlayClassName?: string;
  showControls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  overlayGradient?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  className,
  overlayClassName,
  showControls = false,
  autoplay = true,
  loop = true,
  muted = true,
  overlayGradient = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (autoplay) {
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [autoplay, src]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-black", className)}>
      {/* Video element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-1000",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        muted={isMuted}
        loop={loop}
        playsInline
        onLoadedData={() => setIsLoaded(true)}
      />

      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="w-10 h-10 border border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Gradient Overlays for Cinematic Blending */}
      {overlayGradient && (
        <>
          {/* Top Fade */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none" />
          {/* Bottom Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
          {/* Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none hidden md:block" />
          {/* Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none hidden md:block" />
        </>
      )}

      {/* Custom HUD-style control overlay */}
      {showControls && isLoaded && (
        <div className={cn("absolute bottom-6 right-6 z-10 flex items-center gap-3", overlayClassName)}>
          <button
            onClick={togglePlay}
            className="p-3 bg-black/60 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white backdrop-blur-md transition-all duration-300 rounded-full cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={toggleMute}
            className="p-3 bg-black/60 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white backdrop-blur-md transition-all duration-300 rounded-full cursor-pointer"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      )}
    </div>
  );
};
