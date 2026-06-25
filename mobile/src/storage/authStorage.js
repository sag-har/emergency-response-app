import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "token";
const USER_KEY = "user";

const base64Decode = (value) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let output = "";
  let buffer = 0;
  let bits = 0;

  for (let index = 0; index < value.length; index += 1) {
    const char = value.charAt(index);

    if (char === "=") {
      break;
    }

    const charIndex = chars.indexOf(char);

    if (charIndex === -1) {
      continue;
    }

    buffer = (buffer << 6) | charIndex;
    bits += 6;

    if (bits >= 8) {
      bits -= 8;
      output += String.fromCharCode((buffer >> bits) & 255);
    }
  }

  return output;
};

const decodeJwtPayload = (token) => {
  try {
    const payload = token.split(".")[1];
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(base64Decode(normalizedPayload));
  } catch {
    return null;
  }
};

export const saveToken = async (token) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const saveUser = async (user) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const getUser = async () => {
  const user = await AsyncStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const clearAuth = async () => {
  await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
};

export const isTokenExpired = (token) => {
  const payload = decodeJwtPayload(token);

  if (!payload?.exp) {
    return true;
  }

  return payload.exp * 1000 <= Date.now();
};

export const hasValidSession = async () => {
  const token = await getToken();

  if (!token || isTokenExpired(token)) {
    await clearAuth();
    return false;
  }

  return true;
};
