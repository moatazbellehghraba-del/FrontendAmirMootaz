import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  deleteTokens,
  getCurrentUser,
  saveCurrentUser,
  deleteCurrentUser,
} from "../utils/secureStore";
import { client } from "../apollo/client";
import { REFRESH_TOKEN } from "../graphql/auth/mutations/auth";

// ---------------------------
// TYPES
// ---------------------------
interface RefreshTokenResponse {
  refreshToken: {
    accessToken: string;
    refreshToken: string;
  };
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender?: string;
  dateOfBirth?: string;
  profilePhoto?: string;
  location?: { lat: number; long: number };
  region?: string;
  country?: string;
  loyaltyPoints?: number;
  favorites: string[];
  bookings?: any[];
  reviews?: any[];
  createdAt?: string;
}

interface AuthContextType {
  userToken: string | null;
  currentUser: User | null;
  login: (
    accessToken: string,
    refreshToken: string,
    user: User
  ) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  refreshUser: () => Promise<void>;
  setUser: (user: User) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  currentUser: null,
  login: async () => {},
  logout: async () => {},
  loading: true,
  refreshUser: async () => {}, // Add this
  setUser: async () => {}, // Add this
});

interface Props {
  children: ReactNode;
}

// ---------------------------
// PROVIDER
// ---------------------------
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // FIX 1
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      console.log("Checking token...");

      const accessToken = await getAccessToken();
      const refreshToken = await getRefreshToken();

      if (!accessToken && refreshToken) {
        try {
          const result = await client.mutate<RefreshTokenResponse>({
            mutation: REFRESH_TOKEN,
            variables: { refreshToken },
          });

          const newTokens = result.data?.refreshToken;

          if (newTokens?.accessToken && newTokens?.refreshToken) {
            await saveTokens(newTokens.accessToken, newTokens.refreshToken);
            setUserToken(newTokens.accessToken);
          } else {
            await deleteTokens();
            setUserToken(null);
          }
        } catch (error) {
          console.log("Refresh failed:", error);
          await deleteTokens();
          setUserToken(null);
        }
      } else if (accessToken) {
        setUserToken(accessToken);
      } else {
        setUserToken(null);
      }

      // Load stored user
      const storedUser = await getCurrentUser();
      if (storedUser) {
        setCurrentUser(storedUser);
      }

      setLoading(false);
    };

    checkToken();
  }, []);
  const refreshUser = async () => {
    try {
      const storedUser = await getCurrentUser();
      if (storedUser) {
        setCurrentUser(storedUser);
        return storedUser;
      }
      return null;
    } catch (error) {
      console.error("Error refreshing user:", error);
      return null;
    }
  };

  const setUser = async (user: User) => {
    await saveCurrentUser(user);
    setCurrentUser(user);
  };
  const login = async (
    accessToken: string,
    refreshToken: string,
    user: User
  ) => {
    await saveTokens(accessToken, refreshToken);
    await saveCurrentUser(user);

    setUserToken(accessToken);
    setCurrentUser(user);
  };

  const logout = async () => {
    await deleteTokens();
    await deleteCurrentUser();

    setUserToken(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        currentUser,
        login,
        logout,
        loading,
        refreshUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
