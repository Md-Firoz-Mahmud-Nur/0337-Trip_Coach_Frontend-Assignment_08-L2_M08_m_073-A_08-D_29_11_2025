"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { sidebarIcons } from "./sidebarIcons";

import type { SidebarIconKey } from "./sidebarIcons";

type NavItem = {
  href: string;
  label: string;
  icon: SidebarIconKey;
};

interface BaseSidebarProps {
  role: string;
  navItems: readonly NavItem[];
}

export default function BaseSidebar({ role, navItems }: BaseSidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle */}
      <button
        onClick={() => setOpen(true)}
        className="bg-background fixed top-4 left-4 z-50 rounded-md p-2 shadow md:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-slate-200 bg-slate-50/95 transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "md:static md:flex md:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <span className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold text-blue-700 uppercase">
            {role}
          </span>

          <button onClick={() => setOpen(false)} className="md:hidden">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = sidebarIcons[item.icon];
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100",
                )}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-blue-600" : "text-slate-400"}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
