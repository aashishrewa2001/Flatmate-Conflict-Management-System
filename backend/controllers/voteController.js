const Vote = require('../models/Vote');
const Complaint = require('../models/Complaint');

const voteComplaint = async (req, res) => {
  try {
    const { voteType } = req.body;
    const userId = req.user.id;
    const complaintId = req.params.id;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    let existingVote = await Vote.findOne({ user: userId, complaint: complaintId });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        return res.status(400).json({ message: "You have already " + voteType + "d this complaint" });
      } else {
        existingVote.voteType = voteType;
        await existingVote.save();
      }
    } else {
      const newVote = new Vote({ user: userId, complaint: complaintId, voteType });
      await newVote.save();
    }

    // ✅ Recalculate votes and update Complaint model
    const upvoteCount = await Vote.countDocuments({ complaint: complaintId, voteType: 'upvote' });
    const downvoteCount = await Vote.countDocuments({ complaint: complaintId, voteType: 'downvote' });

    complaint.votes = upvoteCount - downvoteCount;
    await complaint.save();

    res.json({ message: "Vote registered", votes: complaint.votes });
  } catch (err) {
    console.error("Vote Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { voteComplaint };
