const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    flat: { type: mongoose.Schema.Types.ObjectId, ref: 'Flat' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['Noise', 'Cleanliness', 'Bills', 'Pets', 'Other'], required: true },
    severity: { type: String, enum: ['Mild', 'Annoying', 'Major', 'Nuclear'], required: true },
    votes: { type: Number, default: 0 }, // ✅ Now votes are stored persistently
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }],
    resolved: { type: Boolean, default: false },
    punishment: { type: String, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Complaint', ComplaintSchema);

