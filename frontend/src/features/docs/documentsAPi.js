import { baseApi } from '../../app/baseApi';

export const documentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDocuments: builder.query({
    
      query: () => '/docs',
      transformResponse: (response) => response.data ?? response,
      providesTags: (result = []) => [
        ...result.map((d) => ({ type: 'Documents', id: d.id })),
        { type: 'Documents', id: 'LIST' },
      ],
    }),
    uploadDocument: builder.mutation({
     
      query: (formData) => ({
        url: '/docs',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Documents', id: 'LIST' }],
    }),
    deleteDocument: builder.mutation({
     
      query: (id) => ({
        url: `/docs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Documents', id: 'LIST' }],
    }),
    downloadDocument: builder.query({
      query: (id) => ({
        url: `/docs/${id}/download`,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
  useLazyDownloadDocumentQuery,
} = documentsApi;
