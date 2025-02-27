const mongoose = require('mongoose');

// Flat Schema
const FlatSchema = new mongoose.Schema(
  {
    flatCode: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Flat', FlatSchema);
