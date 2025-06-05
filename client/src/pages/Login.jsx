import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/outline'; // Use ArrowRightIcon instead of LoginIcon

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.log(error)
      alert('Login failed! Check credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Login</h2>

        {/* Username Input */}
        <div className="flex items-center border-b-2 border-gray-300 mb-4">
          <UserIcon className="h-6 w-6 text-gray-500 mr-3" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 bg-transparent focus:outline-none"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center border-b-2 border-gray-300 mb-6">
          <LockClosedIcon className="h-6 w-6 text-gray-500 mr-3" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 bg-transparent focus:outline-none"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Login Button */}
        <button className="w-full bg-green-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition">
          <ArrowRightIcon className="h-5 w-5" />
          Login
        </button>

        {/* Sign Up Prompt */}
        <p className="text-sm mt-6 text-center">
          Don't have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
