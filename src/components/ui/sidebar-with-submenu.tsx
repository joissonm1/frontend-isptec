"use client";

import Link from "next/link";
import { ReactNode, useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type MenuItem = {
  name: string;
  href: string;
  icon?: ReactNode;
  children?: MenuItem[];
};

type MenuProps = {
  item: MenuItem;
  compact?: boolean;
};

function Menu({ item, compact = false }: MenuProps) {
  const [isOpened, setIsOpened] = useState(false);
  const submenuId = useId();

  if (compact) {
    return (
      <li>
        <Link
          href={item.href}
          title={item.name}
          className="group relative flex w-full items-center justify-center rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-cyan-300"
        >
          {item.icon ? (
            <span className="text-slate-400 group-hover:text-cyan-300">
              {item.icon}
            </span>
          ) : null}
          <span className="pointer-events-none absolute left-14 hidden whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white group-hover:block">
            {item.name}
          </span>
        </Link>
      </li>
    );
  }

  if (!item.children || item.children.length === 0) {
    return (
      <li>
        <Link
          href={item.href}
          title={item.name}
          className={cn(
            "group relative flex items-center gap-2 rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-cyan-300",
            "justify-start",
          )}
        >
          {item.icon ? (
            <span className="text-slate-400 group-hover:text-cyan-300">
              {item.icon}
            </span>
          ) : null}
          <span className="text-sm font-medium">{item.name}</span>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        className={cn(
          "w-full group relative flex items-center rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-cyan-300",
          "justify-between",
        )}
        onClick={() => setIsOpened((v) => !v)}
        aria-expanded={isOpened}
        aria-controls={submenuId}
        title={item.name}
      >
        <span className="flex items-center gap-2">
          {item.icon ? (
            <span className="text-slate-400 group-hover:text-cyan-300">
              {item.icon}
            </span>
          ) : null}
          <span className="text-sm font-medium">{item.name}</span>
        </span>
        <ChevronDown
          className={cn("h-4 w-4 transition", isOpened && "rotate-180")}
        />
      </button>

      {isOpened && (
        <ul
          id={submenuId}
          className="ml-4 mt-1 space-y-1 border-l border-slate-700 pl-2 text-sm"
        >
          {item.children.map((subItem) => (
            <li key={subItem.name}>
              <Link
                href={subItem.href}
                className="block rounded-md px-2 py-1 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-300"
              >
                {subItem.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

type SidebarWithSubmenuProps = {
  items: MenuItem[];
  footerItems?: MenuItem[];
  compact?: boolean;
  className?: string;
};

export function SidebarWithSubmenu({
  items,
  footerItems = [],
  compact = false,
  className,
}: SidebarWithSubmenuProps) {
  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-100",
        compact ? "w-[78px] items-center py-4" : "w-72 p-4",
        className,
      )}
    >
      <nav className={cn("w-full", compact ? "px-1" : "")}>
        <ul className="space-y-1">
          {items.map((item) => (
            <Menu key={item.name} item={item} compact={compact} />
          ))}
        </ul>
      </nav>

      {footerItems.length > 0 && (
        <div className="mt-auto w-full border-t border-slate-800 pt-2">
          <ul className="space-y-1">
            {footerItems.map((item) => (
              <Menu key={item.name} item={item} compact={compact} />
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
