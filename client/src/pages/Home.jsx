import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);

  // Get featured courses (first 3 for demo)
  const featuredCourses = courses.slice(0, 3);

return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="py-20 bg-[url('/University-1.jpeg')] bg-black opacity-75 bg-cover bg-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#FF6300]">Advance Your Career with NexGen University</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto font-bold text-white-500">
            Learn from industry experts and gain the skills you need to succeed in today's competitive job market.
          </p>
          <div className="space-x-4">
            <Link
              to="/courses"
              className="inline-block bg-white text-primary font-bold py-3 px-6 rounded-lg text-[#000365] hover:bg-gray-100 transition"
            >
              Browse Courses
            </Link>
            {user && (
              <Link
                to="/register"
                className="inline-block border-2 border-white text-white font-bold py-3 px-6 rounded-lg text-[#000365] hover:bg-white hover:text-primary transition"
              >
                Join Now
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#000365]">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
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
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {course.category}
                  </span>
                  <Link
                    to={`/courses/${course._id}`}
                    className="text-primary hover:underline"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/courses"
            className="btn-primary inline-block px-8 py-3"
          >
            View All Courses
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#FF6300]">Why Choose NexGen University?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="#FF6300" stroke="#FF6300" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#000365]">Quality Content</h3>
              <p className="text-gray-600">
                Learn from industry experts with real-world experience and up-to-date knowledge.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="#FF6300" stroke="#FF6300" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#000365]">Flexible Learning</h3>
              <p className="text-gray-600">
                Study at your own pace, anytime, anywhere with our online platform.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="#FF6300" stroke="#FF6300" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#000365]">Community Support</h3>
              <p className="text-gray-600">
                Join our active community of learners and get help when you need it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}