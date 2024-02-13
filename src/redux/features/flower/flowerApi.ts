import { baseApi } from "../../api/baseApi";

const flowerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFlowers: builder.query({
      query: (queryParams) => ({
        url: "/flowers",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["flower"],
    }),
    addFlower: builder.mutation({
      query: (data) => ({
        url: "/create-flower",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["flower"],
    }),
    updateFlower: builder.mutation({
      query: (options) => ({
        url: `/update-flower/${options._id}`,
        method: "PATCH",
        body: options.data,
      }),
      invalidatesTags: ["flower"],
    }),
    deleteFlower: builder.mutation({
      query: (_id) => ({
        url: `/delete-flower/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["flower"],
    }),
    deleteSelectedFlower: builder.mutation({
      query: (keys) => ({
        url: `/delete-multiple-flower`,
        method: "DELETE",
        body: keys,
      }),
      invalidatesTags: ["flower"],
    }),
  }),
});

export const {
  useGetFlowersQuery,
  useAddFlowerMutation,
  useDeleteFlowerMutation,
  useUpdateFlowerMutation,
  useDeleteSelectedFlowerMutation,
} = flowerApi;
