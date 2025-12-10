/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import type { Package } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchPackageDetailError,
  fetchPackageDetailStart,
  fetchPackageDetailSuccess,
} from "@/redux/slices/packagesSlice";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  MapPinIcon,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PackageDetailPage() {
  const params = useParams();
  const id = params._id as string;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { selectedPackage, isLoading, error } = useAppSelector(
    (state) => state.packages
  );
  const [localPackage, setLocalPackage] = useState<Package | null>(null);

  const [pax, setPax] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackageDetail = async () => {
      dispatch(fetchPackageDetailStart());
      try {
        const response = await api.getPackageById(id);
        const pkg = response.data.data || response.data;
        setLocalPackage(pkg);
        dispatch(fetchPackageDetailSuccess(pkg));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch package";
        dispatch(fetchPackageDetailError(errorMessage));
      }
    };

    fetchPackageDetail();
  }, [dispatch, id]);

  const pkg = localPackage || selectedPackage;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">{error || "Package not found"}</p>
              <p className="mt-1 text-sm">
                Make sure backend is running at http://localhost:5000/api/v1
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const mainImage =
    pkg.images && pkg.images.length > 0
      ? pkg.images[0]
      : "/pexels-dreamlensproduction-2450296.jpg";

  const handleBookNow = async () => {
    if (!pkg?._id) return;

    try {
      setIsBooking(true);
      setBookingError(null);

      const bookingRes = await api.createBooking({
        package: pkg._id,
        pax: pax || 1,
      });
      const booking = bookingRes.data.data || bookingRes.data;
      const bookingId = booking._id;

      const paymentRes = await api.initStripeCheckout({ bookingId });
      const data = paymentRes.data.data || paymentRes.data;
      const url = data.url;

      if (!url) {
        throw new Error("Stripe checkout URL missing");
      }

      window.location.href = url;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err.message ||
        "Failed to start booking";
      setBookingError(msg);
      console.error("BookNow error:", msg);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="overflow-hidden rounded-2xl bg-slate-200">
          <div className="relative aspect-video">
            <Image
              src={mainImage || "/placeholder.svg"}
              alt={pkg.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-black/45 px-4 py-3 text-xs text-white backdrop-blur">
              <div className="flex items-center gap-2">
                <MapPinIcon size={16} />
                <span>{pkg.destination}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {pkg.durationDays} days
                </span>
                <span className="flex items-center gap-1">
                  <Users size={16} />
                  {pkg.availableSeats} seats left
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Title + summary */}
        <div className="mt-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            {pkg.title}
          </h1>
          <p className="mt-3 text-lg text-slate-600">{pkg.summary}</p>
        </div>

        {/* Booking card now directly below title/summary */}
        <div className="mt-6">
          <Card className="border-slate-200 shadow-md">
            <CardHeader>
              <CardTitle>Book this package</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Price from
                </div>
                <div className="mt-1 text-3xl font-bold text-blue-600">
                  {pkg.costFrom.toLocaleString()} {pkg.currency}
                </div>
                <p className="text-xs text-slate-500">
                  Per person, excluding flights
                </p>
              </div>

              <div>
                <div className="mb-1 text-sm text-slate-600">
                  Number of people
                </div>
                <Input
                  type="number"
                  min={1}
                  max={pkg.availableSeats || undefined}
                  value={pax}
                  onChange={(e) => setPax(Number(e.target.value) || 1)}
                />
                {pkg.availableSeats !== undefined && (
                  <p className="mt-1 text-xs text-slate-500">
                    Available seats: {pkg.availableSeats}
                  </p>
                )}
              </div>

              <div className="rounded-lg bg-slate-50 p-3 text-sm">
                <div className="mb-1 font-semibold text-slate-800">
                  Travel dates
                </div>
                <p className="text-slate-600">
                  {new Date(pkg.startDate).toLocaleDateString()} –{" "}
                  {new Date(pkg.endDate).toLocaleDateString()}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3 text-sm">
                <div className="mb-1 font-semibold text-slate-800">
                  Departure & arrival
                </div>
                <p className="text-slate-600">From: {pkg.departureLocation}</p>
                <p className="text-slate-600">To: {pkg.arrivalLocation}</p>
              </div>

              {bookingError && (
                <p className="text-sm text-red-600">{bookingError}</p>
              )}

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleBookNow}
                  disabled={isBooking}>
                  {isBooking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Redirecting to payment...
                    </>
                  ) : (
                    "Book now"
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/contact")}>
                  Contact us
                </Button>
              </div>

              <div className="mt-3 border-t border-slate-200 pt-3 text-xs text-slate-500 space-y-1">
                <div className="flex justify-between">
                  <span>Age range</span>
                  <span className="font-medium">
                    {pkg.minAge}-{pkg.maxAge} years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Trip type</span>
                  <span className="font-medium">
                    {(pkg.packageType as any)?.name ?? "N/A"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Long-form content below booking card */}
        <div className="mt-10 space-y-8">
          <div className="space-y-4 text-sm leading-relaxed text-slate-700">
            <p>{pkg.description}</p>
          </div>

          {pkg.itinerary && pkg.itinerary.length > 0 && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {pkg.itinerary.map((day, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="min-w-16 rounded-full bg-blue-50 px-3 py-1 text-center text-xs font-semibold text-blue-700">
                        Day {index + 1}
                      </div>
                      <p className="text-sm leading-relaxed text-slate-700">
                        {day}
                      </p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}

          {pkg.included && pkg.included.length > 0 && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>What&apos;s included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 text-sm md:grid-cols-2">
                  {pkg.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle
                        size={18}
                        className="mt-0.5 shrink-0 text-green-500"
                      />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {pkg.excluded && pkg.excluded.length > 0 && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>What&apos;s not included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  {pkg.excluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1 text-red-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {pkg.amenities && pkg.amenities.length > 0 && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
                  {pkg.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                      <CheckCircle
                        size={14}
                        className="shrink-0 text-blue-500"
                      />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
