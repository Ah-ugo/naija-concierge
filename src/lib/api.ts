import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if we're in the browser
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authApi = {
  login: async (email: string, password: string) => {
    try {
      const formData = new FormData();
      formData.append("grant_type", "password");
      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post("/auth/token", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for form data
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  register: async (userData: any) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateProfile: async (userData: any) => {
    try {
      const response = await api.put("/auth/profile", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      const response = await api.post("/auth/change-password", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Services API
export const servicesAPI = {
  getAllServices: async () => {
    try {
      const response = await api.get("/services");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getServiceById: async (id: string) => {
    try {
      const response = await api.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Packages API
export const packagesAPI = {
  getAllPackages: async () => {
    try {
      const response = await api.get("/packages");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getPackageById: async (id: string) => {
    try {
      const response = await api.get(`/packages/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Bookings API
export const bookingsAPI = {
  createBooking: async (bookingData: any) => {
    try {
      const response = await api.post("/bookings", bookingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getUserBookings: async () => {
    try {
      const response = await api.get("/bookings");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getBookingById: async (id: string) => {
    try {
      const response = await api.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateBookingStatus: async (id: string, status: string) => {
    try {
      const response = await api.put(`/bookings/${id}`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Blog API
export const blogAPI = {
  getAllBlogs: async () => {
    try {
      const response = await api.get("/blogs");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getBlogBySlug: async (slug: string) => {
    try {
      const response = await api.get(`/blogs/${slug}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Contact API
export const contactAPI = {
  sendContactForm: async (formData: any) => {
    try {
      const response = await api.post("/contact", formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Emergency API
export const emergencyAPI = {
  createEmergencyAlert: async (alertData: any) => {
    try {
      const response = await api.post("/emergency-alerts", alertData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getUserEmergencyAlerts: async () => {
    try {
      const response = await api.get("/emergency-alerts");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Admin API
export const adminAPI = {
  getDashboardStats: async () => {
    try {
      const response = await api.get("/admin/stats");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllUsers: async () => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllBookings: async () => {
    try {
      const response = await api.get("/bookings");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createService: async (serviceData: any) => {
    try {
      const response = await api.post("/services", serviceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateService: async (id: string, serviceData: any) => {
    try {
      const response = await api.put(`/services/${id}`, serviceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteService: async (id: string) => {
    try {
      const response = await api.delete(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createPackage: async (packageData: any) => {
    try {
      const response = await api.post("/packages", packageData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updatePackage: async (id: string, packageData: any) => {
    try {
      const response = await api.put(`/packages/${id}`, packageData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deletePackage: async (id: string) => {
    try {
      const response = await api.delete(`/packages/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createBlog: async (blogData: any) => {
    try {
      const response = await api.post("/blogs", blogData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateBlog: async (id: string, blogData: any) => {
    try {
      const response = await api.put(`/blogs/${id}`, blogData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteBlog: async (id: string) => {
    try {
      const response = await api.delete(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
