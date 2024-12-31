import { createContext, useContext } from 'react';
import {AuthContextIntarface,User} from '../Types/authTypes'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
export const AuthContext = createContext<AuthContextIntarface | null>(null);

interface UserContextType {
  user:User |null
  roleUser: string | null;
  isLoading: boolean | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; 
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [roleUser, setRole] = useState<string | null>(null); 
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null); 
    const fetchRoleData = async () => {
      try {
        const token = (JSON.parse(localStorage.getItem('user') || '{}') || {}).token;
        if (!token) {
          throw new Error('Токен не найден в localStorage');
        }
    
        const response = await axios.get(`${apiUrl}/user/role`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setUser(response.data)
      } catch (error) {
        if (error) {
          console.error('Ошибка при получении данных:', error);
        } else {
          console.error('Ошибка при получении роли:', error);
        }
      } finally {
        setIsLoading(false);
      }
      
    };

    useEffect(() => {
            fetchRoleData(); 
    }, []);

    return (
        <UserContext.Provider value={{ roleUser,setUser ,isLoading, user  }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

