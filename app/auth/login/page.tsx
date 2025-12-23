"use client";

import { Suspense } from "react";
import LoginPage from "./LoginPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
          <p>Login Page Loading</p>
        </div>
      }
    >
      <LoginPage></LoginPage>
    </Suspense>
  );
}
