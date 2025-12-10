// "use client"

// import Link from "next/link"
// import { useAppDispatch, useAppSelector } from "@/redux/hooks"
// import { logoutUser } from "@/redux/slices/authSlice"
// import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { LogOut, Menu, LayoutDashboard } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useState } from "react"

// export default function Header() {
//   const router = useRouter()
//   const dispatch = useAppDispatch()
//   const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth)
//   const [isOpen, setIsOpen] = useState(false)

//   const handleLogout = async () => {
//     const result = await dispatch(logoutUser())
//     if (result.meta.requestStatus === "fulfilled") {
//       router.push("/")
//     }
//   }

//   const dashboardHref = user?.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"

//   return (
//     <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         <Link href="/" className="flex items-center gap-2">
//           <span className="text-2xl font-bold text-primary">Trip Coach</span>
//         </Link>

//         <nav className="hidden md:flex items-center gap-8">
//           <Link
//             href="/"
//             className="text-sm font-medium text-foreground hover:text-primary transition-colors">
//             Home
//           </Link>
//           <Link
//             href="/packages"
//             className="text-sm font-medium text-foreground hover:text-primary transition-colors">
//             Packages
//           </Link>
//         </nav>

//         <div className="flex items-center gap-4">
//           {isAuthenticated && user ? (
//             <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="gap-2 bg-transparent">
//                   {user.name || user.email}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link href={dashboardHref} className="gap-2 flex">
//                     <LayoutDashboard size={16} />
//                     Dashboard
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   onClick={handleLogout}
//                   disabled={isLoading}
//                   className="gap-2">
//                   <LogOut size={16} />
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <>
//               <Link href="/auth/login">
//                 <Button variant="outline">Login</Button>
//               </Link>
//               <Link href="/auth/register">
//                 <Button>Sign Up</Button>
//               </Link>
//             </>
//           )}

//           <div className="md:hidden">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="sm">
//                   <Menu size={20} />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem asChild>
//                   <Link href="/">Home</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link href="/packages">Packages</Link>
//                 </DropdownMenuItem>
//                 {isAuthenticated && (
//                   <DropdownMenuItem asChild>
//                     <Link href={dashboardHref}>Dashboard</Link>
//                   </DropdownMenuItem>
//                 )}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

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
    (state) => state.auth
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

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
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

        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: "/", label: "Home" },
            { href: "/packages", label: "Packages" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full">
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
                  className="gap-2 rounded-full border-slate-200 bg-white/70 px-3 text-sm font-medium hover:bg-slate-50">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                    {user.name?.[0]?.toUpperCase() ||
                      user.email?.[0]?.toUpperCase()}
                  </span>
                  <span className="max-w-[140px] truncate">
                    {user.name || user.email}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem disabled className="text-xs text-slate-500">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={dashboardHref}
                    className="flex items-center gap-2">
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="gap-2 text-red-600 focus:text-red-600">
                  <LogOut size={16} />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="rounded-full border-slate-200 px-4 text-sm">
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
                <DropdownMenuItem asChild>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/packages">Packages</Link>
                </DropdownMenuItem>
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
