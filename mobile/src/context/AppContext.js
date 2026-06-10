import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [user, setUser] = useState({
    name: "Test User",
    email: "test@gmail.com",
  });

  const [history, setHistory] = useState([]);

  const addHistory = (item) => {
    setHistory((prev) => [item, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        history,
        addHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}