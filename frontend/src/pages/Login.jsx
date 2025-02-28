// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate,Link } from 'react-router-dom';


// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Reset error before new request

//     try {
//       const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
//         email,
//         password,
//       }, {
//         withCredentials: true // ✅ Ensures cookies/tokens are sent properly
//       });

//       // Save token securely
//       localStorage.setItem('token', res.data.token);

//       // Redirect to dashboard after login
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             className="w-full p-2 border border-gray-300 rounded mt-1"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Password</label>
//           <input
//             type="password"
//             className="w-full p-2 border border-gray-300 rounded mt-1"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             required
//           />
//         </div>
//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer">
//           Login
//         </button>
//         <p className="text-md text-left mt-4">
//           Not registered yet ?{" "}
//           <Link to="/register" className="font-medium text-blue-400 underline">
//               register
//           </Link>
//           </p>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // ✅ Import AuthContext

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ Use login function from context

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; // ✅ Use env variable

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email,
        password,
      }, {
        withCredentials: true
      });

      login(res.data.token); // ✅ Use context login function
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer">
          Login
        </button>
        <p className="text-md text-left mt-4">
          Not registered yet? <Link to="/register" className="text-blue-400 underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
