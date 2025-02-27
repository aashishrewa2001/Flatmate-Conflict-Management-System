
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Punishment = () => {
  const [complaints, setComplaints] = useState([]);
  
  // Fetch all complaints for the current flat/user
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/complaints`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);


  // Automatically generate punishment without a button
  const handlePunish = async (complaintId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:5000/api/punishments/${complaintId}/punish`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh complaints after punishment assignment
      fetchComplaints();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8">
          Punishment Generator
        </h1>
        {complaints.length === 0 ? (
          <p className="text-center text-gray-600">No complaints available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-2xl p-6 flex flex-col h-full transform transition duration-300 hover:scale-105">
                <div>
                  <h2 className="text-xl font-bold text-gray-600 mb-2">
                    C.ID: <span className="text-slate-400">{complaint._id}</span>
                  </h2>
                  <h2 className="text-2xl font-bold text-gray-600 mb-2">{complaint.title}</h2>
                  <p className="text-gray-600 mb-4">{complaint.description}</p>
                  <p className="text-xl font-bold text-gray-600">
                    UpVotes: <span className="text-slate-400">{complaint.upvotes.length}</span>
                  </p>
                </div>

               {/* Bottom container for punishment block */}

               <div className="mt-auto">
                 {complaint.upvotes.length >= 1 ? (
                   <div className="mt-4 mb-4 p-4 bg-indigo-50 border border-indigo-200 rounded">
                     <h3 className="text-lg font-semibold text-indigo-800">Punishment:</h3>
                     {complaint.punishment ? (
                       <p className="text-indigo-600">{complaint.punishment}</p>
                     ) : (
                      handlePunish(complaint._id)
                     )}
                   </div>
                 ) : (
                   <div className="mt-4 mb-4 p-4 bg-indigo-50 border border-indigo-200 rounded">
                     <h3 className="text-lg font-semibold text-indigo-800">Punishment:</h3>
                     <p className="text-green-500">
                       No Punishment! <br /> Not enough upvotes.
                     </p>
                   </div>
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

export default Punishment;
