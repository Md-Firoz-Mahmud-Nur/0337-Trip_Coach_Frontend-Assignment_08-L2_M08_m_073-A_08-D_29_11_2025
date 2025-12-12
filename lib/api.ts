import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  },
);

export const api = {
  login: (email: string, password: string) =>
    apiClient.post("/auth/login", { email, password }),

  register: (name: string, email: string, password: string, role: string) =>
    apiClient.post("/user/register", {
      name,
      email,
      password,
      role,
    }),

  logout: () => apiClient.post("/auth/logout", {}),

  getMe: () => apiClient.get("/user/me"),

  resetPassword: (payload: { password: string; updatePassword: string }) =>
    apiClient.post("/auth/reset-password", payload),

  getPackages: () => apiClient.get("/package/all"),

  getPackageById: (id: string) => apiClient.get(`/package/${id}`),

  getUsers: () => apiClient.get("/user/all-users"),

  updateUserRole: (userId: string, role: "TOURIST" | "GUIDE" | "ADMIN") =>
    apiClient.patch(`/user/${userId}`, { role }),

  deleteUser: (userId: string) => apiClient.delete(`/user/${userId}`),

  updateUserStatus: (
    userId: string,
    status: "ACTIVE" | "INACTIVE" | "BLOCKED" | "DELETED",
  ) => apiClient.patch(`/user/${userId}`, { status }),

  updateUserProfile: (userId: string, data: { name: string }) =>
    apiClient.patch(`/user/${userId}`, data),

  updateUserVerify: (userId: string, isVerified: boolean) =>
    apiClient.patch(`/user/${userId}`, { isVerified }),

  createPackage: (data: object) => apiClient.post("/package/create", data),

  updatePackage: (packageId: string, data: object) =>
    apiClient.patch(`/package/${packageId}`, data),

  deletePackage: (packageId: string) =>
    apiClient.delete(`/package/${packageId}`),

  createPackageType: (data: object) => apiClient.post("/package/types", data),

  getPackageTypes: () => apiClient.get("/package/types"),

  updatePackageType: (id: string, data: object) =>
    apiClient.patch(`/package/types/${id}`, data),

  deletePackageType: (id: string) => apiClient.delete(`/package/types/${id}`),

  getBookings: () => apiClient.get("/booking"),

  getBookingDetails: (bookingId: string) =>
    apiClient.get(`/booking/admin/${bookingId}`),

  updateBookingStatus: (
    bookingId: string,
    data: { status: string; paymentStatus?: string },
  ) => apiClient.patch(`/booking/admin/${bookingId}/status`, data),

  getUserBookings: () => apiClient.get("/booking/me"),

  createBooking: (data: {
    package: string;
    pax: number;
    totalAmount: number;
  }) => apiClient.post("/booking/create", data),

  cancelBooking: (bookingId: string) =>
    apiClient.patch(`/booking/me/${bookingId}/cancel`, {}),

  getUserProfile: () => apiClient.get("/profile"),

  updateUserPassword: (data: object) => apiClient.patch("/password", data),

  getPayments: () => apiClient.get("/booking"),

  getPaymentDetails: (paymentId: string) =>
    apiClient.get(`/payment/admin/${paymentId}`),

  initStripeCheckout: (data: { bookingId: string }) =>
    apiClient.post("/payment/create", data),

  confirmStripePayment: (data: { sessionId: string }) =>
    apiClient.post("/payments/confirm", data),
};

export default apiClient;
