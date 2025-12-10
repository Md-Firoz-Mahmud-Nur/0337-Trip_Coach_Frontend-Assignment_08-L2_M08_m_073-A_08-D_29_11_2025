"use client";

import Link from "next/link";
import { LoginForm } from "./loginForm";

export default function Login() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50">
      <style>{`
        .float { animation: float 4s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
        .fade-in-up { animation: fadeInUp 0.6s ease-out; }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px);} to{opacity:1;transform:translateY(0);} }
      `}</style>

      {/* Floating background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="float absolute top-20 left-10 h-40 w-40 rounded-full bg-cyan-300/20"></div>
        <div
          className="float absolute top-60 right-20 h-32 w-32 rounded-full bg-sky-300/20"
          style={{ animationDelay: "2s" }}></div>
        <div
          className="float absolute bottom-32 left-1/4 h-48 w-48 rounded-full bg-cyan-200/15"
          style={{ animationDelay: "4s" }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center p-4 md:p-6">
        <div className="fade-in-up w-full max-w-md">
          {/* Header section */}
          <div className="mb-12 flex flex-col items-center gap-6">
            <Link href="/" className="flex items-center">
              <div className="group flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-500 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-cyan-300/50 dark:group-hover:shadow-cyan-900/50">
                  <svg
                    className="h-7 w-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-blue-700 bg-clip-text text-2xl font-black text-transparent md:text-3xl dark:from-sky-400 dark:via-cyan-300 dark:to-blue-400">
                  NextParcel
                </span>
              </div>
            </Link>

            <div className="text-center">
              <h1 className="mb-2 bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-3xl font-black text-transparent md:text-4xl">
                Welcome Back
              </h1>
              <p className="text-sm text-gray-600 md:text-base">
                Sign in to manage your parcels
              </p>
            </div>
          </div>

          {/* Login form card */}
          <div className="rounded-3xl border border-blue-200 bg-white/80 p-8 shadow-2xl shadow-cyan-200/20 backdrop-blur-xl md:p-10">
            <LoginForm />
          </div>

          {/* Footer text */}
          <p className="mt-6 text-center text-xs text-gray-600 md:text-sm">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
}
