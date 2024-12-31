import baseQuery from "../../middlewares/authBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { UserQueryResult } from "../../Types/adminTypes";


export const authSlice = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  tagTypes: ["CurrentUser"],
  endpoints: (build) => ({
    getCurrentUser: build.query<UserQueryResult, void>({
      query: () => `/api/v1/auth/me`,
      providesTags: ["CurrentUser"],
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: `/api/v1/auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["CurrentUser"],
    }),
  }),
});

export const { useGetCurrentUserQuery, useLogoutMutation } = authSlice;
