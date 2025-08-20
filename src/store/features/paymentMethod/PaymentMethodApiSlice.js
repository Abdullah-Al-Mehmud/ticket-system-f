// src/redux/features/event/eventApiSlice.js
import queryGenerator from "../../../utils/queryGenerator";
import { apiSlice } from "../../app/api/apiSlice";

export const PaymentMethodApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentMethods: builder.query({
      query: (pageConfig) => `/payment-methods?${queryGenerator(pageConfig)}`,
      providesTags: ["paymentMethod"],
    }),
    getPaymentMethodById: builder.query({
      query: (id) => `/payment-methods/${id}`,
      providesTags: (result, error, id) => [{ type: "paymentMethod", id }],
    }),
    updatePaymentMethodStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/payment-methods/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "paymentMethod", id }],
    }),
  }),
});
export const {
  useGetPaymentMethodsQuery,
  useGetPaymentMethodByIdQuery,
  useUpdatePaymentMethodStatusMutation,
} = PaymentMethodApiSlice;
