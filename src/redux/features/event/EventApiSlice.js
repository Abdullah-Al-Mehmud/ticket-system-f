// src/redux/features/event/eventApiSlice.js
import { apiSlice } from "../../app/api/apiSlice";

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getEvents: builder.query({
      query: () => "/event",
      providesTags: ["Event"],
    }),

   
    getEventById: builder.query({
      query: (id) => `/events/${id}`,
      providesTags: (result, error, id) => [{ type: "Event", id }],
    }),

    
    createEvent: builder.mutation({
      query: (newEvent) => ({
        url: "/events",
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: ["Event"],
    }),

    
    updateEvent: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/events/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Event", id }],
    }),

    
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Event", id }],
    }),
  }),
});


export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApiSlice;
