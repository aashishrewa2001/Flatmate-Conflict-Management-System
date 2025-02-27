
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  // State for active tab: "leaderboard" or "flatStats"
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [flatStats, setFlatStats] = useState({});
  const [activeStats, setActiveStats] = useState({});
  const [resolvedStats, setResolvedStats] = useState({});
  const [error, setError] = useState("");

  // Fetch leaderboard data from /api/leaderboard
  const fetchLeaderboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/leaderboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaderboardData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch leaderboard");
      console.error(err);
    }
  };

  // Fetch flat statistics from /api/flat/stats
  const fetchFlatStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/flat/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Assuming the API returns an array: [totalStats, activeStats, resolvedStats]
      setFlatStats(
        typeof res.data[0] === "object" && !Array.isArray(res.data[0]) ? res.data[0] : {}
      );
      setActiveStats(
        typeof res.data[1] === "object" && !Array.isArray(res.data[1]) ? res.data[1] : {}
      );
      setResolvedStats(
        typeof res.data[2] === "object" && !Array.isArray(res.data[2]) ? res.data[2] : {}
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch flat statistics");
      console.error(err);
    }
  };

  // Fetch data when activeTab changes
  useEffect(() => {
    if (activeTab === "leaderboard") {
      fetchLeaderboard();
    } else {
      fetchFlatStats();
    }
  }, [activeTab]);

  // Render Leaderboard Table
  const renderLeaderboard = () => {
    return leaderboardData.length === 0 ? (
      <p className="text-center text-gray-600">No users found.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <th className="py-3 px-6 text-left">Rank</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Karma Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-100 transition">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.karmaPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render Flat Statistics in a responsive grid
  const renderFlatStats = () => {
    const entriesTotal = Object.entries(flatStats);
    const entriesActive = Object.entries(activeStats);
    const entriesResolved = Object.entries(resolvedStats);
    
    return entriesTotal.length === 0 ? (
      <p className="text-center text-gray-600">No statistics available.</p>
    ) : (
      <>
          <div className="mb-10">
            <div className="mb-3">
              <h2 className="text-2xl font-bold text-slate-600 mb-3">Total Complaints</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {entriesTotal.map(([type, count]) => (
                  <div
                    key={type}
                    className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl p-6 text-center transform transition duration-300 hover:scale-105"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{type}</h3>
                    <p className="text-4xl font-extrabold text-indigo-600">{count}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-600 mb-3">Active Complaints</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {entriesActive.map(([type, count]) => (
                  <div
                    key={type}
                    className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl p-6 text-center transform transition duration-300 hover:scale-105"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{type}</h3>
                    <p className="text-4xl font-extrabold text-red-600">{count}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-30">
              <h2 className="text-2xl font-bold text-slate-600 mb-3">Resolved Complaints</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {entriesResolved.map(([type, count]) => (
                  <div
                    key={type}
                    className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl p-6 text-center transform transition duration-300 hover:scale-105"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{type}</h3>
                    <p className="text-4xl font-extrabold text-green-600">{count}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
          {activeTab === "leaderboard" ? "Leaderboard" : "Flat Statistics"}
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`px-4 py-2 rounded font-semibold transition ${
              activeTab === "leaderboard"
                ? "bg-indigo-700 text-white shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setActiveTab("flatStats")}
            className={`px-4 py-2 rounded font-semibold transition ${
              activeTab === "flatStats"
                ? "bg-indigo-700 text-white shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Flat Stats
          </button>
        </div>
        {activeTab === "leaderboard" ? renderLeaderboard() : renderFlatStats()}
      </div>
    </div>
  );
};

export default Leaderboard;
