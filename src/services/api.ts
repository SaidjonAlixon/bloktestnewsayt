import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token');
      localStorage.removeItem('testblok_current_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (userData: any) =>
    api.post('/auth/register', userData),
  
  verifyToken: () =>
    api.get('/auth/verify'),
};

// Users API
export const usersAPI = {
  getUsers: () =>
    api.get('/users'),
  
  getUserById: (id: string) =>
    api.get(`/users/${id}`),
  
  updateUser: (id: string, userData: any) =>
    api.put(`/users/${id}`, userData),
  
  blockUser: (id: string) =>
    api.patch(`/users/${id}/block`),
  
  unblockUser: (id: string) =>
    api.patch(`/users/${id}/unblock`),
  
  grantDirectionAccess: (userId: string, directionId: string) =>
    api.post(`/users/${userId}/grant-access`, { directionId }),
};

// Directions API
export const directionsAPI = {
  getDirections: () =>
    api.get('/directions'),
  
  getDirectionById: (id: string) =>
    api.get(`/directions/${id}`),
  
  createDirection: (directionData: any) =>
    api.post('/directions', directionData),
  
  updateDirection: (id: string, directionData: any) =>
    api.put(`/directions/${id}`, directionData),
  
  deleteDirection: (id: string) =>
    api.delete(`/directions/${id}`),
  
  toggleDirectionStatus: (id: string) =>
    api.patch(`/directions/${id}/toggle-status`),
};

// Questions API
export const questionsAPI = {
  getQuestionsBySubject: (subjectId: string) =>
    api.get(`/questions/subject/${subjectId}`),
  
  createQuestion: (questionData: any) =>
    api.post('/questions', questionData),
  
  updateQuestion: (id: string, questionData: any) =>
    api.put(`/questions/${id}`, questionData),
  
  deleteQuestion: (id: string) =>
    api.delete(`/questions/${id}`),
  
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/questions/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Tests API
export const testsAPI = {
  startTest: (directionId: string) =>
    api.post('/tests/start', { directionId }),
  
  getTestSession: (sessionId: string) =>
    api.get(`/tests/session/${sessionId}`),
  
  submitAnswer: (sessionId: string, questionId: string, answer: string) =>
    api.post(`/tests/session/${sessionId}/answer`, { questionId, answer }),
  
  completeTest: (sessionId: string) =>
    api.post(`/tests/session/${sessionId}/complete`),
  
  getTestResults: (sessionId: string) =>
    api.get(`/tests/session/${sessionId}/results`),
  
  getUserResults: (userId: string) =>
    api.get(`/tests/user/${userId}/results`),
};

// Payments API
export const paymentsAPI = {
  getPayments: () =>
    api.get('/payments'),
  
  createPayment: (paymentData: any) =>
    api.post('/payments', paymentData),
  
  updatePaymentStatus: (id: string, status: string) =>
    api.patch(`/payments/${id}/status`, { status }),
  
  getUserPayments: (userId: string) =>
    api.get(`/payments/user/${userId}`),
};

// Analytics API
export const analyticsAPI = {
  getOverallStats: () =>
    api.get('/analytics/stats'),
  
  getUserAnalytics: (userId: string) =>
    api.get(`/analytics/user/${userId}`),
  
  getDirectionAnalytics: (directionId: string) =>
    api.get(`/analytics/direction/${directionId}`),
  
  getQuestionAnalytics: () =>
    api.get('/analytics/questions'),
};

export default api;