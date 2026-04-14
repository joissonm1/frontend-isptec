"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextItem {
  text: string;
  image: string;
}

export interface CircularRevealHeadingProps {
  items: TextItem[];
  centerText: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: {
    container: "h-75 w-75",
    fontSize: "text-xs",
    tracking: "tracking-[0.25em]",
    radius: 160,
    gap: 40,
    imageSize: "h-3/4 w-3/4",
    textStyle: "font-medium",
  },
  md: {
    container: "h-100 w-100",
    fontSize: "text-sm",
    tracking: "tracking-[0.3em]",
    radius: 160,
    gap: 30,
    imageSize: "h-3/4 w-3/4",
    textStyle: "font-medium",
  },
  lg: {
    container: "h-125 w-125",
    fontSize: "text-base",
    tracking: "tracking-[0.35em]",
    radius: 160,
    gap: 20,
    imageSize: "h-3/4 w-3/4",
    textStyle: "font-medium",
  },
} as const;

const usePreloadImages = (images: string[]) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (url: string): Promise<void> =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = reject;
      });

    Promise.all(images.map(loadImage))
      .then(() => setLoaded(true))
      .catch((err) => console.error("Error preloading images:", err));
  }, [images]);

  return loaded;
};

const ImagePreloader = ({ images }: { images: string[] }) => (
  <div className="hidden" aria-hidden="true">
    {images.map((src, index) => (
      <img key={index} src={src} alt="" />
    ))}
  </div>
);

const ImageOverlay = ({ image, size = "md" }: { image: string; size?: "sm" | "md" | "lg" }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
  >
    <motion.img
      src={image}
      alt=""
      className={cn(sizeConfig[size].imageSize, "rounded-full object-cover")}
      style={{ filter: "brightness(0.92)" }}
    />
  </motion.div>
);

export const CircularRevealHeading = ({ items, centerText, className, size = "md" }: CircularRevealHeadingProps) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const config = sizeConfig[size];
  const imagesLoaded = usePreloadImages(items.map((item) => item.image));

  const createTextSegments = () => {
    const totalItems = items.length;
    const totalGapDegrees = config.gap * totalItems;
    const availableDegrees = 360 - totalGapDegrees;
    const segmentDegrees = availableDegrees / totalItems;

    return items.map((item, index) => {
      const startPosition = index * (segmentDegrees + config.gap);
      const startOffset = `${(startPosition / 360) * 100}%`;

      return (
        <g key={index}>
          <text
            className={cn(
              config.fontSize,
              config.tracking,
              config.textStyle,
              "cursor-pointer select-none uppercase transition-all duration-300",
            )}
            onMouseEnter={() => imagesLoaded && setActiveImage(item.image)}
            onMouseLeave={() => setActiveImage(null)}
            style={{ transition: "all 0.3s ease" }}
          >
            <textPath
              href="#curve"
              className="fill-[url(#textGradient)] hover:fill-foreground"
              startOffset={startOffset}
              textLength={`${segmentDegrees * 1.8}`}
              lengthAdjust="spacingAndGlyphs"
            >
              {item.text}
            </textPath>
          </text>
        </g>
      );
    });
  };

  return (
    <>
      <ImagePreloader images={items.map((item) => item.image)} />

      <motion.div
        whileTap={{ scale: 0.98 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "ui-card relative overflow-hidden rounded-full border border-border",
          config.container,
          "bg-background",
          className,
        )}
      >
        <AnimatePresence>{activeImage && imagesLoaded ? <ImageOverlay image={activeImage} size={size} /> : null}</AnimatePresence>

        <motion.div
          className="absolute inset-0.5 rounded-full bg-background"
          style={{ boxShadow: "inset 6px 6px 12px var(--shadow-ambient), inset -6px -6px 12px var(--shadow-highlight)" }}
        />

        <motion.div
          className="absolute inset-3 rounded-full bg-background"
          style={{ boxShadow: "inset 4px 4px 8px var(--shadow-ambient), inset -4px -4px 8px var(--shadow-highlight)" }}
        />

        <motion.div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence>
            {!activeImage && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 rounded-3xl bg-background p-6"
                whileHover={{
                  boxShadow:
                    "inset 3px 3px 6px var(--shadow-ambient), inset -3px -3px 6px var(--shadow-highlight)",
                }}
              >
                {centerText}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="absolute inset-0"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 400 400" className="h-full w-full">
            <defs>
              <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="color-mix(in srgb, var(--color-text) 60%, transparent)" />
                <stop offset="100%" stopColor="color-mix(in srgb, var(--color-text) 85%, transparent)" />
              </linearGradient>
            </defs>
            <path
              id="curve"
              fill="none"
              d={`M 200,200 m -${config.radius},0 a ${config.radius},${config.radius} 0 1,1 ${config.radius * 2},0 a ${config.radius},${config.radius} 0 1,1 -${config.radius * 2},0`}
            />
            {createTextSegments()}
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
};
