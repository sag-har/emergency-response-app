import React, {
  createContext,
  useState,
} from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  // ==========================================
  // USER
  // ==========================================

  const [user, setUser] = useState(null);

  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] = useState(false);

  // ==========================================
  // EMERGENCY HISTORY
  // ==========================================

  const [history, setHistory] = useState([]);

  // ==========================================
  // ACTIVE EMERGENCY
  // ==========================================

  const [activeEmergency, setActiveEmergency] =
    useState(null);

  // ==========================================
  // HOSPITALS
  // ==========================================

  const [hospitals, setHospitals] =
    useState([]);

  const [selectedHospital, setSelectedHospital] =
    useState(null);

  // ==========================================
  // EMERGENCY CONTACTS
  // ==========================================

  const [contacts, setContacts] =
    useState([]);

  // ==========================================
  // NOTIFICATIONS
  // ==========================================

  const [notifications, setNotifications] =
    useState([]);

  // ==========================================
  // USER FUNCTIONS
  // ==========================================

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
    setHistory([]);
    setActiveEmergency(null);
    setHospitals([]);
    setSelectedHospital(null);
    setContacts([]);
    setNotifications([]);
  };

  // ==========================================
  // HISTORY
  // ==========================================

  const addHistory = (request) => {
    setHistory((prev) => [
      request,
      ...prev,
    ]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  // ==========================================
  // ACTIVE EMERGENCY
  // ==========================================

  const startEmergency = (request) => {
    setActiveEmergency(request);
  };

  const endEmergency = () => {
    setActiveEmergency(null);
    setSelectedHospital(null);
  };

  // ==========================================
  // HOSPITALS
  // ==========================================

  const loadHospitals = (list) => {
    setHospitals(list);
  };

  const chooseHospital = (hospital) => {
    setSelectedHospital(hospital);
  };

  // ==========================================
  // CONTACTS
  // ==========================================

  const loadContacts = (list) => {
    setContacts(list);
  };

  const addContact = (contact) => {
    setContacts((prev) => [
      contact,
      ...prev,
    ]);
  };

  const removeContact = (id) => {
    setContacts((prev) =>
      prev.filter(
        (contact) => contact.id !== id
      )
    );
  };

  // ==========================================
  // NOTIFICATIONS
  // ==========================================

  const loadNotifications = (list) => {
    setNotifications(list);
  };

  const addNotification = (notification) => {
    setNotifications((prev) => [
      notification,
      ...prev,
    ]);
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              is_read: true,
            }
          : item
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // ==========================================
  // PROVIDER
  // ==========================================

  return (
    <AppContext.Provider
      value={{
        // User
        user,
        setUser,
        loginUser,
        logoutUser,

        // Loading
        loading,
        setLoading,

        // Emergency History
        history,
        addHistory,
        clearHistory,

        // Active Emergency
        activeEmergency,
        startEmergency,
        endEmergency,

        // Hospitals
        hospitals,
        loadHospitals,

        selectedHospital,
        chooseHospital,

        // Contacts
        contacts,
        loadContacts,
        addContact,
        removeContact,

        // Notifications
        notifications,
        loadNotifications,
        addNotification,
        markNotificationRead,
        clearNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}