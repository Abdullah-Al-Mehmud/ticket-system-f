import queryGenerator from "../../../utils/queryGenerator";
import { apiSlice } from "../../app/api/apiSlice";

export const couponsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoupons: builder.query({
      query: (pageConfig) => `/coupon?${queryGenerator(pageConfig)}`,
      providesTags: ["Coupon"],
    }),

    getCouponById: builder.query({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Coupon", id }],
    }),

    createCoupon: builder.mutation({
      query: (newCoupon) => ({
        url: "/coupon",
        method: "POST",
        body: newCoupon,
      }),
      invalidatesTags: ["Coupon"],
    }),

    updateCoupon: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/coupon/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Coupon", id },
        "Coupon",
      ],
    }),

    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Coupon", id },
        "Coupon",
      ],
    }),

    validateCoupon: builder.mutation({
      query: (payload) => ({
        url: "/coupon/validate",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useGetCouponByIdQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useValidateCouponMutation,
} = couponsApiSlice;