"use client";

import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(90).fill(1);
  const cols = new Array(60).fill(1);

  // Palette tuned for this project (cyan/indigo + soft accents)
  const colors = [
    "rgb(34 211 238)", // cyan-400
    "rgb(125 211 252)", // sky-300
    "rgb(165 243 252)", // cyan-200
    "rgb(129 140 248)", // indigo-400
    "rgb(196 181 253)", // violet-300
  ];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      style={{
        transform:
          "translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)",
      }}
      className={cn(
        "absolute left-1/4 -top-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4 opacity-80",
        className,
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div key={`row-${i}`} className="relative h-8 w-16 border-l border-border/50">
          {cols.map((_, j) => (
            <motion.div
              key={`col-${i}-${j}`}
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
              }}
              animate={{ transition: { duration: 2 } }}
              className={cn(
                "relative h-8 w-16 border-r border-t border-border/50 bg-transparent",
                "shadow-[inset_1px_1px_0_rgba(255,255,255,0.12)]",
              )}
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute -left-5.5 -top-3.5 h-6 w-10 text-cyan-300/60 stroke-[1px]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
