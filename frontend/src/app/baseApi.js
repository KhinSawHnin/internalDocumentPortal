import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../features/auth/authSlice';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  prepareHeaders: (headers, { getState }) => {
   
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Accept', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users', 'Documents'],
  endpoints: () => ({}),
});
