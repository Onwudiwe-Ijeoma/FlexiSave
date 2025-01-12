import { API_ENDPOINTS } from "./endpoints";
import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add request interceptor for debugging
api.interceptors.request.use((config) => {
  console.log('API Request:', {
    url: config.url,
    method: config.method,
    data: config.data,
    headers: config.headers
  });
  return config;
});

export const authService = {
  login: (credentials) =>
    api.post(API_ENDPOINTS.AUTH.LOGIN, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
  register: (userData) => api.post(API_ENDPOINTS.AUTH.REGISTER, userData),
};

export const userService = {
  getProfile: () => api.get("/user/profile"),
  updateProfile: (data) => api.put("/user/profile", data),
};

export const transactionService = {
  getAll: () => api.get("/transactions"),
  create: (transactionData) => api.post("/transactions", transactionData),
  // Add other transaction-related endpoints
};

export const questService = {
  getAll: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.QUEST.GET_ALL);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
  create: async (questData) => {
    try {
      const response = await api.post(API_ENDPOINTS.QUEST.CREATE, questData);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  }
};

const submitForm = async () => {
  try {
    // Ensure you're passing a plain object
    const response = await questService.create(toRaw(formData)); // Pass formData as a plain object
    console.log("Response:", response);
  } catch (error) {
    console.error("Error during form submission:", error);
  }
};

// Error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      // Redirect to login if needed
    }
    return Promise.reject(error);
  }
);

export default api;