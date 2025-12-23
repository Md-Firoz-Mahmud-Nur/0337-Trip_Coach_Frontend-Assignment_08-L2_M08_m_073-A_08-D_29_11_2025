"use client";

import PackageCard from "@/components/PackageCard";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchPackagesError,
  fetchPackagesStart,
  fetchPackagesSuccess,
} from "@/redux/slices/packagesSlice";
import { AlertCircle, Loader2, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PackagesPage() {
  const dispatch = useAppDispatch();
  const { items, isLoading, error, meta } = useAppSelector(
    (state) => state.packages,
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const destination = searchParams.get("destination") || "";
  const [localQuery, setLocalQuery] = useState(destination); // sync with URL

  const applySearch = () => {
    const params = new URLSearchParams(searchParams);
    if (localQuery.trim()) {
      params.set("destination", localQuery.trim());
      params.set("page", "1"); // reset to first page on new search
    } else {
      params.delete("destination");
      params.set("page", "1");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // keep input in sync when user arrives via URL
  useEffect(() => {
    setLocalQuery(destination);
  }, [destination]);

  const page = Number(searchParams.get("page") || "1");
  const limit = 10;

  const fetchPackages = async () => {
    dispatch(fetchPackagesStart());
    try {
      const params: Record<string, string | number> = {
        page,
        limit,
      };
      if (destination) {
        params.destination = destination;
      }

      const response = await api.getPackages(params);
      const { data, meta } = response.data;

      dispatch(fetchPackagesSuccess({ data, meta }));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch packages";
      dispatch(fetchPackagesError(errorMessage));
    }
  };

  useEffect(() => {
    fetchPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination, page]);

  const totalPages = meta?.totalPage || 1;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Travel packages
            </h1>
            <p className="mt-2 max-w-xl text-base text-slate-600 md:text-lg">
              Handpicked trips with trusted guides, flexible dates, and
              transparent pricing for every kind of traveler.
            </p>
          </div>
          <div className="rounded-full border border-slate-600 bg-white/70 px-4 py-2 text-xs text-slate-500 shadow-sm">
            No hidden fees. Secure online booking.
          </div>
        </div>

        {/* Search bar on packages page */}
        <div className="mb-6 flex justify-center">
          <div className="relative flex h-12 w-full max-w-xl items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <Search className="text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Where are you going?"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="flex-1 border-none bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:ring-0 focus:outline-none md:text-base"
            />
            <Button
              size="sm"
              onClick={applySearch}
              className="absolute right-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Search
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-8 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Error loading packages</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : items.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((pkg) => (
                <PackageCard key={pkg._id} package={pkg} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 0 && (
              <div className="mt-10 flex items-center justify-center gap-2 text-sm">
                <button
                  disabled={page <= 1}
                  onClick={() => changePage(page - 1)}
                  className="rounded-full border border-slate-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Prev
                </button>
                <span className="px-3 py-1 text-slate-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => changePage(page + 1)}
                  className="rounded-full border border-slate-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 bg-red-50 py-16 text-center">
            <p className="text-lg font-medium text-red-600">
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
