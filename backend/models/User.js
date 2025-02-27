const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    flat: { type: mongoose.Schema.Types.ObjectId, ref: 'Flat', required: true },
    karmaPoints: { type: Number, default: 0 },
    complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }]
  },
  { timestamps: true }
);


module.exports = mongoose.model('User', UserSchema);
