import { baseApi } from "../../api/baseApi";

const sellApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSells: builder.query({
      query: (queryParams) => ({
        url: "/sells",
        method: "GET",
        params: queryParams
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
  }),
});

export const { useAddSellMutation, useGetSellsQuery } = sellApi;
