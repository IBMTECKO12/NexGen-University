import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, fetchCourseById } from '../features/courseSlice';

export const useCourses = () => {
  const dispatch = useDispatch();
  const { courses, currentCourse, enrolledCourses, status, error } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchCourses());
    }
  }, [dispatch, courses.length]);

  const getCourse = (id) => {
    dispatch(fetchCourseById(id));
  };

  return {
    courses,
    currentCourse,
    enrolledCourses,
    isLoading: status === 'loading',
    error,
    getCourse,
  };
};