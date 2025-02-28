
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const voteRoutes = require('./routes/voteRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const punishmentRoutes = require('./routes/punishmentRoutes');
const flatStatsRoutes = require('./routes/flatStatsRoutes'); // New import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);  // Handles filing, listing, resolving complaints
app.use('/api/votes', voteRoutes);  // Handles voting and trending endpoints       // Handles voting and trending endpoints
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/punishments', punishmentRoutes);
app.use('/api/flat', flatStatsRoutes); // Now GET /api/flat/stats is available

// Default route
app.get('/', (req, res) => res.send('QuirkyRoomie API Running'));


// To handle server side unsupportive error
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const path = require("path");
// const morgan = require("morgan");

// // Load environment variables
// dotenv.config();

// if (!process.env.PORT || !process.env.MONGO_URI) {
//     console.error("❌ ERROR: Missing environment variables in .env file");
//     process.exit(1);
//   }
  
// // Initialize app
// const app = express();
// app.use(express.json());
// app.use(morgan("dev"));

// // Secure CORS setup to allow frontend requests
// app.use(cors({
//     origin: process.env.CLIENT_URL || "http://localhost:8080", // ✅ Allow frontend (React)
//     credentials: true, // ✅ Allows cookies/tokens
// }));

// // Global headers for security & CORS handling
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });

// // Connect to Database
// connectDB();

// // Import Routes
// const authRoutes = require('./routes/authRoutes');
// const complaintRoutes = require('./routes/complaintRoutes');
// const voteRoutes = require('./routes/voteRoutes');
// const leaderboardRoutes = require('./routes/leaderboardRoutes');
// const punishmentRoutes = require('./routes/punishmentRoutes');
// const flatStatsRoutes = require('./routes/flatStatsRoutes');

// // Define API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/complaints', complaintRoutes);
// app.use('/api/votes', voteRoutes);
// app.use('/api/leaderboard', leaderboardRoutes);
// app.use('/api/punishments', punishmentRoutes);
// app.use('/api/flat', flatStatsRoutes);

// // Default API route
// app.get('/', (req, res) => res.send('QuirkyRoomie API Running'));

// // Serve Frontend (Optional)
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "frontend/build")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//     });
// }

// // Global error handler
// app.use((err, req, res, next) => {
//     console.error("Server Error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
