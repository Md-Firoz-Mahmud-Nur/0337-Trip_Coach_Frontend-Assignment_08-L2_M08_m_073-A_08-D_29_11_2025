"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-lg text-center">
        <div className="relative mx-auto mb-8 h-40 w-40">
          <div className="absolute inset-0 rounded-full bg-blue-100" />
          <div className="absolute inset-4 rounded-full bg-blue-500/90 blur-2xl opacity-70" />
          <div className="relative flex h-full w-full items-center justify-center">
            <span className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl font-semibold text-blue-600 shadow-lg animate-pulse">
              404
            </span>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Lost your way?
        </h1>
        <p className="mt-3 text-slate-600">
          The page you’re looking for doesn’t exist or has been moved. Let’s get
          you back on track.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => router.push("/")}>
            Go home
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
            onClick={() => router.back()}>
            Go back
          </Button>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Tip: Check the URL or use the navigation to find what you need.
        </p>
      </div>
    </div>
  );
}
