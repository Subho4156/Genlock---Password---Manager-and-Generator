import { useState } from 'react';
import API from '../utils/api.js';
import { EyeIcon, EyeSlashIcon, WrenchIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const PasswordForm = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    websiteName: '',
    websiteLink: '',
    username: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false); // For password visibility toggle

  const generatePassword = () => {
    const date = new Date();
    const cap = form.username.charAt(0).toUpperCase() + form.username.slice(1);
    const formatted = `${cap}-${Math.random().toString(36).slice(-4)}@${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`;
    setForm({ ...form, password: formatted });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/passwords', form);
      onAdd(res.data);
      onClose();
    } catch (err) {
      console.error('Error saving password:', err);
      alert('Failed to save password');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-96 ">
        <h2 className="text-2xl mb-6 font-semibold text-gray-800">Add Password</h2>
        
        {/* Website Name */}
        <input
          type="text"
          name="websiteName"
          placeholder="Website Name"
          className="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.websiteName}
          onChange={(e) => setForm({ ...form, websiteName: e.target.value })}
          required
        />

        {/* Website Link */}
        <input
          type="text"
          name="websiteLink"
          placeholder="Website Link"
          className="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.websiteLink}
          onChange={(e) => setForm({ ...form, websiteLink: e.target.value })}
          required
        />

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        {/* Password with Generate Button */}
        <div className="flex gap-2 mb-4">
          <div className="relative w-full">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="w-full p-3 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {passwordVisible ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          <button
            type="button"
            onClick={generatePassword}
            className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
          >
            <WrenchIcon className="h-5 w-5" />
            Generate
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-200 flex items-center gap-2"
          >
            <XMarkIcon className="h-5 w-5" />
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
          >
            <CheckIcon className="h-5 w-5" />
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
