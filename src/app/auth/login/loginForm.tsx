"use client";

import type React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import PrimaryButton from "@/components/PrimaryButton";
import { useLoginMutation } from "@/redux/Auth/auth.api";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const form = useForm();
  const [login] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      console.log("data", data);
      const res = await login(data).unwrap();
      console.log("Login successful:", res);

      if (res.success) {
        toast.success("Logged in successfully");
        router.push("/");
      }

      console.log(res);
    } catch (err) {
      if (
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        typeof (err as any).data === "object" &&
        (err as any).data !== null &&
        "message" in (err as any).data
      ) {
        const message = (err as any).data.message;
        console.log(message);
        toast.warning("something is going wrong");
        if (message === "Invalid Password") {
          toast.error("Invalid credentials");
        }
        if (message === "User is not verified") {
          toast.error("Your account is not verified");
          router.push(`/verify?email=${encodeURIComponent(data.email)}`);
        }
      } else {
        toast.warning("Something went wrong");
        console.log(err);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
        <p className="text-sm text-gray-600">
          Enter your credentials to access your account
        </p>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      {...field}
                      value={field.value || ""}
                      className="border-cyan-200 bg-sky-50/50 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">
                    Password
                  </FormLabel>

                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                        value={field.value || ""}
                        className="border-cyan-200 bg-sky-50/50 pr-10 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                      />
                    </FormControl>

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 transition-colors hover:text-cyan-600">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PrimaryButton
              className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 py-2.5 font-semibold text-white shadow-lg shadow-cyan-200/50 transition-all duration-300 hover:from-cyan-600 hover:to-sky-600 hover:shadow-cyan-300/70"
              text="Sign In"
              type="submit"
            />
          </form>
        </Form>
      </div>

      <div className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-cyan-600 underline underline-offset-4 transition-colors hover:text-cyan-700">
          Create one
        </Link>
      </div>
    </div>
  );
}
