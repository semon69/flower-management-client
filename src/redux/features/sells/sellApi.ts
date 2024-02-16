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
    getMembers: builder.query({
      query: () => ({
        url: `/members`,
        method: "GET",
      }),
      providesTags: ["member"]
    }),
    getSingleMember: builder.query({
      query: (email) => ({
        url: `/member/${email}`,
        method: "GET",
      }),
      providesTags: ["member"]
    }),
    calculatePoints: builder.mutation({
      query: (data) => ({
        url: `/calculatePoints`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["member"]
    }),
    redeemPoint: builder.mutation({
      query: (data) => ({
        url: `/updateRedeem/${data.email}`,
        method: "PATCH",
        body: data.isRedeem
      }),
      invalidatesTags: ["member"]
    }),
  }),
});

export const {
  useAddSellMutation,
  useGetSellsQuery,
  useCreateMemberMutation,
  useGetMembersQuery,
  useGetSingleMemberQuery,
  useCalculatePointsMutation,
  useRedeemPointMutation
} = sellApi;
