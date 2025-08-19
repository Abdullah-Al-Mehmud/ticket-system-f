import queryGenerator from "../../../utils/queryGenerator";
import { apiSlice } from "../../app/api/apiSlice";

export const ticketsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET all tickets
    getTickets: builder.query({
      query: (pageConfig) => `/ticket?${queryGenerator(pageConfig)}`,
      providesTags: ["Ticket"],
    }),

    // GET a ticket by ID
    getTicketById: builder.query({
      query: (id) => `/ticket/${id}`,
      providesTags: (result, error, id) => [{ type: "Ticket", id }],
    }),

    // POST a new ticket
    createTicket: builder.mutation({
      query: (newTicket) => ({
        url: "/ticket",
        method: "POST",
        body: newTicket,
      }),
      invalidatesTags: ["Ticket"],
    }),

    // PATCH (update) a ticket
    updateTicket: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/ticket/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Ticket", id }],
    }),

    // DELETE a ticket
    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `/ticket/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Ticket", id }],
    }),

    // GET tickets for the logged-in user
    getUserTickets: builder.query({
      query: (id) => `/tickets${id ? `?user_id=${id}` : ""}`,
      providesTags: ["Ticket"],
    }),

    checkTicket: builder.mutation({
      query: (payload) => ({
        url: "/ticket-check",
        method: "POST",
        body: payload,
      }),
    }),

    // POST ticket verification
    verifyTicket: builder.mutation({
      query: (payload) => ({
        url: "/ticket-verify",
        method: "POST",
        body: payload,
      }),
    }),

    downloadTicket: builder.mutation({
      query: (id) => ({
        url: `/ticket/download/${id}`,
        method: "GET",
        // don't let fetchBaseQuery parse JSON
        responseHandler: async (response) => await response.blob(),
      }),
    }),
    sendBookingEmail: builder.mutation({
      query: (payload) => ({
        url: "/send-bookingTicket-email",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Ticket"],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
  useGetUserTicketsQuery,
  useVerifyTicketMutation,
  useCheckTicketMutation,
  useDownloadTicketMutation,
  useSendBookingEmailMutation,
} = ticketsApiSlice;
