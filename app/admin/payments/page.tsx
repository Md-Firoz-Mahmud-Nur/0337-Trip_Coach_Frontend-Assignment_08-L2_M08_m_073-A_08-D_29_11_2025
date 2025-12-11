/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchPaymentsError,
  fetchPaymentsStart,
  fetchPaymentsSuccess,
} from "@/redux/slices/paymentsSlice";
import { AlertCircle, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function AdminPayments() {
  const dispatch = useAppDispatch();
  const { payments, isLoading, error } = useAppSelector(
    (state) => state.payments,
  );

  useEffect(() => {
    const fetchPayments = async () => {
      dispatch(fetchPaymentsStart());
      try {
        const response = await api.getPayments();
        const paymentsData = response.data.data || response.data;
        dispatch(fetchPaymentsSuccess(paymentsData));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch payments";
        dispatch(fetchPaymentsError(errorMessage));
      }
    };
  }, [dispatch, payments.length, isLoading]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
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
    <div className="min-h-screen bg-slate-50/20 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Payments management
          </h1>
          <p className="text-sm text-slate-600">
            View all payment transactions and their status.
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">All payments</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-blue-600" size={32} />
              </div>
            ) : payments.length === 0 ? (
              <p className="py-10 text-center text-sm text-slate-500">
                No payments found.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead className="text-right">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment: any) => (
                      <TableRow key={payment._id} className="align-top">
                        <TableCell className="font-mono text-xs md:text-sm">
                          {payment._id?.slice(-8) || "N/A"}
                        </TableCell>
                        <TableCell className="font-mono text-xs md:text-sm">
                          {payment.booking?._id?.slice(-8) ||
                            payment.bookingId?.slice(-8) ||
                            "N/A"}
                        </TableCell>
                        <TableCell className="text-sm text-slate-900">
                          {payment.booking?.package?.title || "Unknown"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getStatusColor(payment.status)}
                            variant="outline"
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {payment?.member?.name || "N/A"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/admin/payments/${payment._id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-200 text-blue-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                            >
                              <Eye className="mr-1.5 h-4 w-4" />
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
