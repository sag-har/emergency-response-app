import API from "./api";

const hospitalService = {
  // Dono names ka fallback de diya taake screens crash na hon
  getNearestHospitals: async (lat, lng) => {
    try {
      const res = await API.get(`/emergency/hospitals?lat=${lat}&lng=${lng}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching nearby hospitals:", error);
      throw error;
    }
  },

  // Alias taake agar screen getNearbyHospitals call kare toh bhi chale
  getNearbyHospitals: async (lat, lng) => {
    return hospitalService.getNearestHospitals(lat, lng);
  },

  assignHospital: async (emergencyId, hospitalId) => {
  try {
    console.log("🚀 Sending Request to Exact Endpoint...");
    
    // Yahan API wrapper ki jagah complete URL de kar test karein taake routing clear ho:
    // Apne backend IP aur Port ke mutabik ise adjust kar sakte hain agar 192.168... use kr rhe hain
    const res = await API.post(`/emergency/hospital/assign`, { 
      emergencyId: String(emergencyId).trim(), 
      hospitalId: String(hospitalId).trim() 
    });
    
    return res.data;
  } catch (error) {
    // Is log se hamein exact target URL pata chalega jo fail ho raha hai
    console.error("❌ Axios Details:", {
      url: error.config?.url,
      method: error.config?.method,
      data: error.config?.data
    });
    throw error;
  }
  },

  getHospitalById: async (id) => {
    const res = await API.get(`/hospitals/${id}`);
    return res.data;
  },
};

export default hospitalService;