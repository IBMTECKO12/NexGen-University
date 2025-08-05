import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { user, token, status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && !user) {
      dispatch(loadUser());
    }
  }, [token, user, dispatch]);

  const requireAuth = (redirectTo = '/login') => {
    if (!token) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  const requireRole = (role, redirectTo = '/') => {
    if (!user || user.role !== role) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  return {
    user,
    token,
    isAuthenticated: !!token,
    isLoading: status === 'loading',
    error,
    requireAuth,
    requireRole,
  };
};