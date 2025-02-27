

const Complaint = require('../models/Complaint');
const Vote = require('../models/Vote');
const User = require('../models/User');
const Karma = require('../models/Karma');

// File a new complaint
const fileComplaint = async (req, res) => {
  try {
    const { title, description, type, severity } = req.body;
    const complaint = new Complaint({
      user: req.user.id,
      flat: req.user.flat,
      title,
      description,
      type,
      severity
    });
    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all active (unresolved) complaints for the flat
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ flat: req.user.flat, resolved: false }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Mark a complaint as resolved, award karma, and log the karma event
const resolveComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    if (complaint.resolved) return res.status(400).json({ message: "Complaint already resolved" });
    complaint.resolved = true;

    await complaint.save();
    console.log("resolved")

    // Award karma points for resolving the complaint (e.g., 10 points)
    const karmaPointAwarded = 10;
    const user = await User.findById(req.user.id);

    if (user) {
      // Log the karma event in the Karma collection
      const newKarma = new Karma({
        user: user._id,
        points: karmaPointAwarded,
        reason: "Resolved a complaint"
      });
      await newKarma.save();

      console.log("karma pointed")
      
      // sum of points of user
      const result = await Karma.aggregate([
        { $match: { user: user._id } },
        { $group: { _id: "$user", totalPoints: { $sum: "$points" } } }
      ]);

      console.log("result")

      // Log the karma points in User collection
      const PointsAwarded = result.length > 0 ? result[0].totalPoints : 0;
      console.log()
      user.karmaPoints = PointsAwarded;
      await user.save();
      console.log("user karma points updated")
    }

    res.json({ message: "Complaint resolved. Karma awarded." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};


const voteComplaint = async (req, res) => {
  try {
    const { voteType } = req.body;
    const userId = req.user.id;
    const complaintId = req.params.id;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    // Check if a vote by this user already exists for this complaint
    let existingVote = await Vote.findOne({ user: userId, complaint: complaintId });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        return res.status(400).json({ message: `You have already ${voteType}d this complaint` });
      } else {
        // User is changing their vote
        // Remove user from the previous vote array
        if (existingVote.voteType === "upvote") {
          complaint.upvotes = complaint.upvotes.filter(id => id.toString() !== userId);
        } else if (existingVote.voteType === "downvote") {
          complaint.downvotes = complaint.downvotes.filter(id => id.toString() !== userId);
        }
        // Update the vote type
        existingVote.voteType = voteType;
        await existingVote.save();

        // Add the user to the new vote array
        if (voteType === "upvote") {
          if (!complaint.upvotes.includes(userId)) complaint.upvotes.push(userId);
        } else if (voteType === "downvote") {
          if (!complaint.downvotes.includes(userId)) complaint.downvotes.push(userId);
        }
      }
    } else {
      // Create a new Vote document
      const newVote = new Vote({
        user: userId,
        complaint: complaintId,
        voteType
      });
      await newVote.save();

      // Add the user ID to the appropriate array in the complaint document
      if (voteType === "upvote") {
        complaint.upvotes.push(userId);
      } else if (voteType === "downvote") {
        complaint.downvotes.push(userId);
      }
    }

    // Recalculate net votes
    complaint.votes = complaint.upvotes.length - complaint.downvotes.length;
    await complaint.save();

    res.json({ message: "Vote registered", votes: complaint.votes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get trending complaints (unresolved, sorted by votes)
const getTrendingComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ flat: req.user.flat, resolved: false })
      .populate('user', 'name')
      .sort({ votes: -1 })
      .lean();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  fileComplaint,
  getComplaints,
  resolveComplaint,
  voteComplaint,
  getTrendingComplaints
};
