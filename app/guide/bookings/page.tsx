"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  cancelBookingSuccess,
  fetchBookingsError,
  fetchBookingsStart,
  fetchUserBookingsSuccess,
} from "@/redux/slices/bookingsSlice";
import { AlertCircle, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function UserBookings() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const {
    userBookings: bookings,
    isLoading,
    error,
  } = useAppSelector((state) => state.bookings);

  useEffect(() => {
    const fetchBookings = async () => {
      dispatch(fetchBookingsStart());
      try {
        const response = await api.getUserBookings();
        dispatch(fetchUserBookingsSuccess(response.data.data));
        console.log("User bookings:", response.data.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch bookings";
        dispatch(fetchBookingsError(errorMessage));
        console.error("Error bookings:", errorMessage);
      }
    };
    console.log("Bookings length:", bookings.length);
    if (bookings.length === 0) {
      fetchBookings();
    }
  }, [dispatch, bookings.length]);

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

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await api.cancelBooking(bookingId);
      dispatch(cancelBookingSuccess(bookingId));
      console.log("Booking cancelled:", bookingId);
    } catch (err) {
      console.error("Failed to cancel booking:", err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your travel bookings
        </p>
      </div>

      {error && (
        <div className="bg-destructive/10 border-destructive/20 text-destructive flex items-start gap-2 rounded-lg border p-4">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">Error loading bookings</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <Card className="bg-sky-50">
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin" size={32} />
            </div>
          ) : bookings.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              No bookings found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell className="font-medium">
                        {" "}
                        {booking.package?.title || "N/A"}
                      </TableCell>
                      <TableCell>${booking.totalAmount}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {booking.status !== "CANCELLED" && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="gap-1"
                              >
                                <Trash2 size={14} />
                                Cancel
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Cancel Booking
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to cancel this booking?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <div className="flex gap-3">
                                <AlertDialogCancel>
                                  Keep Booking
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleCancelBooking(booking._id)
                                  }
                                >
                                  Cancel Booking
                                </AlertDialogAction>
                              </div>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
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
  );
}
