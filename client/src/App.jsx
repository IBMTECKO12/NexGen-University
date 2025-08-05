import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Forum from './pages/Forum';
import ForumPost from './pages/ForumPost';
import NewForumPost from './pages/NewForumPost';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Protected routes */}
        <Route path="dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="forum" element={<Forum />} />
        <Route path="forum/:id" element={<ForumPost />} />
        <Route path="forum/new" element={
          <ProtectedRoute>
            <NewForumPost />
          </ProtectedRoute>
        } />
        
        <Route path="admin/*" element={
          <ProtectedRoute requireRole="admin">
            <Admin />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;