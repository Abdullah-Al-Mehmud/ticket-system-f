import queryGenerator from "../../../utils/queryGenerator";
import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => "admin/dashboard",
      providesTags: ["User"],
    }),

    getUserList: builder.query({
      query: (pageConfig) => `/user?${queryGenerator(pageConfig)}`,
      providesTags: ["User"],
    }),

    getUserById: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "POST", // Laravel will detect _method = PATCH
        body: data, // FormData
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetUserListQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
} = userApiSlice;
