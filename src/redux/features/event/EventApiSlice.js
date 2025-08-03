// src/redux/features/event/eventApiSlice.js
import queryGenerator from "../../../../utils/queryGenerator";
import { apiSlice } from "../../app/api/apiSlice";

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (pageConfig) => `/event?${queryGenerator(pageConfig)}`,
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
      query: ({ id, formData }) => ({
        url: `/event/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Event", id }],
    }),

    updateEventStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/event/${id}`,
        method: "PATCH",
        body: data,
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
    assignOrganizer: builder.mutation({
      query: (data) => ({
        url: "/events/assign-organizers",
        method: "POST",
        body: data,
      }),
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
  useAssignOrganizerMutation,
  useUpdateEventStatusMutation,
} = eventApiSlice;
