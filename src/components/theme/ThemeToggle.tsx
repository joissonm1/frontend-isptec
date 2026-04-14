"use client";

import { useEffect, useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";

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
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    return stored ?? getSystemTheme();
  });
  const isDark = theme === "dark";

  const label = useMemo(
    () => (isDark ? "Mudar para tema claro" : "Mudar para tema escuro"),
    [isDark]
  );

  useEffect(() => {
  applyTheme(theme);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onChange = () => {
      const hasStored = window.localStorage.getItem(STORAGE_KEY);
      if (hasStored) return;
      const next = mq.matches ? "dark" : "light";
      setTheme(next);
    };

    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [theme]);

  const toggle = () => {
    const next: Theme = isDark ? "light" : "dark";
    setTheme(next);
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
          {isDark ? (
            <Moon className="ui-switch__icon" />
          ) : (
            <Sun className="ui-switch__icon" />
          )}
        </span>
      </span>
      <span className="sr-only">{label}</span>
    </button>
  );
}
