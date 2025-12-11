"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutUser } from "@/redux/slices/authSlice";
import { LayoutDashboard, LogOut, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (result.meta.requestStatus === "fulfilled") {
      router.push("/");
    }
  };

  const dashboardHref =
    user?.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard";

  const links = [
    { href: "/", label: "Home" },
    { href: "/package", label: "Explore Tours" },
    ...(!user ? [{ href: "/be-guide", label: "Become a Guide" }] : []),

    ...(user?.role === "TOURIST"
      ? [
          { href: "/be-guide", label: "Become a Guide" },
          { href: "/user/bookings", label: "My Bookings" },
          { href: "/user/profile", label: "Profile" },
        ]
      : []),
    ...(user?.role === "GUIDE"
      ? [
          { href: "/guide/packages", label: "My Packages" },
          { href: "/guide/profile", label: "Profile" },
        ]
      : []),
    ...(user?.role === "ADMIN"
      ? [
          { href: "/admin/listings", label: "Listings" },
          { href: "/admin/profile", label: "Profile" },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md supports-backdrop-filter:bg-white/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/tripCoach.jpg"
            alt="Trip Coach Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Trip <span className="text-blue-600">Coach</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-slate-600 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:text-blue-600 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 rounded-full border-slate-200 bg-white/70 px-3 text-sm font-medium hover:bg-slate-50"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                    {user.name?.[0]?.toUpperCase() ||
                      user.email?.[0]?.toUpperCase()}
                  </span>
                  <span className="max-w-[140px] truncate">
                    {user.name || user.email}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-sky-50">
                <DropdownMenuItem asChild>
                  <Link
                    href={dashboardHref}
                    className="flex items-center gap-2"
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="gap-2 text-red-600 focus:text-red-600"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="rounded-full border-slate-200 px-4 text-sm"
                >
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="rounded-full bg-blue-600 px-4 text-sm hover:bg-blue-700">
                  Sign up
                </Button>
              </Link>
            </div>
          )}

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Menu size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {links.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
                {isAuthenticated && (
                  <DropdownMenuItem asChild>
                    <Link href={dashboardHref}>Dashboard</Link>
                  </DropdownMenuItem>
                )}
                {!isAuthenticated && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/register">Sign up</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
