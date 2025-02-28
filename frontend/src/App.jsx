
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Feature from './pages/Features';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FileComplaint from './pages/FileComplaint';
import Leaderboard from './pages/Leaderboard';
import Trending from './pages/Trending';
import Punishment from './pages/Punishment';
import PrivateRoute from './components/PrivateRoute'; // ✅ Import PrivateRoute

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 Protected Routes */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/file-complaint" element={<PrivateRoute />}>
          <Route path="" element={<FileComplaint />} />
        </Route>
        <Route path="/leaderboard" element={<PrivateRoute />}>
          <Route path="" element={<Leaderboard />} />
        </Route>
        <Route path="/trending" element={<PrivateRoute />}>
          <Route path="" element={<Trending />} />
        </Route>
        <Route path="/punishments" element={<PrivateRoute />}>
          <Route path="" element={<Punishment />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
