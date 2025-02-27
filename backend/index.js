
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
app.use('/api/complaints', voteRoutes);       // Handles voting and trending endpoints
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/punishments', punishmentRoutes);
app.use('/api/flat', flatStatsRoutes); // Now GET /api/flat/stats is available

// Default route
app.get('/', (req, res) => res.send('QuirkyRoomie API Running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
