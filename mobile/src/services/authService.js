import API from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ===============================
// LOGIN
// ===============================
export const login = async (phone, password) => {
  try {
    const response = await API.post("/auth/login", {
      phone,
      password,
    });

    if (response.data.success) {
      const token = response.data.token;
      const user = response.data.user;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem(
        "user",
        JSON.stringify(user)
      );
    }

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Unable to login.",
      }
    );
  }
};

// ===============================
// REGISTER
// ===============================
export const register = async (
  name,
  phone,
  password
) => {
  try {
    const response = await API.post("/auth/register", {
      name,
      phone,
      password,
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Registration failed.",
      }
    );
  }
};

// ===============================
// LOGOUT
// ===============================
export const logout = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
};

// ===============================
// GET TOKEN
// ===============================
export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

// ===============================
// GET USER
// ===============================
export const getUser = async () => {
  const user = await AsyncStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

// ===============================
// CHECK LOGIN
// ===============================
export const isLoggedIn = async () => {
  const token = await AsyncStorage.getItem("token");

  return !!token;
};

// ===============================
// UPDATE USER
// ===============================
export const updateStoredUser = async (
  updatedUser
) => {
  await AsyncStorage.setItem(
    "user",
    JSON.stringify(updatedUser)
  );
};