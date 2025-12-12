"use client";

import PackageCard from "@/components/PackageCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchBookingsError,
  fetchBookingsStart,
  fetchUserBookingsSuccess,
} from "@/redux/slices/bookingsSlice";
import {
  fetchPackagesError,
  fetchPackagesStart,
  fetchPackagesSuccess,
} from "@/redux/slices/packagesSlice";
import { Bookmark, Loader2, Package, Wallet } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface Booking {
  status: string;
  totalAmount?: number;
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function UserDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const {
    items: packages,
    isLoading: packagesLoading,
    error: packagesError,
  } = useAppSelector((state) => state.packages);

  console.log(packages);

  const {
    userBookings,
    isLoading: bookingsLoading,
    error: bookingsError,
  } = useAppSelector((state) => state.bookings);

  console.log(userBookings);

  useEffect(() => {
    const fetchPackages = async () => {
      dispatch(fetchPackagesStart());
      try {
        const response = await api.getPackages();

        const pkgs = Array.isArray(response.data?.data)
          ? response.data.data
          : Array.isArray(response.data)
            ? response.data
            : [];

        dispatch(fetchPackagesSuccess(pkgs));
      } catch (err) {
        dispatch(
          fetchPackagesError(
            err instanceof Error ? err.message : "Failed to fetch packages",
          ),
        );
      }
    };

    if (packages.length === 0) {
      fetchPackages();
    }
  }, [dispatch, packages.length]);

  useEffect(() => {
    const fetchBookings = async () => {
      dispatch(fetchBookingsStart());
      try {
        const response = await api.getUserBookings();

        const data = Array.isArray(response.data?.data)
          ? response.data.data
          : Array.isArray(response.data)
            ? response.data
            : [];

        dispatch(fetchUserBookingsSuccess(data));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch bookings";
        dispatch(fetchBookingsError(errorMessage));
      }
    };

    if (userBookings.length === 0) {
      fetchBookings();
    }
  }, [dispatch, userBookings.length]);

  if (!user?.isGuideDocumentSubmit) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-dashed border-red-300 bg-red-50/70 px-6 py-8 text-center shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-blue-700 uppercase">
            Become a guide
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Complete your guide application
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            You have not submitted your guide documents yet. Finish your
            application to start hosting tours and earning.
          </p>
          <Link
            href="/be-guide"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
          >
            Go to application
          </Link>
        </div>
      </div>
    );
  }

  const activeCount = userBookings.filter(
    (b: Booking) => b.status === "CONFIRMED",
  ).length;
  const pendingCount = userBookings.filter(
    (b: Booking) => b.status === "PENDING",
  ).length;
  const totalSpent = userBookings.reduce(
    (sum: number, b: Booking) =>
      b.status === "CONFIRMED" ? sum + (b.totalAmount || 0) : sum,
    0,
  );

  const isLoading = packagesLoading || bookingsLoading;
  const error = packagesError || bookingsError;

  const statCards = [
    {
      title: "Active bookings",
      value: activeCount,
      icon: Bookmark,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Pending bookings",
      value: pendingCount,
      icon: Package,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      title: "Total spent",
      value: `$${totalSpent.toFixed(2)}`,
      icon: Wallet,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/20 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Your dashboard
            </h1>
            <p className="text-sm text-slate-600">
              Track your trips, bookings, and discover new packages.
            </p>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            <span className="text-sm font-medium">Something went wrong</span>
            <span className="flex-1 text-sm">{error}</span>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statCards.map((stat, idx) => (
            <Card
              key={idx}
              className={cn("border-slate-200 shadow-sm", stat.bg)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                  {stat.title}
                </CardTitle>
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    stat.bg,
                  )}
                >
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-7 w-24 animate-pulse rounded bg-slate-200" />
                ) : (
                  <div className="text-2xl font-semibold text-slate-900">
                    {stat.value}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
                Featured packages
              </h2>
              <p className="text-xs text-slate-600 md:text-sm">
                Handpicked trips recommended for you.
              </p>
            </div>
            <Link href="/packages">
              <Button variant="outline" className="bg-white">
                View all
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-slate-500" size={32} />
            </div>
          ) : packages.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">
              No packages available right now. Please check back later.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packages.slice(0, 3).map((pkg) => (
                <PackageCard key={pkg._id} package={pkg} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
