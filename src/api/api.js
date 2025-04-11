import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true 
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default {
  movies: {
    getFeatured: () => api.get('/movies/featured'),
    getAll: () => api.get('/movies'),
    getById: (id) => api.get(`/movies/${id}`),
    search: (query) => api.get(`/movies/search?title=${query}`)
  },
  tvshows: {
    getFeatured: () => api.get('/tvshows/featured'),
    getAll: () => api.get('/tvshows'),
    getById: (id) => api.get(`/tvshows/${id}`),
    search: (query) => api.get(`/tvshows/search?title=${query}`)
  },
  auth: {
    register: (user) => api.post('/users/register', user),
    login: (credentials) => api.post('/users/authenticate', credentials)
  },
  users: {
    getById: (id) => api.get(`/users/${id}`)
  }
};