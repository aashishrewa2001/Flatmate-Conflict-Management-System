
const User = require('../models/User');
const Complaint = require('../models/Complaint');

// Get leaderboard: users sorted by karmaPoints (desc)
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find({ flat: req.user.flat}).sort({ karmaPoints: -1 });
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get complaint statistics for the flat (complaint count by type)
const getFlatStats = async (req, res) => {
  try {
    const complaints = await Complaint.find({ flat: req.user.flat });
    const stats = complaints.reduce((acc, complaint) => {
      acc[complaint.type] = (acc[complaint.type] || 0) + 1;
      return acc;
    }, {});

   const activeStats = complaints.reduce((acc, complaint) => {
      if (complaint.resolved == false){
        acc[complaint.type] = (acc[complaint.type] || 0) + 1;
      }
      return acc;
    }, {});

    const resolvedStats = complaints.reduce((acc, complaint) => {
      if (complaint.resolved == true){
        acc[complaint.type] = (acc[complaint.type] || 0) + 1;
      }
      return acc;
    }, {});
    const arrayStats = [stats, activeStats, resolvedStats]
    
    res.json(arrayStats);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getLeaderboard, getFlatStats };
