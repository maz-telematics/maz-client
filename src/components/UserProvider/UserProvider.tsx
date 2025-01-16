import { createContext, useEffect, useState } from "react";

import { authFetch, useAuth } from "../../middlewares/authProvider";
import { UserInfo, UserProviderProps } from "../../types/userProviderTypes";

export const UserInfoContext = createContext<UserInfo | null>(null);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { isLogged } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isLogged) {
        try {
          const data = await authFetch(
            `${import.meta.env.VITE_HOST}/api/v1/auth/me`
          );
          setUserInfo({ ...data, updateUserInfo });
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      } else {
        setUserInfo(null);
      }
    };

    fetchUserInfo();
  }, [isLogged]);

  const updateUserInfo = async () => {
    try {
      const data = await authFetch(
        `${import.meta.env.VITE_HOST}/api/v1/auth/me`
      );
      setUserInfo({ ...data, updateUserInfo });
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  return (
    <UserInfoContext.Provider value={userInfo}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserProvider;
