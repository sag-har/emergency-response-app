import API from "./api";

// ==========================================
// GET ALL CONTACTS
// GET /api/emergency/contacts
// ==========================================
export const getContacts = async () => {
  try {
    const response = await API.get("/emergency/contacts");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Unable to load emergency contacts.",
      }
    );
  }
};

// ==========================================
// ADD CONTACT
// POST /api/emergency/contacts
// ==========================================
export const addContact = async (
  name,
  phone_number,
  relation
) => {
  try {
    const response = await API.post(
      "/emergency/contacts",
      {
        name,
        phone_number,
        relation,
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Unable to add emergency contact.",
      }
    );
  }
};

// ==========================================
// DELETE CONTACT
// DELETE /api/emergency/contacts/:id
// ==========================================
export const deleteContact = async (
  contactId
) => {
  try {
    const response = await API.delete(
      `/emergency/contacts/${contactId}`
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Unable to delete contact.",
      }
    );
  }
};

// ==========================================
// SEND SOS NOTIFICATION
// POST /api/emergency/contacts/:id/notify
// ==========================================
export const notifyContact = async (
  contactId
) => {
  try {
    const response = await API.post(
      `/emergency/contacts/${contactId}/notify`
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Unable to notify contact.",
      }
    );
  }
};

// ==========================================
// GET CONTACT COUNT
// ==========================================
export const getContactCount = async () => {
  try {
    const response = await getContacts();

    if (response.success) {
      return response.data.length;
    }

    return 0;
  } catch {
    return 0;
  }
};

// ==========================================
// FIND CONTACT
// ==========================================
export const getContactById = async (
  contactId
) => {
  try {
    const response = await getContacts();

    if (!response.success) return null;

    return response.data.find(
      (contact) => contact.id === contactId
    );
  } catch {
    return null;
  }
};