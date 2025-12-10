"use client";

import { cn } from "@/lib/utils";
import {
  Bookmark,
  CreditCard,
  LayoutDashboard,
  Package,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/bookings", label: "Bookings", icon: Bookmark },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-slate-50/90">
      <div className="flex h-16 items-center border-b border-slate-200 px-4">
        <div className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
          Admin
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {adminNav.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}>
              <item.icon
                size={18}
                className={cn(
                  "shrink-0",
                  isActive ? "text-blue-600" : "text-slate-400"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
