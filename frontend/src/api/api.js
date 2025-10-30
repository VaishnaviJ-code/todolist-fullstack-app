import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests BEFORE sending
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Adding token:', token ? '✅ Found' : '❌ Not found'); // Debug log
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error.response?.status, error.response?.data); // Debug log
    
    if (error.response?.status === 401) {
      console.log('Unauthorized - Removing token and redirecting to login');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  signup: (data) => api.post('/users/signup', data),
  login: (data) => api.post('/users/login', data),
};

// Task APIs
export const taskAPI = {
  createTask: (data) => api.post('/tasks', data),
  getTasks: () => api.get('/tasks'),
  updateTask: (id, data) => api.patch(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export default api;
