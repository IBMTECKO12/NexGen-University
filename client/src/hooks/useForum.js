import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForumPosts } from '../features/forumSlice';

export const useForum = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.forum);

  useEffect(() => {
    dispatch(fetchForumPosts());
  }, [dispatch]);

  return {
    posts,
    isLoading: status === 'loading',
    error,
  };
};