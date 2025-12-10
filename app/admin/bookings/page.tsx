// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import { api } from "@/lib/api"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Loader2, AlertCircle, Eye, Settings } from "lucide-react"
// import { UpdateBookingStatusModal } from "@/components/UpdateBookingStatusModal"

// export default function AdminBookings() {
//   const [bookings, setBookings] = useState<any[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [selectedBooking, setSelectedBooking] = useState<any>(null)

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         setIsLoading(true)
//         const response = await api.getBookings()
//         setBookings(response.data.data || response.data)
//       } catch (err: any) {
//         setError(
//           err?.response?.data?.message ||
//             err.message ||
//             "Failed to fetch bookings",
//         )
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchBookings()
//   }, [])

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "CONFIRMED":
//         return "bg-green-100 text-green-800"
//       case "PENDING":
//         return "bg-yellow-100 text-yellow-800"
//       case "CANCELLED":
//         return "bg-red-100 text-red-800"
//       case "COMPLETED":
//         return "bg-blue-100 text-blue-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const getPaymentStatusColor = (status: string) => {
//     switch (status) {
//       case "PAID":
//         return "bg-green-100 text-green-800"
//       case "UNPAID":
//         return "bg-yellow-100 text-yellow-800"
//       case "FAILED":
//       case "REFUNDED":
//         return "bg-red-100 text-red-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const handleStatusUpdate = (booking: any) => {
//     setSelectedBooking(booking)
//     setIsModalOpen(true)
//   }

//   const handleModalClose = () => {
//     setIsModalOpen(false)
//     setSelectedBooking(null)
//   }

//   const handleUpdateSuccess = () => {
//     const fetchBookings = async () => {
//       try {
//         const response = await api.getBookings()
//         setBookings(response.data.data || response.data)
//       } catch (err: any) {
//         console.error("Failed to refresh bookings:", err)
//       }
//     }
//     fetchBookings()
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Bookings Management</h1>
//         <p className="text-muted-foreground">
//           View and manage all customer bookings
//         </p>
//       </div>

//       {error && (
//         <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive flex items-start gap-2">
//           <AlertCircle size={20} className="mt-0.5 shrink-0" />
//           <div>
//             <p className="font-medium">{error}</p>
//             <p className="text-sm mt-1">
//               Make sure backend is running at http://localhost:5000/api/v1
//             </p>
//           </div>
//         </div>
//       )}

//       <Card>
//         <CardHeader>
//           <CardTitle>All Bookings</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {isLoading ? (
//             <div className="flex justify-center py-8">
//               <Loader2 className="animate-spin text-primary" size={32} />
//             </div>
//           ) : bookings.length === 0 ? (
//             <p className="text-muted-foreground text-center py-8">
//               No bookings found
//             </p>
//           ) : (
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Customer</TableHead>
//                     <TableHead>Package</TableHead>
//                     <TableHead>Booking Status</TableHead>
//                     <TableHead>Payment Status</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {bookings.map((booking: any) => (
//                     <TableRow key={booking._id}>
//                       <TableCell>
//                         <div>
//                           <p className="font-medium">
//                             {booking.member?.name || "N/A"}
//                           </p>
//                           <p className="text-xs text-muted-foreground">
//                             {booking.member?.email}
//                           </p>
//                         </div>
//                       </TableCell>
//                       <TableCell className="font-medium">
//                         {booking.package?.title || "N/A"}
//                       </TableCell>

//                       <TableCell>
//                         <Badge className={getStatusColor(booking.status)}>
//                           {booking.status}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Badge
//                           className={getPaymentStatusColor(
//                             booking.paymentStatus,
//                           )}
//                         >
//                           {booking.paymentStatus}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         {new Date(booking.createdAt).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell className="flex gap-2">
//                         <Link href={`/admin/bookings/${booking._id}`}>
//                           <Button variant="outline" size="sm">
//                             <Eye className="h-4 w-4" />
//                           </Button>
//                         </Link>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleStatusUpdate(booking)}
//                         >
//                           <Settings className="h-4 w-4" />
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {selectedBooking && (
//         <UpdateBookingStatusModal
//           isOpen={isModalOpen}
//           onClose={handleModalClose}
//           bookingId={selectedBooking._id}
//           currentStatus={selectedBooking.status}
//           currentPaymentStatus={selectedBooking.paymentStatus}
//           onSuccess={handleUpdateSuccess}
//         />
//       )}
//     </div>
//   )
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { api } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

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
import { UpdateBookingStatusModal } from "@/components/UpdateBookingStatusModal";
import { AlertCircle, Eye, Loader2, Settings } from "lucide-react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const response = await api.getBookings();
        setBookings(response.data.data || response.data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to fetch bookings"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

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

  const handleStatusUpdate = (booking: any) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleUpdateSuccess = () => {
    const fetchBookings = async () => {
      try {
        const response = await api.getBookings();
        setBookings(response.data.data || response.data);
      } catch (err: any) {
        console.error("Failed to refresh bookings:", err);
      }
    };
    fetchBookings();
  };

  return (
    <div className="min-h-[calc(100vh-theme(space.16))] bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Bookings management
          </h1>
          <p className="text-sm text-slate-600">
            View and manage all customer bookings in one place.
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">{error}</p>
              <p className="mt-1 text-xs">
                Make sure backend is running at http://localhost:5000/api/v1
              </p>
            </div>
          </div>
        )}

        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg">All bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-blue-600" size={32} />
              </div>
            ) : bookings.length === 0 ? (
              <p className="py-10 text-center text-sm text-slate-500">
                No bookings found.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Booking status</TableHead>
                      <TableHead>Payment status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking: any) => (
                      <TableRow key={booking._id} className="align-top">
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {booking.member?.name || "N/A"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {booking.member?.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm font-medium text-slate-900">
                          {booking.package?.title || "N/A"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getStatusColor(booking.status)}
                            variant="outline">
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getPaymentStatusColor(
                              booking.paymentStatus
                            )}
                            variant="outline">
                            {booking.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/bookings/${booking._id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-slate-200">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-200"
                              onClick={() => handleStatusUpdate(booking)}>
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {selectedBooking && (
          <UpdateBookingStatusModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            bookingId={selectedBooking._id}
            currentStatus={selectedBooking.status}
            currentPaymentStatus={selectedBooking.paymentStatus}
            onSuccess={handleUpdateSuccess}
          />
        )}
      </div>
    </div>
  );
}
