/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("bookingId");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirmBooking = async () => {
      if (!bookingId) {
        setStatus("error");
        setError("Missing booking ID.");
        return;
      }

      try {
        setStatus("loading");
        setError(null);

        await api.updateBookingStatus(bookingId, {
          status: "CONFIRMED",
          paymentStatus: "PAID",
        });

        setStatus("success");
      } catch (err: any) {
        console.error("Failed to update booking after payment:", err);
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to update booking status.";
        setError(msg);
        setStatus("error");
      }
    };

    confirmBooking();
  }, [bookingId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex flex-col items-center gap-2">
            {status === "loading" && (
              <>
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                <span>Confirming your booking...</span>
              </>
            )}
            {status === "success" && (
              <>
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                <span>Payment successful</span>
              </>
            )}
            {status === "error" && (
              <>
                <AlertCircle className="h-10 w-10 text-red-600" />
                <span>Something went wrong</span>
              </>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          {status === "loading" && (
            <p className="text-sm text-slate-600">
              Please wait while your booking is being updated.
            </p>
          )}

          {status === "success" && (
            <>
              <p className="text-sm text-slate-700">
                Your booking has been confirmed. You can view it in your
                bookings page.
              </p>
              <p className="text-xs text-slate-500">
                Booking ID: <span className="font-mono">{bookingId}</span>
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => router.push("/tourist/bookings")}
                >
                  View my bookings
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push("/")}
                >
                  Go to home
                </Button>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <p className="text-sm text-red-700">{error}</p>
              <p className="text-xs text-slate-500">
                If the payment was captured but this page fails, contact support
                with your booking ID.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push("/tourist/bookings")}
                >
                  Go to my bookings
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
