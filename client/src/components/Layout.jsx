import { Outlet, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Layout() {
  const { user } = useSelector((state) => state.auth)
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            NexGen University
          </Link>
          <nav className="flex space-x-6">
            <Link to="/courses" className="text-gray-700 hover:text-primary">
              Courses
            </Link>
            {user ? (
              <Link to="/dashboard" className="text-gray-700 hover:text-primary">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary">
                  Login
                </Link>
                <Link to="/register" className="text-gray-700 hover:text-primary">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      
      <footer className="bg-[#000365] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} NexGen University. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}