// app/success/page.tsx
"use client";

import { Suspense } from "react";
import { PaymentSuccessClient } from "./PaymentSuccessPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
          <p>Loading payment status...</p>
        </div>
      }
    >
      <PaymentSuccessClient />
    </Suspense>
  );
}
