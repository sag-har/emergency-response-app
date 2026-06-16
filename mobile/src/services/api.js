import AsyncStorage from '@react-native-async-storage/async-storage';

// Change this to your machine's local IP when running on physical device
// e.g. 'http://192.168.1.105:3000'  — run `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
// Pehle yeh tha: const BASE_URL = '192.168.0.107:3000';
// Isko badal kar yeh kar dein:
const BASE_URL = 'http://192.168.0.107:3000';

const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch {
    return null;
  }
};

const authHeaders = async () => {
  const token = await getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ─── AUTH ────────────────────────────────────────────────────────────────────

export const registerUser = async ({ fullName, phoneNumber, password }) => {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, phoneNumber, password }),
  });
  return response.json();
};

export const loginUser = async ({ phoneNumber, password }) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, password }),
  });
  return response.json();
};

export const getMyProfile = async () => {
  const headers = await authHeaders();
  const response = await fetch(`${BASE_URL}/api/auth/me`, { headers });
  return response.json();
};

// ─── EMERGENCY ───────────────────────────────────────────────────────────────

export const submitEmergencyRequest = async ({ emergencyType, notes, location }) => {
  const headers = await authHeaders();
  const response = await fetch(`${BASE_URL}/api/emergency`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ emergencyType, notes, location }),
  });
  return response.json();
};

export const getEmergencyRequests = async () => {
  const headers = await authHeaders();
  const response = await fetch(`${BASE_URL}/api/emergency`, { headers });
  return response.json();
};

export const getEmergencyById = async (id) => {
  const headers = await authHeaders();
  const response = await fetch(`${BASE_URL}/api/emergency/${id}`, { headers });
  return response.json();
};

export const getEmergencyLocation = async (id) => {
  const headers = await authHeaders();
  const response = await fetch(`${BASE_URL}/api/emergency/${id}/location`, { headers });
  return response.json();
};