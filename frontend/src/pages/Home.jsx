

import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center px-4">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 mb-4">
          Welcome to QuirkyRoomie!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Manage flatmate conflicts with ease. Resolve issues, earn karma, and build a harmonious living environment.
        </p>
        <a
          href="/login"
          className="inline-block bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform transition duration-300 hover:bg-indigo-800 hover:scale-105"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Home;
