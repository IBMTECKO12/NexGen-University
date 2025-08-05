import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../features/authSlice';
import { fetchCourses } from '../features/courseSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(fetchCourses());
  }, [dispatch]);

  if (!user) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  const enrolledCourses = courses.filter(course => 
    user.progress.currentCourses.some(c => c.courseId === course._id)
  );

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome back, {user.profile.name}!</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Your Courses</h2>
          {enrolledCourses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
              <a href="/courses" className="btn-primary inline-block">
                Browse Courses
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => {
                const progress = user.progress.currentCourses.find(c => c.courseId === course._id)?.progress || 0;
                return (
                  <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-40 bg-gray-200 flex items-center justify-center">
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500">No thumbnail</span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Progress: {Math.round(progress)}%
                      </p>
                      <a
                        href={`/courses/${course._id}`}
                        className="text-primary hover:underline"
                      >
                        Continue Learning
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {user.role === 'instructor' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Instructor Dashboard</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Your Created Courses</h3>
                <a
                  href="/admin/courses/new"
                  className="btn-primary"
                >
                  Create New Course
                </a>
              </div>
              {/* Instructor courses list would go here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}