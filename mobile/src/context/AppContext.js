import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [history, setHistory] = useState([]);

  const addHistory = (item) => {
    setHistory((prev) => [item, ...prev]);
  };

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser({
      name: "",
      email: "",
    });

    setHistory([]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loginUser,
        logoutUser,
        history,
        addHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}