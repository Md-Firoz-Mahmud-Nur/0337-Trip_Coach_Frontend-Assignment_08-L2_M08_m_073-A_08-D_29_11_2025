"use client";

import { useAuthStore } from "@/src/lib/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

export default function Header() {
  const router = useRouter();
  const { user, accessToken, logout } = useAuthStore();

  console.log({ user, accessToken, logout });

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-2xl text-blue-600">
          <Image
            src="/tripCoach.jpg"
            alt="Trip Coach Logo"
            width={40}
            height={40}
            className="rounded"
          />
          Trip Coach
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/explore" className="hover:text-blue-600">
            Explore
          </Link>
          {user?.role === "GUIDE" && (
            <Link href="/dashboard/guide" className="hover:text-blue-600">
              My Tours
            </Link>
          )}
          {user?.role === "ADMIN" && (
            <Link href="/dashboard/admin" className="hover:text-blue-600">
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {accessToken ? (
            <>
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 hover:text-blue-600">
                <FaUser /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700">
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hover:text-blue-600 font-semibold">
                Login
              </Link>
              <Link
                href="/auth/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
