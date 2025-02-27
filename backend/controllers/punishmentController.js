
const Complaint = require('../models/Complaint');

const punishmentList = [
  "Didn’t clean the dishes? You’re making chai for everyone for a week.",
  "Blasted loud music at 2 AM? You owe everyone samosas.",
  "Forgot to take out the trash? Laundry duty for two weeks.",
  "Left the lights on all night? You’re paying extra on the electricity bill."
];

const assignPunishment = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    
    console.log(complaint)

    if (complaint.upvotes.length >= 1) {
      // If there is at least one upvote, reset old punishment and set a new one.
      const punishment = punishmentList[Math.floor(Math.random() * punishmentList.length)];
      complaint.punishment = punishment;
      await complaint.save();
      return res.json({ message: "Punishment assigned", punishment });
    } else {
      // If no upvotes, reset punishment to null.
      complaint.punishment = null;
      await complaint.save();
      return res.status(400).json({ message: "Complaint does not have enough upvotes for punishment" });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { assignPunishment };
