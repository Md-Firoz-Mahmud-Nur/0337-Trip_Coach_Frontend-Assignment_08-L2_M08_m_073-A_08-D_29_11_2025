/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  AlertCircle,
  Bookmark,
  CreditCard,
  Package,
  RefreshCw,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardStats {
  totalUsers: number;
  totalPackages: number;
  totalBookings: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPackages: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [usersRes, packagesRes, bookingsRes, paymentsRes] =
        await Promise.all([
          api.getUsers(),
          api.getPackages(),
          api.getBookings(),
          api.getPayments(),
        ]);

      const data = await api.getUsers();

      console.log(data);
      
      const users = usersRes.data?.data || [];
      const packages = packagesRes.data?.data || [];
      const bookings = bookingsRes.data?.data || [];
      const payments = paymentsRes.data?.data || [];

      const totalRevenue = (payments ?? []).reduce(
        (sum: number, p: any) =>
          p.status === "UNPAID" ? sum + (p.amount || 0) : sum,
        0
      );

      setStats({
        totalUsers: Array.isArray(users) ? users.length : 0,
        totalPackages: Array.isArray(packages) ? packages.length : 0,
        totalBookings: Array.isArray(bookings) ? bookings.length : 0,
        totalRevenue,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchDashboardData();
    }
  }, [user]);

  const statCards = [
    {
      title: "Total users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Total packages",
      value: stats.totalPackages,
      icon: Package,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      title: "Total bookings",
      value: stats.totalBookings,
      icon: Bookmark,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      title: "Total revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: CreditCard,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/20 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Admin dashboard
            </h1>
            <p className="text-sm text-slate-600">
              Overview of users, packages, bookings, and revenue.
            </p>
          </div>
          <Button
            onClick={fetchDashboardData}
            disabled={isLoading}
            variant="outline"
            className="gap-2 bg-white">
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>

        {error && (
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="font-medium">Error loading dashboard</p>
              <p className="text-sm">{error}</p>
            </div>
            <Button size="sm" variant="outline" onClick={fetchDashboardData}>
              Retry
            </Button>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, idx) => (
            <Card
              key={idx}
              className={cn("border-slate-200 shadow-sm", stat.bg)}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {stat.title}
                </CardTitle>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${stat.bg}`}>
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-7 w-24 rounded bg-slate-200 animate-pulse" />
                ) : (
                  <div className="text-2xl font-semibold text-slate-900">
                    {stat.value}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
