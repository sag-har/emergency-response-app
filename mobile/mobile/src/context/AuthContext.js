import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  saveToken,
  getToken,
  removeToken,
  saveUser,
  getUser,
  removeUser,
  clearAuthStorage,
} from "../storage/authStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ======================================
  // STATES
  // ======================================

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [isLoading, setIsLoading] =
    useState(true);

  // ======================================
  // AUTO LOGIN
  // ======================================

  useEffect(() => {
    loadAuth();
  }, []);

  const loadAuth = async () => {
    try {
      const storedToken = await getToken();

      const storedUser = await getUser();

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
      }
    } catch (error) {
      console.log("Auth Load Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ======================================
  // LOGIN
  // ======================================

  const login = async (
    jwtToken,
    userData
  ) => {
    await saveToken(jwtToken);

    await saveUser(userData);

    setToken(jwtToken);

    setUser(userData);
  };

  // ======================================
  // LOGOUT
  // ======================================

  const logout = async () => {
    await clearAuthStorage();

    setToken(null);

    setUser(null);
  };

  // ======================================
  // UPDATE PROFILE
  // ======================================

  const updateProfile = async (
    updatedUser
  ) => {
    await saveUser(updatedUser);

    setUser(updatedUser);
  };

  // ======================================
  // TOKEN EXPIRED
  // ======================================

  const tokenExpired = async () => {
    await logout();
  };

  // ======================================
  // REFRESH USER
  // ======================================

  const refreshUser = async () => {
    const latestUser = await getUser();

    setUser(latestUser);
  };

  // ======================================
  // CONTEXT VALUES
  // ======================================

  return (
    <AuthContext.Provider
      value={{
        // States
        user,
        token,
        isLoading,

        // Helpers
        isAuthenticated:
          token !== null,

        // Actions
        login,
        logout,

        updateProfile,
        refreshUser,

        tokenExpired,

        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ======================================
// HOOK
// ======================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};

export default AuthContext;