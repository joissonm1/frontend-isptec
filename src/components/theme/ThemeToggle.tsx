"use client";

import { useEffect } from "react";
import { Moon } from "lucide-react";

type Theme = "light" | "dark";

const STORAGE_KEY = "unibridge-theme";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;
}

export function ThemeToggle() {
  const label = "Alternar tema";

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored ?? getSystemTheme();
    applyTheme(initial);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const hasStored = window.localStorage.getItem(STORAGE_KEY);
      if (hasStored) return;
      const next = mq.matches ? "dark" : "light";
      applyTheme(next);
    };

    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const toggle = () => {
    const current =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const isDark = current === "dark";
    const next: Theme = isDark ? "light" : "dark";
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="ui-switch"
    >
      <span className="ui-switch__track" aria-hidden="true">
        <span className="ui-switch__thumb" aria-hidden="true">
          <Moon className="ui-switch__icon" />
        </span>
      </span>
      <span className="sr-only">{label}</span>
    </button>
  );
}
