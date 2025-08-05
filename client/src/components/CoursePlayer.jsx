import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '@vimeo/player';

export default function CoursePlayer() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/courses/${courseId}`);
        setCourse(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    if (!course || !course.modules[currentModule]?.lessons[currentLesson]?.videoId) return;

    const iframe = document.getElementById('vimeo-player');
    const newPlayer = new window.Vimeo.Player(iframe);

    newPlayer.loadVideo(course.modules[currentModule].lessons[currentLesson].videoId);
    setPlayer(newPlayer);

    return () => {
      if (player) player.destroy();
    };
  }, [course, currentModule, currentLesson]);

  const handleLessonComplete = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/courses/${courseId}/progress`,
        { moduleIndex: currentModule, lessonIndex: currentLesson },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Update UI or state to reflect completion
    } catch (err) {
      console.error('Error marking lesson as complete:', err);
    }
  };

  if (!course) return <div>Loading course...</div>;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">{course.title}</h2>
          <div className="space-y-2">
            {course.modules.map((module, mIdx) => (
              <div key={mIdx} className="border border-gray-200 rounded-lg">
                <button
                  className={`w-full text-left p-3 font-medium ${
                    currentModule === mIdx ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => setCurrentModule(mIdx)}
                >
                  {module.title}
                </button>
                {currentModule === mIdx && (
                  <ul className="pl-6 pb-2">
                    {module.lessons.map((lesson, lIdx) => (
                      <li
                        key={lIdx}
                        className={`py-2 px-3 cursor-pointer ${
                          currentLesson === lIdx ? 'text-primary font-medium' : 'text-gray-700'
                        }`}
                        onClick={() => setCurrentLesson(lIdx)}
                      >
                        {lesson.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">
            {course.modules[currentModule].lessons[currentLesson].title}
          </h3>
          
          {/* Video Player */}
          <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden mb-4">
            <iframe
              id="vimeo-player"
              src={`https://player.vimeo.com/video/${course.modules[currentModule].lessons[currentLesson].videoId}`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>

          {/* Lesson Description */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <p>{course.modules[currentModule].lessons[currentLesson].description}</p>
          </div>

          {/* Resources */}
          {course.modules[currentModule].lessons[currentLesson].resources?.length > 0 && (
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h4 className="font-medium mb-2">Resources</h4>
              <ul className="space-y-2">
                {course.modules[currentModule].lessons[currentLesson].resources.map(
                  (resource, idx) => (
                    <li key={idx}>
                      <a
                        href={resource.url}
                        download
                        className="text-primary hover:underline flex items-center"
                      >
                        <span className="mr-2">📄</span>
                        {resource.name}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Complete Button */}
          <button
            onClick={handleLessonComplete}
            className="btn-primary mt-4"
          >
            Mark as Complete
          </button>
        </div>
      </div>
    </div>
  );
}