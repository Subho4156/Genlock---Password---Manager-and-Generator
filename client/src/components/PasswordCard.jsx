import { useState } from 'react';
import API from '../utils/api.js';
import {
  ClipboardIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const PasswordCard = ({ data, onDelete, onUpdate }) => {
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    websiteName: data.websiteName,
    websiteLink: data.websiteLink,
    username: data.username,
    password: data.password,
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.password);
    alert('Password copied to clipboard!');
  };

  const handleDelete = async () => {
    await API.delete(`/passwords/${data._id}`);
    onDelete(data._id);
  };

  const handleUpdate = async () => {
    try {
      const res = await API.put(`/passwords/${data._id}`, formData);
      onUpdate(data._id, res.data.updatedPassword);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert('Failed to update password.');
    }
  };

  return (
    <div className="border border-white/40 p-4 rounded-lg shadow-lg bg-white/40 backdrop-blur-md transition-all duration-300 hover:shadow-xl">
      {isEditing ? (
        <>
          <input
            type="text"
            value={formData.websiteName}
            onChange={(e) => setFormData({ ...formData, websiteName: e.target.value })}
            className="w-full mb-2 px-2 py-1 border rounded bg-white/70"
          />
          <input
            type="text"
            value={formData.websiteLink}
            onChange={(e) => setFormData({ ...formData, websiteLink: e.target.value })}
            className="w-full mb-2 px-2 py-1 border rounded bg-white/70"
          />
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full mb-2 px-2 py-1 border rounded bg-white/70"
          />
          <input
            type="text"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full mb-2 px-2 py-1 border rounded bg-white/70"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <CheckIcon className="h-5 w-5" />
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <XMarkIcon className="h-5 w-5" />
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="font-bold text-lg">{data.websiteName}</h3>
          <p className="text-sm text-gray-200">{data.websiteLink}</p>
          <p className="mt-1">
            <span className="font-medium">Username:</span> {data.username}
          </p>
          <p className="mt-1">
            <span className="font-medium">Password:</span>{' '}
            {show ? data.password : '••••••••'}
            <button onClick={() => setShow(!show)} className="text-blue-200 ml-2">
              {show ? (
                <EyeSlashIcon className="h-5 w-5 inline " />
              ) : (
                <EyeIcon className="h-5 w-5 inline" />
              )}
            </button>
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={copyToClipboard}
              className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <ClipboardIcon className="h-5 w-5" />
              Copy
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <PencilSquareIcon className="h-5 w-5" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <TrashIcon className="h-5 w-5" />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordCard;
