import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updatePassword: builder.mutation({
      query: (updatedData) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: updatedData,
      }),
      invalidatesTags: ["USER"],
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
      providesTags: ["USERS"],
    }),
    profileUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER", "USERS"],
    }),
    getAllReceiver: builder.query({
      query: () => ({
        url: "/user/all-receiver",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUpdatePasswordMutation,
  useGetAllUserQuery,
  useProfileUpdateMutation,
  useGetAllReceiverQuery,
} = userApi;
