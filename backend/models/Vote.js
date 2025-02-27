
// Vote Schema
const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    complaint: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint', required: true },
    voteType: { type: String, enum: ['upvote', 'downvote'], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vote', VoteSchema);

