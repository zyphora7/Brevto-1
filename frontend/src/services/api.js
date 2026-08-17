import axios from "axios";

// Create Axios Instance
const api = axios.create({
  baseURL: "/api"
});

// Request Interceptor to add JWT authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication API calls
export const signupAPI = async (name, email, password) => {
  const response = await api.post("/auth/signup", { name, email, password });
  return response.data;
};

export const loginAPI = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const logoutAPI = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// Blogs API calls
export const getBlogsAPI = async () => {
  const response = await api.get("/blogs");
  return response.data;
};

export const getBlogByIdAPI = async (id) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

export const createBlogAPI = async (title, content) => {
  const response = await api.post("/blogs", { title, content });
  return response.data;
};

// Users API calls
export const getMeAPI = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export default api;
