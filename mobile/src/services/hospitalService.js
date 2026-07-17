import API from "./api";

const hospitalService = {

  getNearestHospitals: async (lat, lng) => {
    const res = await API.get(
      `/emergency/hospitals?lat=${lat}&lng=${lng}`
    );
    return res.data;
  },

  getHospitalById: async (id) => {
    const res = await API.get(`/hospitals/${id}`);
    return res.data;
  },

  getAvailableHospitals: async (lat, lng) => {
    const res = await API.get(
      `/emergency/hospitals?lat=${lat}&lng=${lng}`
    );
    return res.data;
  },

};

export default hospitalService;