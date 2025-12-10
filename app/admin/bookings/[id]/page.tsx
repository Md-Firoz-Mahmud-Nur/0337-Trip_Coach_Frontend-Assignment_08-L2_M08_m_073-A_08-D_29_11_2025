/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import {
  AlertCircle,
  ArrowLeft,
  Clock,
  Loader2,
  MapPin,
  Users,
} from "lucide-react";

function BookingDetailsPageInner() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;

  const [booking, setBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setIsLoading(true);
        const response = await api.getBookingDetails(bookingId);
        setBooking(response.data.data || response.data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to fetch booking details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl p-6 space-y-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-2 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl p-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <p className="text-sm text-slate-500">Booking not found.</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";
      case "PENDING":
        return "bg-amber-50 text-amber-700 border border-amber-100";
      case "CANCELLED":
        return "bg-red-50 text-red-700 border border-red-100";
      case "COMPLETED":
        return "bg-blue-50 text-blue-700 border border-blue-100";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-100";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";
      case "UNPAID":
        return "bg-amber-50 text-amber-700 border border-amber-100";
      case "FAILED":
      case "REFUNDED":
        return "bg-red-50 text-red-700 border border-red-100";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl p-6 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to bookings
          </Button>
          <p className="text-xs text-slate-500 font-mono">ID: {booking._id}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Left column: package + details */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-slate-200">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-semibold">
                  {booking.package?.title}
                </CardTitle>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge
                    className={getStatusColor(booking.status)}
                    variant="outline">
                    Booking: {booking.status}
                  </Badge>
                  <Badge
                    className={getPaymentStatusColor(booking.paymentStatus)}
                    variant="outline">
                    Payment: {booking.paymentStatus}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={20} className="text-blue-600" />
                    <div>
                      <p className="text-xs text-slate-500">Destination</p>
                      <p className="text-sm font-medium">
                        {booking.package?.destination}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={20} className="text-blue-600" />
                    <div>
                      <p className="text-xs text-slate-500">Duration</p>
                      <p className="text-sm font-medium">
                        {booking.package?.durationDays} days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={20} className="text-blue-600" />
                    <div>
                      <p className="text-xs text-slate-500">Participants</p>
                      <p className="text-sm font-medium">{booking.pax}</p>
                    </div>
                  </div>
                </div>

                {booking.package?.description && (
                  <div className="mt-4 border-t border-slate-200 pt-4">
                    <p className="mb-1 text-xs font-medium text-slate-500">
                      Description
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700">
                      {booking.package.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Booking details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm md:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">Booking ID</p>
                  <p className="font-mono text-xs mt-1">{booking._id}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Booking date</p>
                  <p className="mt-1">
                    {new Date(booking.createdAt).toLocaleString()}
                  </p>
                </div>
                {booking.package?.startDate && (
                  <div>
                    <p className="text-xs text-slate-500">Trip start</p>
                    <p className="mt-1">
                      {new Date(booking.package.startDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {booking.package?.endDate && (
                  <div>
                    <p className="text-xs text-slate-500">Trip end</p>
                    <p className="mt-1">
                      {new Date(booking.package.endDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {booking.package?.itinerary &&
              booking.package.itinerary.length > 0 && (
                <Card className="border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Itinerary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3">
                      {booking.package.itinerary.map(
                        (day: string, index: number) => (
                          <li key={index} className="flex gap-4">
                            <div className="min-w-16 rounded-full bg-blue-50 px-3 py-1 text-center text-xs font-semibold text-blue-700">
                              Day {index + 1}
                            </div>
                            <p className="text-sm text-slate-700">{day}</p>
                          </li>
                        )
                      )}
                    </ol>
                  </CardContent>
                </Card>
              )}

            <div className="grid gap-6 md:grid-cols-2">
              {booking.package?.included &&
                booking.package.included.length > 0 && (
                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        What&apos;s included
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {booking.package.included.map(
                          (item: string, index: number) => (
                            <li key={index} className="flex gap-2">
                              <span className="mt-0.5 text-emerald-600">✓</span>
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                )}

              {booking.package?.excluded &&
                booking.package.excluded.length > 0 && (
                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        What&apos;s not included
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {booking.package.excluded.map(
                          (item: string, index: number) => (
                            <li key={index} className="flex gap-2">
                              <span className="mt-0.5 text-red-500">✗</span>
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                )}
            </div>
          </div>

          {/* Right column: status + pricing + actions */}
          <div className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <p className="mb-1 text-xs text-slate-500">Booking status</p>
                  <Badge
                    className={getStatusColor(booking.status)}
                    variant="outline">
                    {booking.status}
                  </Badge>
                </div>
                <div>
                  <p className="mb-1 text-xs text-slate-500">Payment status</p>
                  <Badge
                    className={getPaymentStatusColor(booking.paymentStatus)}
                    variant="outline">
                    {booking.paymentStatus}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Base price</span>
                  <span className="font-medium">
                    {booking.package?.costFrom}{" "}
                    {booking.package?.currency || "USD"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Participants</span>
                  <span className="font-medium">x {booking.pax}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-semibold text-slate-800">
                    Total amount
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {booking.totalAmount} {booking.currency || "USD"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              {booking.paymentStatus === "UNPAID" && (
                <Link href={`/packages/${booking.package?.slug}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-2">
                    Complete payment
                  </Button>
                </Link>
              )}
              {booking.paymentStatus === "PAID" && (
                <Button variant="outline" className="w-full" disabled>
                  Payment completed
                </Button>
              )}
              {booking.status !== "CANCELLED" && (
                <Button variant="destructive" className="w-full">
                  Cancel booking
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingDetailsPage() {
  return <BookingDetailsPageInner />;
}
