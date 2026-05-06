import queryGenerator from "../../../utils/queryGenerator";
import { apiSlice } from "../../app/api/apiSlice";

export const ticketTypesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTicketTypes: builder.query({
      query: (pageConfig) => `/ticket-type?${queryGenerator(pageConfig)}`,
      providesTags: ["TicketType"],
    }),

    getTicketTypeById: builder.query({
      query: (id) => ({
        url: `/ticket-type/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "TicketType", id }],
    }),

    createTicketType: builder.mutation({
      query: (newTicketType) => ({
        url: "/ticket-type",
        method: "POST",
        body: newTicketType,
      }),
      invalidatesTags: ["TicketType"],
    }),

    updateTicketType: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/ticket-type/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "TicketType", id },
        "TicketType",
      ],
    }),

    deleteTicketType: builder.mutation({
      query: (id) => ({
        url: `/ticket-type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "TicketType", id },
        "TicketType",
      ],
    }),
  }),
});

export const {
  useGetTicketTypesQuery,
  useGetTicketTypeByIdQuery,
  useCreateTicketTypeMutation,
  useUpdateTicketTypeMutation,
  useDeleteTicketTypeMutation,
} = ticketTypesApiSlice;