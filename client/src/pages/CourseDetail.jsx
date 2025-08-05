import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseById, enrollCourse } from '../features/courseSlice';

export default function CourseDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentCourse, status, error } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCourseById(id));
  }, [id, dispatch]);

  const handleEnroll = async () => {
    try {
      await dispatch(enrollCourse(id)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error('Enrollment failed:', err);
    }
  };

  if (status === 'loading') {
    return <div className="text-center py-8">Loading course details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (!currentCourse) {
    return <div className="text-center py-8">Course not found</div>;
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            {currentCourse.thumbnail ? (
              <img
                src={currentCourse.thumbnail}
                alt={currentCourse.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-gray-500">No thumbnail</span>
            )}
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{currentCourse.title}</h1>
            <div className="flex items-center mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-3">
                {currentCourse.category}
              </span>
              <span className="text-gray-600">
                Created by {currentCourse.instructor?.profile?.name || 'Unknown'}
              </span>
            </div>
            <p className="text-gray-700 mb-6">{currentCourse.description}</p>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Course Content</h2>
              <div className="space-y-3">
                {currentCourse.modules.map((module, mIdx) => (
                  <div key={mIdx} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium mb-2">{module.title}</h3>
                    <ul className="ml-4 space-y-2">
                      {module.lessons.map((lesson, lIdx) => (
                        <li key={lIdx} className="text-gray-600">
                          {lesson.title} ({lesson.duration} min)
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {user && (
              <button
                onClick={handleEnroll}
                className="btn-primary"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Processing...' : 'Enroll Now'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}