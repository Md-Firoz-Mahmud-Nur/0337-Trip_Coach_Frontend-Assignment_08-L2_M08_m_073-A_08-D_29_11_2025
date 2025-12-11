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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { registerUser } from "@/redux/slices/authSlice";
import { AlertCircle, CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [role, setRole] = useState<"TOURIST" | "GUIDE">("TOURIST");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordsDoNotMatch =
    password && confirmPassword && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setSuccessMessage("");
      return;
    }

    const result = await dispatch(
      registerUser({ name, email, password, role }),
    );

    if (result.meta.requestStatus === "fulfilled") {
      setSuccessMessage(
        "Account created successfully! Redirecting to login...",
      );
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-slate-50 to-slate-100 px-4 py-10">
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
            <p className="text-sm leading-tight font-semibold text-slate-900">
              Trip <span className="text-blue-600">Coach</span>
            </p>
            <p className="text-xs text-slate-500">
              Create your account to start planning trips
            </p>
          </div>
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">
              Create account
            </CardTitle>
            <CardDescription>
              Join Trip Coach to explore curated travel packages.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-red-700">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 flex items-start gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-green-700">
                <CheckCircle size={16} className="mt-0.5 shrink-0" />
                <span className="text-sm">{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-slate-800"
                >
                  Full name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="text-sm"
                />
              </div>

              <div>
                <RadioGroup
                  value={role}
                  onValueChange={(value) =>
                    setRole(value as "TOURIST" | "GUIDE")
                  }
                  className="gap-3 rounded-2xl bg-blue-100 p-2"
                  required
                >
                  {/* <p className="mb-1.5 px-2 text-sm font-medium text-slate-800">
                    I want to use{" "}
                    <span className="text-blue-600">Trip Coach</span> as
                  </p> */}
                  <div className="flex flex-1 items-center rounded-md border border-slate-200 bg-white px-3 py-2 hover:border-blue-300">
                    <RadioGroupItem id="role-tourist" value="TOURIST" />
                    <Label
                      htmlFor="role-tourist"
                      className="cursor-pointer text-xs text-slate-800 sm:text-sm"
                    >
                      Tourist
                      <span className="block text-[11px] text-slate-500">
                        Plan and book trips
                      </span>
                    </Label>
                  </div>

                  <div className="flex flex-1 items-center rounded-md border border-slate-200 bg-white px-3 py-2 hover:border-blue-300">
                    <RadioGroupItem id="role-guide" value="GUIDE" />
                    <Label
                      htmlFor="role-guide"
                      className="cursor-pointer text-xs text-slate-800 sm:text-sm"
                    >
                      Guide
                      <span className="block text-[11px] text-slate-500">
                        Host tours for travelers
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-slate-800"
                >
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

              <div className="space-y-3">
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-medium text-slate-800"
                  >
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
                      className="absolute inset-y-0 right-3 my-auto flex items-center text-slate-400 hover:text-slate-600"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1.5 block text-sm font-medium text-slate-800"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="pr-10 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-3 my-auto flex items-center text-slate-400 hover:text-slate-600"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {passwordsDoNotMatch && (
                    <p className="mt-1 text-xs text-red-600">
                      Passwords do not match
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading || !!passwordsDoNotMatch || !role}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </form>

            <div className="mt-4 text-center text-xs text-slate-500">
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="font-medium text-blue-600 hover:underline"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium text-blue-600 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </div>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
