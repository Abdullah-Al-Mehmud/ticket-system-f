import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', // state name in store
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.68.120:8000/api' || 'http://localhost:8000/api' }),
  endpoints: (builder) => ({}),
});

