import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    registered: builder.mutation({
      query: (userInfo) => ({
        url: "/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    totalUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET"
      }),
    }),
  })
});

export const { useLoginMutation, useRegisteredMutation, useTotalUserQuery } = authApi;