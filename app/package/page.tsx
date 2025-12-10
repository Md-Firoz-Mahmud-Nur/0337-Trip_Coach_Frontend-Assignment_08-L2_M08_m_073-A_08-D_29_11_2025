"use client";

import PackageCard from "@/components/PackageCard";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchPackagesError,
  fetchPackagesStart,
  fetchPackagesSuccess,
} from "@/redux/slices/packagesSlice";
import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function PackagesPage() {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector((state) => state.packages);

  useEffect(() => {
    const fetchPackages = async () => {
      dispatch(fetchPackagesStart());
      try {
        const response = await api.getPackages();
        dispatch(fetchPackagesSuccess(response.data.data));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch packages";
        dispatch(fetchPackagesError(errorMessage));
      }
    };

    if (items.length === 0) {
      fetchPackages();
    }
  }, [dispatch, items.length]);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Travel packages
            </h1>
            <p className="mt-2 max-w-xl text-base md:text-lg text-slate-600">
              Handpicked trips with trusted guides, flexible dates, and
              transparent pricing for every kind of traveler.
            </p>
          </div>
          <div className="rounded-full bg-white/70 px-4 py-2 text-xs text-slate-500 shadow-sm">
            No hidden fees. Secure online booking.
          </div>
        </div>

        {error && (
          <div className="mb-8 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Error loading packages</p>
              <p className="text-sm">{error}</p>
              <p className="mt-2 text-xs opacity-75">
                Make sure backend is running at http://localhost:5000
              </p>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : items.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((pkg) => (
              <PackageCard key={pkg._id} package={pkg} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white py-16 text-center">
            <p className="text-lg font-medium text-slate-700">
              No packages available right now.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Check back soon for new adventures and seasonal offers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
