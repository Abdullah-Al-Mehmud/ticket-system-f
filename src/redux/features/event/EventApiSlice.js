// src/redux/features/event/eventApiSlice.js
import { apiSlice } from "../../app/api/apiSlice";

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => "/event",
      providesTags: ["Event"],
    }),

    getEventById: builder.query({
      query: (id) => `/event/${id}`,
      providesTags: (result, error, id) => [{ type: "Event", id }],
    }),

    createEvent: builder.mutation({
      query: (newEvent) => ({
        url: "/event",
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: ["Event"],
    }),

    updateEvent: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/event/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Event", id }],
    }),

    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Event", id }],
    }),
    getOrganizerEvents: builder.query({
      query: () => `/organizer-event`,
      providesTags: ["OrganizerEvent"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetOrganizerEventsQuery,
} = eventApiSlice;
