import { baseApi } from '../../app/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
     
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    me: builder.query({
      query: () => '/me',
    }),
    logoutApi: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useMeQuery, useLogoutApiMutation } = authApi;
