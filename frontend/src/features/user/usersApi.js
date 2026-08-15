import { baseApi } from '../../app/baseApi';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (response) => response.data ?? response,
      providesTags: (result = []) => [
        ...result.map((u) => ({ type: 'Users', id: u.id })),
        { type: 'Users', id: 'LIST' },
      ],
    }),
    createUser: builder.mutation({
     
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
