
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/file-complaint" element={<FileComplaint />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/punishments" element={<Punishment />} />
      </Routes>
    </Router>
  );
}

export default App;
