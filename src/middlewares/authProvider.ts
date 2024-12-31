import { useEffect, useState } from "react";

import axios, { AxiosRequestConfig } from "axios";

import { createTokenProvider } from "./tokenProvide";

interface NewTokens {
  token: string;
  refreshToken: string;
}

export const createAuthProvider = () => {
  const tokenProvider = createTokenProvider();

  const login = (newTokens: NewTokens) => {
    tokenProvider.setToken(newTokens);
  };

  const logout = () => {
    tokenProvider.setToken(null);
  };

  const authFetch = async (url: string, options: AxiosRequestConfig = {}) => {
    const token = await tokenProvider.getToken();

    if (!token) {
      throw new Error("No token available");
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    const axiosOptions = {
      ...options,
      headers,
    };

    try {
      const response = await axios(url, axiosOptions);
      return response.data;
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  };

  const useAuth = () => {
    const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());

    useEffect(() => {
      const listener = (newIsLogged: boolean) => {
        setIsLogged(newIsLogged);
      };

      tokenProvider.subscribe(listener);
      return () => {
        tokenProvider.unsubscribe(listener);
      };
    }, []);

    return { isLogged };
  };

  return {
    useAuth,
    authFetch,
    login,
    logout,
  };
};

export const { useAuth, authFetch, login, logout } = createAuthProvider();
