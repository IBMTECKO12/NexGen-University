import { authService } from './api';

export const setupAuthInterceptors = (store) => {
  // Response interceptor for handling 401 errors
  authService.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        store.dispatch({ type: 'auth/logout' });
      }
      return Promise.reject(error);
    }
  );
};