
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Trending = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');

  const fetchTrendingComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/complaints/trending`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch trending complaints');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTrendingComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
          Trending Complaints
        </h1>
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        {complaints.length === 0 ? (
          <p className="text-center text-gray-600">No trending complaints found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-indigo-500 transform transition duration-300 hover:scale-105"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  {complaint.title}
                </h2>
                <p className="text-gray-600 mb-4">{complaint.description}</p>
                <div className="items-center justify-between">
                  <span className="text-lg font-bold text-indigo-600">Type: <span className='text-slate-400'>{complaint.type} </span></span><br />
                  <span className="text-lg font-bold text-indigo-600">Votes:  <span className='text-slate-400'>{complaint.votes}</span></span>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;

