import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flatCode, setFlatCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, 
        { name, email, password, flatCode }, 
        { headers: { "Content-Type": "application/json" } }
      );
      
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      
      <form onSubmit={handleSubmit} className="bg-white p-6  rounded shadow-md w-full max-w-sm">
        
        <h2 className="text-2xl font-bold mb-3">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-3 ">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mb-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mb-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Flat Code{" "} <span className='text-sm text-slate-400'><br />For Testing use any "FLAT001" "FLAT003" "FLAT002"</span></label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-1"
            value={flatCode}
            onChange={(e) => setFlatCode(e.target.value)}
            placeholder="Enter your flat code"
            required
          />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>
        <p className="text-md text-left mb-2 mt-1">
          already registered ?{" "}
          <Link to="/login" className="font-medium text-blue-400 underline">
              login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
