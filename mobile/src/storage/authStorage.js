import AsyncStorage from "@react-native-async-storage/async-storage";

// ======================================
// STORAGE KEYS
// ======================================

const TOKEN_KEY = "token";
const USER_KEY = "user";

// ======================================
// TOKEN FUNCTIONS
// ======================================

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error saving token:", error);
    throw error;
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing token:", error);
    throw error;
  }
};

// ======================================
// USER FUNCTIONS
// ======================================

export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem(
      USER_KEY,
      JSON.stringify(user)
    );
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

export const updateUser = async (updatedUser) => {
  try {
    await AsyncStorage.setItem(
      USER_KEY,
      JSON.stringify(updatedUser)
    );
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error("Error removing user:", error);
    throw error;
  }
};

// ======================================
// LOGIN STATUS
// ======================================

export const isLoggedIn = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    return token !== null;
  } catch (error) {
    return false;
  }
};

// ======================================
// CLEAR APP AUTH DATA
// ======================================

export const clearAuthStorage = async () => {
  try {
    await AsyncStorage.multiRemove([
      TOKEN_KEY,
      USER_KEY,
    ]);
  } catch (error) {
    console.error("Error clearing auth storage:", error);
    throw error;
  }
};