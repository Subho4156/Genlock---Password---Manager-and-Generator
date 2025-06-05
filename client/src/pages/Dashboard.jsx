import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline'; // Import the Plus Icon
import Navbar from '../components/Navbar';
import PasswordForm from '../components/PasswordForm';
import PasswordCard from '../components/PasswordCard';
import API from '../utils/api.js';

const Dashboard = () => {
  const [passwords, setPasswords] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchPasswords = async () => {
    const res = await API.get('/passwords');
    setPasswords(res.data);
    setFiltered(res.data);
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const handleSearch = (query) => {
    setFiltered(
      passwords.filter((p) =>
        p.websiteName.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleAdd = (newItem) => {
    const updated = [newItem, ...passwords];
    setPasswords(updated);
    setFiltered(updated);
  };

  const handleDelete = (id) => {
    const updated = passwords.filter((p) => p._id !== id);
    setPasswords(updated);
    setFiltered(updated);
  };

  // 🔥 NEW: Handle password update
  const handleUpdate = (id, updatedItem) => {
    const updated = passwords.map((p) => (p._id === id ? updatedItem : p));
    setPasswords(updated);
    setFiltered(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 bg-gradient-to-r from-pink-500 to-yellow-500 ">
      <Navbar onSearch={handleSearch} />
      <div className="p-4 flex justify-end bg-gradient-to-r from-pink-500 to-yellow-500">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 "
        >
          <PlusIcon className="h-5 w-5" /> {/* Plus Icon */}
          Add Password
        </button>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gradient-to-r from-pink-500 to-yellow-500">
        {filtered.map((item) => (
          <PasswordCard
            key={item._id}
            data={item}
            onDelete={handleDelete}
            onUpdate={handleUpdate} // ✅ Pass the update function
          />
        ))}
      </div>
      {showForm && (
        <PasswordForm onClose={() => setShowForm(false)} onAdd={handleAdd} />
      )}
    </div>
  );
};

export default Dashboard;
