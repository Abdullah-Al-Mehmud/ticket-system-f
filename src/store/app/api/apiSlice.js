import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      let token = localStorage.getItem("token");
      try {
        token = JSON.parse(token);
      } catch (e) {
        console.error("Error parsing token from localStorage:", e);
      }
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      if (!headers.get("Content-Type")) {
        headers.set("Accept", "application/json");
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Event", "Other"],
  endpoints: (builder) => ({}), // Inject endpoints later
});
