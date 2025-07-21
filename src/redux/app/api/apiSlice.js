import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:
       'http://192.168.68.113:8000/api' ,  
    prepareHeaders: (headers, { getState }) => {
      let token = localStorage.getItem('token');
      try {
        token = JSON.parse(token);
      } catch (e) {
        console.error('Error parsing token from localStorage:', e);
      }
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Event', 'Other'],
  endpoints: (builder) => ({}), // Inject endpoints later
});
