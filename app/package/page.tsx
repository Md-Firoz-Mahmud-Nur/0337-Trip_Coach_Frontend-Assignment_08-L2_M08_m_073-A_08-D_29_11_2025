"use client";

import { Suspense } from "react";
import PackagesPage from "./PackagePage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
          <p>Loading package info</p>
        </div>
      }
    >
      <PackagesPage></PackagesPage>
    </Suspense>
  );
}
