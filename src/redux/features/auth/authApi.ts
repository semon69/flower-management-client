import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    totalUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    updateRole: builder.mutation({
      query: (data) => ({
        url: `/user/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    
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
  }),
});

export const {
  useLoginMutation,
  useRegisteredMutation,
  useTotalUserQuery,
  useUpdateRoleMutation,
} = authApi;
