import {
    BaseQueryFn,
    fetchBaseQuery,
    FetchBaseQueryError,
    FetchArgs,
  } from "@reduxjs/toolkit/query/react";
  
  import { createTokenProvider } from "./tokenProvide";
  
  const tokenProvider = createTokenProvider();
  
  const baseQuery: BaseQueryFn<
    FetchArgs | string,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    const localStorageToken = localStorage.getItem("REACT_TOKEN_AUTH");
    if (!localStorageToken) {
      return {
        error: { status: 401, data: "No token found" } as FetchBaseQueryError,
      };
    }
    // TODO: Refactor this to use the tokenProvider
    const token = JSON.parse(localStorageToken).token;
  
    const customFetchBase = fetchBaseQuery({
      baseUrl: import.meta.env.VITE_HOST,
      prepareHeaders: (headers) => {
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
        headers.set("Content-Type", "application/json");
        return headers;
      },
    });
  
    let result = await customFetchBase(args, api, extraOptions);
  
    if (result.error && result.error.status === 401) {
      const newToken = await tokenProvider.getToken();
      if (newToken) {
        result = await customFetchBase(args, api, extraOptions);
      }
    }
  
    return result;
  };
  
  export default baseQuery;
  