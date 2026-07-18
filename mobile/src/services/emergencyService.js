import API from "./api";

const emergencyService = {
  // POST /api/emergency
  createEmergencyRequest: async (data) => {
    const res = await API.post("/emergency", data); 
    return res.data;
  },

  createEmergency: async (data) => {
    const res = await API.post("/emergency", data); 
    return res.data;
  },

  // GET /api/emergency?userId=...
  getEmergencyHistory: async (userId) => {
    const res = await API.get(`/emergency?userId=${userId}`); 
    return res.data;
  },

  // GET /api/emergency/:id
  getEmergencyById: async (id) => {
    const res = await API.get(`/emergency/${id}`); 
    return res.data;
  },

  // PUT /api/emergency/:id/status
  updateEmergencyStatus: async (id, status) => {
    const res = await API.put(`/emergency/${id}/status`, { status }); 
    return res.data;
  },

  // POST /api/emergency/hospital/assign
  assignHospitalToEmergency: async (emergencyId, hospitalId) => {
    const res = await API.post("/emergency/hospital/assign", { emergencyId, hospitalId });
    return res.data;
  },
};

export default emergencyService;