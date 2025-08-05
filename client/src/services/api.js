import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  googleAuth: (token) => api.post('/auth/google-auth', { token }),
  // googleAuth: (data) => api.post('/auth/google-auth', data),
};

export const courseService = {
  getCourses: () => api.get('/courses'),
  getCourseById: (id) => api.get(`/courses/${id}`),
  enrollCourse: (id) => api.post(`/courses/${id}/enroll`),
  createCourse: (courseData) => api.post('/courses', courseData),
  updateCourse: (id, courseData) => api.put(`/courses/${id}`, courseData),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
  trackProgress: (id, data) => api.post(`/courses/${id}/progress`, data),
};

export const forumService = {
  getPosts: () => api.get('/forum'),
  getPostById: (id) => api.get(`/forum/${id}`),
  createPost: (postData) => api.post('/forum', postData),
  createComment: (postId, commentData) => api.post(`/forum/${postId}/comments`, commentData),
  upvotePost: (postId) => api.post(`/forum/${postId}/upvote`),
};

export const userService = {
  updateProfile: (userId, profileData) => api.put(`/users/${userId}`, profileData),
  getUsers: () => api.get('/users'),
};

export default api;