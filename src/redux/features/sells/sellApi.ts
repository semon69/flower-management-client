import { baseApi } from "../../api/baseApi";

const sellApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSells: builder.query({
      query: (queryParams) => ({
        url: "/sells",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["flower"],
    }),
    addSell: builder.mutation({
      query: (data) => ({
        url: "/create-sell",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["flower"],
    }),
    createMember: builder.mutation({
      query: (data) => ({
        url: "/create-member",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["flower"],
    }),
    getSingleMember: builder.query({
      query: (email) => ({
        url: `/member/${email}`,
        method: "GET",
      }),
    }),
    calculatePoints: builder.mutation({
      query: (data) => ({
        url: `/calculatePoints`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddSellMutation,
  useGetSellsQuery,
  useCreateMemberMutation,
  useGetSingleMemberQuery,
  useCalculatePointsMutation
} = sellApi;
