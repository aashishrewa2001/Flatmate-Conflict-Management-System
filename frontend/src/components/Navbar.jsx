
import React, { useState, useContext,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useContext(AuthContext); // Use context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ✅ Auto-logout if token is expired
  useEffect(() => {
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      if (decoded.exp * 1000 < Date.now()) {
        handleLogout(); // Auto logout on token expiry
      }
    }
  }, [token]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Links for logged-in users
  const loggedInLinks = (
    <>
      <Link
        to="/dashboard"
        className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
      >
        Dashboard
      </Link>
      <Link
        to="/file-complaint"
        className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
      >
        File Complaint
      </Link>
      <Link
        to="/leaderboard"
        className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
      >
        Leaderboard
      </Link>
      <Link
        to="/trending"
        className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
      >
        Trending
      </Link>
      <Link
        to="/punishments"
        className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
      >
        Punishments
      </Link>
      <button
        onClick={handleLogout}
        className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200"
      >
        Logout
      </button>
    </>
  );

  // Links for guests (not logged in)
  const loggedOutLinks = (
    <>
      
      <Link
        to="/"
        className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
      >
        Home
      </Link>
      <Link
        to="/about"
        className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
      >
        About
      </Link>
      <Link
        to="/feature"
        className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
      >
        Feature
      </Link>

      <Link
        to="/login"
        className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200"
      >
        Register
      </Link>
    </>
  );

  return (
    <nav className="bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-2xl">
              QuirkyRoomie
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* {commonLinks} */}
              {token ? loggedInLinks : loggedOutLinks}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.3 5.71a1 1 0 00-1.42-1.42L12 9.17 7.12 4.29A1 1 0 105.7 5.71L10.59 10.6 5.71 15.48a1 1 0 101.42 1.42L12 12.83l4.88 4.88a1 1 0 001.42-1.42L13.41 10.6l4.89-4.89z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* {commonLinks} */}
          {token ? loggedInLinks : loggedOutLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;