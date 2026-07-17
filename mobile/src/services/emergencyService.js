import API from "./api";

const emergencyService = {

  createEmergencyRequest: async (data) => {
    const res = await API.post("/emergency/emergency", data);
    return res.data;
  },

  getEmergencyHistory: async (userId) => {
    const res = await API.get(
      `/emergency/emergency?userId=${userId}`
    );
    return res.data;
  },

  getEmergencyById: async (id) => {
    const res = await API.get(
      `/emergency/emergency/${id}`
    );
    return res.data;
  },

  updateEmergencyStatus: async (id, status) => {
    const res = await API.put(
      `/emergency/emergency/${id}/status`,
      { status }
    );

    return res.data;
  },

};

export default emergencyService;