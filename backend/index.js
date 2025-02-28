
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require("path");
const morgan = require("morgan");

// Load environment variables
dotenv.config();

if (!process.env.PORT || !process.env.MONGO_URI) {
    console.error("❌ ERROR: Missing environment variables in .env file");
    process.exit(1);
  }
  
// Initialize app
const app = express();
app.use(express.json());
app.use(morgan("dev"));

// Secure CORS setup to allow frontend requests
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:8080", // ✅ Allow frontend (React)
    credentials: true, // ✅ Allows cookies/tokens
}));

// Connect to Database
connectDB();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const voteRoutes = require('./routes/voteRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const punishmentRoutes = require('./routes/punishmentRoutes');
const flatStatsRoutes = require('./routes/flatStatsRoutes');

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/complaints', voteRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/punishments', punishmentRoutes);
app.use('/api/flat', flatStatsRoutes);

// Default API route
app.get('/', (req, res) => res.send('QuirkyRoomie API Running'));

app.get('*', (req, res) => res.send('Page Not Found'));

// Serve Frontend (Optional)
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "frontend/build")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//     });
// }

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
