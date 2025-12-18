"use client";

import { cn } from "@/lib/utils";
import { Bookmark, LayoutDashboard, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const userNav = [
  { href: "/tourist/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tourist/bookings", label: "My Bookings", icon: Bookmark },
  { href: "/tourist/profile", label: "Profile", icon: User },
];

export default function SidebarTourist() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button (Visible on ALL screens) */}
      <button
        onClick={() => setOpen(true)}
        className="bg-background fixed top-4 left-4 z-50 rounded-md p-2 shadow md:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={22} />
      </button>

      {/* Overlay (Mobile only) */}
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
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <div className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-blue-700 uppercase">
            Tourist
          </div>

          {/* Close button (Mobile only) */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {userNav.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)} // close on mobile click
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                <item.icon
                  size={18}
                  className={cn(
                    "shrink-0",
                    isActive ? "text-blue-600" : "text-slate-400",
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
