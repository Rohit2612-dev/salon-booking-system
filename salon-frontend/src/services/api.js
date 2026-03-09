const BASE_URL = "";

const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || `HTTP error! status: ${res.status}`);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch (err) {
    throw err;
  }
};

// Auth
export const loginUser = (data) =>
  request("/api/users/login", { method: "POST", body: JSON.stringify(data) });

// Users
export const registerUser = (data) =>
  request("/api/users/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const getAllUsers = () => request("/api/users");

// Services
export const addService = (data) =>
  request("/api/services", { method: "POST", body: JSON.stringify(data) });
export const getAllServices = () => request("/api/services");

// Staff
export const addStaff = (data) =>
  request("/api/staff", { method: "POST", body: JSON.stringify(data) });
export const getAllStaff = () => request("/api/staff");
export const getStaffById = (id) => request(`/api/staff/${id}`);
export const updateStaff = (id, data) =>
  request(`/api/staff/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteStaff = (id) =>
  request(`/api/staff/${id}`, { method: "DELETE" });

// Bookings
export const addBooking = (data) =>
  request("/api/bookings", { method: "POST", body: JSON.stringify(data) });
export const getAllBookings = () => request("/api/bookings");
export const getBookingById = (id) => request(`/api/bookings/${id}`);
export const updateBooking = (id, data) =>
  request(`/api/bookings/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const updateBookingStatus = (id, status) =>
  request(`/api/bookings/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
export const deleteBooking = (id) =>
  request(`/api/bookings/${id}`, { method: "DELETE" });
