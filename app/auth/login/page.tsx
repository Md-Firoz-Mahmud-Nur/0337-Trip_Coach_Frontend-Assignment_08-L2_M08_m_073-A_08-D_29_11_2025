/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginUser } from "@/redux/slices/authSlice";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push(
        user.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"
      );
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));

    if (result.meta.requestStatus === "fulfilled") {
      const loginedUser = result.payload as any;
      if (loginedUser?.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/tripCoach.jpg"
              alt="Trip Coach Logo"
              width={80}
              height={80}
              className="size-20"
            />
            <p className="text-sm font-semibold text-slate-900 leading-tight">
              Trip <span className="text-blue-600">Coach</span>
            </p>
            <p className="text-xs text-slate-500">
              Sign in to continue your journey
            </p>
          </div>
        </div>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">
              Welcome back
            </CardTitle>
            <CardDescription>
              Enter your details to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-red-700">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-slate-800">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="text-sm"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-slate-800">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pr-10 text-sm"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 my-auto right-3 flex items-center text-slate-400 hover:text-slate-600"
                    tabIndex={-1}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            <div className="mt-4 text-center text-xs text-slate-500">
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                className="font-medium text-blue-600 hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
