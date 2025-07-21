import { apiSlice } from "../../app/api/apiSlice";

export const ticketsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => ({
        url: "/ticket",
      }),
      providesTags: ["Ticket"],
    }),

    getTicketById: builder.query({
      query: (id) => `/ticket/${id}`,
      providesTags: (result, error, id) => [{ type: "Ticket", id }],
    }),

    createTicket: builder.mutation({
      query: (newTicket) => ({
        url: "/ticket",
        method: "POST",
        body: newTicket,
      }),
      invalidatesTags: ["Ticket"],
    }),

    updateTicket: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/ticket/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Ticket", id }],
    }),

    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `/ticket/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Ticket", id }],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} = ticketsApiSlice;
