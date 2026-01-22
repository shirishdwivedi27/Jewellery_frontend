import axios from "axios";


const API_BASE_URL =  "https://flask-api-s.onrender.com";


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem("token");
   const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- PRODUCTS ----
export const getProducts = () => api.get("/products");
export const getProductById = (id) => api.get(`/products/${id}`);
export const getCategories = () => api.get("/categories");
export const getProductsByCategory = (category) => api.get(`/products/category/${category}`);

// ---- AUTH ----
export const loginUser = (data) => api.post("/login", data);

export const registerUser = (data) => api.post("/register", data);

export const getProfile = () => api.get("/profile");

// ---- CART ----
export const getCart = () => api.get("/cart");
export const addToCart = (data) => api.post("/cart", data);
export const removeFromCart = (productId) => api.delete(`/cart/${productId}`);

// ---- ORDERS ----
export const getOrders = () => api.get("/orders");
export const createOrder = (data) => api.post("/orders", data);

// ---- CONTACT ----
export const submitContact = (data) => api.post("/api/contact", data);



export default api;
