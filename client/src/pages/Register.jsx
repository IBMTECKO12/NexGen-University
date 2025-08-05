import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loadUser } from '../features/authSlice';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(loadUser())
        .unwrap()
        .then(() => navigate('/dashboard'))
        .catch(() => {});
    }
  }, [token, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      alert('Passwords do not match');
      return;
    }
    dispatch(registerUser(formData));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#000365]">Create Your Account</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field bg-gray-100 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field bg-gray-100 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-field bg-gray-100 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your password"
            required
            minLength="6"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="passwordConfirm">
            Confirm Password
          </label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            className="input-field bg-gray-100 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Confirm your password"
            required
            minLength="6"
          />
        </div>
        <button
          type="submit"
          className="btn-primary w-full py-3 px-4 rounded-md text-white font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
          style={{ backgroundColor: '#FF6300', color: '#ffffff' }}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}