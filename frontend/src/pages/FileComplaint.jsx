
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileComplaint = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Noise'); // Default type
  const [severity, setSeverity] = useState('Mild'); // Default severity
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/complaints`,
        { title, description, type, severity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Redirect to dashboard after filing the complaint
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error filing complaint');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl p-8 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">File a Complaint</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Complaint Title"
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue..."
              rows="4"
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            ></textarea>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Complaint Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="Noise">Noise</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Bills">Bills</option>
                <option value="Pets">Pets</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="Mild">Mild</option>
                <option value="Annoying">Annoying</option>
                <option value="Major">Major</option>
                <option value="Nuclear">Nuclear</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileComplaint;

