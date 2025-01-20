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
  getCurrentUser: async () => {
    try {
      const response = await api.get('api/user/auth');
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  }
};

export const userService = {
  getProfile: () => api.get("/user/profile"),
  updateProfile: (data) => api.put("/user/profile", data),
};

export const transactionService = {
  getAll: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.TRANSACTIONS.GET_ALL);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
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
  getOne: (questId) => api.get(`/api/quests/${questId}`),
  create: async (questData) => {
    try {
      const response = await api.post(API_ENDPOINTS.QUEST.CREATE, questData);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
  joinQuest: (questId) => api.post(`/api/quests/${questId}/join`),
  updateQuest: (formData) => api.put(`/api/quests/${formData.id}`, formData),
  leaveQuest: (questId) => api.post(`/api/quests/${questId}/leave`),
  deleteQuest: (questId) => api.delete(`/api/quests/${questId}`),
  contributeToQuest: (questId, formData) => api.post(`/api/quests/${questId}/contribute`, formData),
};
export const leaderBoardService = {
  getAll: () => api.get("/api/leaderboard?top=10"),
  getOne: (leadId) => api.get(`/api/leaderboard?top=10&questId=${leadId}`),
  // create: (questData) => api.post("/api/quests", questData),
};

export const achievementsService = {
  getAll: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.ACHIEVEMENTS.GET_ALL);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
  update: async (achievementId, achievementData) => {
    try {
      const response = await api.put(API_ENDPOINTS.ACHIEVEMENTS.UPDATE(achievementId), achievementData);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
  create: async (achievementData) => {
    try {
      const response = await api.post(API_ENDPOINTS.ACHIEVEMENTS.CREATE, achievementData);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
  getOne: async (achievementId) => {
    try {
      const response = await api.get(API_ENDPOINTS.ACHIEVEMENTS.GET_ONE(achievementId));
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  }
};

export const userAchievementsService = {
  getActive: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.USER_ACHIEVEMENTS.ACTIVE);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  }
};

export const rewardsService = {
  getAll: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.REWARDS.GET_ALL);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
  getOne: async (rewardId) => {
    try {
      const response = await api.get(API_ENDPOINTS.REWARDS.GET_ONE(rewardId));
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
  claim: async (rewardId, claimData = {}) => {
    try {
      const response = await api.post(API_ENDPOINTS.REWARDS.CLAIM(rewardId), claimData);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  }
};

export const marketplaceService = {
  getAll: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.MARKETPLACE.GET_ALL);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
  purchase: async (productId, purchaseData) => {
    try {
      const response = await api.post(API_ENDPOINTS.MARKETPLACE.PURCHASE(productId), purchaseData);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  }
};

export const personalSavingsService = {
  create: async (savingsData) => {
    try {
      const response = await api.post(API_ENDPOINTS.SAVE.CREATE, savingsData);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
  getAll: async () => {
    try {
      const response = await api.get('/api/personalsavings');
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
  getOne: async (savingId) => {
    try {
      const response = await api.get(API_ENDPOINTS.SAVE.GET_ONE(savingId));
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
  delete: async (savingId) => {
    try {
      const response = await api.delete(`/api/personalsavings/${savingId}`);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
  fundPlan: async (planId, fundData) => {
    try {
      const response = await api.put(`api/personalsavings/${planId}`, fundData);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
  update: async (savingId, updateData) => {
    try {
      const response = await api.put(API_ENDPOINTS.SAVE.UPDATE(savingId), updateData);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
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