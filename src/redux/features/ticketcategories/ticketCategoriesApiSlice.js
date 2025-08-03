import { apiSlice } from "../../app/api/apiSlice"; // adjust path

export const ticketCategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET: Fetch all ticket categories
    getTicketCategories: builder.query({
      query: () => ({
        url: "/ticket-category",
        method: "GET",
        params: { all: true },
      }),
      providesTags: ["TicketCategory"],
    }),

    // GET: Fetch single category by ID
    getTicketCategoryById: builder.query({
      query: (id) => ({
        url: `/ticket-category/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "TicketCategory", id }],
    }),

    // POST: Create a new category
    createTicketCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/ticket-category",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["TicketCategory"],
    }),

    updateTicketCategory: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/ticket-category/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "TicketCategory", id },
        "TicketCategory",
      ],
    }),

    // DELETE: Remove a category
    deleteTicketCategory: builder.mutation({
      query: (id) => ({
        url: `/ticket-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "TicketCategory", id },
        "TicketCategory",
      ],
    }),
  }),
});

// Export auto-generated hooks
export const {
  useGetTicketCategoriesQuery,
  useGetTicketCategoryByIdQuery,
  useCreateTicketCategoryMutation,
  useUpdateTicketCategoryMutation,
  useDeleteTicketCategoryMutation,
} = ticketCategoriesApiSlice;
