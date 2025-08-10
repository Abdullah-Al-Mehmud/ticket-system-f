import queryGenerator from "../../../../utils/queryGenerator";
import { apiSlice } from "../../app/api/apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (pageConfig) => `/categories?${queryGenerator(pageConfig)}`,
      providesTags: ["Category"],
    }),
    getCategoryById: builder.query({
      query: (id) => `/categories/${id}`,
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/categories",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Category", id }],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Category", id }],
    }),
  }),
});
export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
