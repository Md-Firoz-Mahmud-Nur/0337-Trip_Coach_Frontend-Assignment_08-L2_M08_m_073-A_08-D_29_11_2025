"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex flex-col items-center gap-2">
            <AlertCircle className="h-10 w-10 text-yellow-500" />
            <span>Payment cancelled</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-slate-700">
            Your payment was cancelled. No charges have been made to your
            account.
          </p>
          <p className="text-xs text-slate-500">
            You can try again later from your bookings page if you still want to
            complete this booking.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button
              size="sm"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => router.push("/tourist/bookings")}
            >
              Go to my bookings
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push("/")}
            >
              Go to home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
