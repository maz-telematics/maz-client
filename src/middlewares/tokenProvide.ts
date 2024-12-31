import axios from "axios";

export const createTokenProvider = () => {
  let _token: { token: string; refreshToken: string } | null = null;
  let observers: Array<(isLogged: boolean) => void> = [];

  const initializeToken = () => {
    const tokenString = localStorage.getItem("REACT_TOKEN_AUTH");
    _token = tokenString ? JSON.parse(tokenString) : null;
  };

  const subscribe = (observer: (isLogged: boolean) => void) => {
    observers.push(observer);
  };

  const unsubscribe = (observer: (isLogged: boolean) => void) => {
    observers = observers.filter((_observer) => _observer !== observer);
  };

  const isLoggedIn = () => {
    return !!_token;
  };

  const notify = () => {
    const isLogged = isLoggedIn();
    observers.forEach((observer) => observer(isLogged));
  };

  const getExpirationDate = (jwtToken?: string) => {
    if (!jwtToken) {
      return null;
    }

    const jwt = JSON.parse(atob(jwtToken.split(".")[1]));
    return jwt.exp * 1000;
  };

  const isExpired = (exp: number | null) => {
    if (!exp) {
      return false;
    }

    return Date.now() > exp;
  };

  const setToken = (token: typeof _token) => {
    if (token) {
      localStorage.setItem("REACT_TOKEN_AUTH", JSON.stringify(token));
    } else {
      localStorage.removeItem("REACT_TOKEN_AUTH");
    }
    _token = token;
    notify();
  };

  const getToken = async () => {
    if (!_token) {
      initializeToken();
    }

    if (!_token) {
      return null;
    }

    if (isExpired(getExpirationDate(_token.token))) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_HOST}/api/v1/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${_token.refreshToken}`,
            },
          }
        );
        setToken(response.data);
      } catch (error) {
        setToken(null);
        console.error("Failed to refresh token", error);
      }
    }

    return _token?.token || null;
  };

  initializeToken();

  return {
    getToken,
    isLoggedIn,
    setToken,
    subscribe,
    unsubscribe,
  };
};
