
// export default Dashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');

  // Fetch all active complaints for the flat
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/complaints`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError('Failed to fetch complaints');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Handle voting (upvote/downvote)
  const handleVote = async (complaintId, voteType) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/complaints/${complaintId}/vote`,
        { voteType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComplaints(); // Refresh after voting
    } catch (err) {
      console.error('Vote error:', err.response?.data || err.message);
    }
  };

  // Handle resolving a complaint
  const handleResolve = async (complaintId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/complaints/${complaintId}/resolve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComplaints(); // Refresh after resolving
    } catch (err) {
      console.error('Resolve error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">Dashboard</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {complaints.length === 0 ? (
          <p className="text-center text-gray-600">No complaints found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                className="bg-white rounded-lg shadow-xl p-6 border-t-4 border-indigo-500 flex flex-col h-full transform transition duration-300 hover:scale-105"
              >
                <div className='mb-3'>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {complaint.title}
                  </h2>
                  <p className="text-gray-500 mb-4">{complaint.description}</p>
                  <p className="text-gray-700">
                    Net Votes: <span className="font-bold">{complaint.votes}</span>
                  </p>
                  <p className="text-gray-700">
                    UpVote: <span className="font-bold">{complaint.upvotes.length}</span>
                  </p>
                  <p className="text-gray-700">
                    DownVote: <span className="font-bold">{complaint.downvotes.length}</span>
                  </p>
                </div>
                {/* This container is pushed to the bottom */}
                <div className="mt-auto">
                  <div className="flex justify-between mb-3">
                    <button
                      onClick={() => handleVote(complaint._id, 'upvote')}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Upvote
                    </button>
                    <button
                      onClick={() => handleVote(complaint._id, 'downvote')}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Downvote
                    </button>
                  </div>
                  {!complaint.resolved && (
                    <button
                      onClick={() => handleResolve(complaint._id)}
                      className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      Resolve Complaint
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
