
import React from 'react';

const Features = () => {
  const features = [
    {
      title: "User Authentication & Management",
      description:
        "Secure JWT-based authentication with role-based access. Users can sign up, log in, and manage their profiles.",
      icon: "🔐",
    },
    {
      title: "Complaint Logging System",
      description:
        "Flatmates can file complaints about household issues, including noise, cleanliness, and unpaid bills.",
      icon: "📋",
    },
    {
      title: "Voting & Community Resolution",
      description:
        "Flatmates can upvote or downvote complaints. The most upvoted issue becomes the 'Flatmate Problem of the Week.'",
      icon: "👍",
    },
    {
      title: "Resolution & Gamification",
      description:
        "Users can mark complaints as resolved. Earn karma points for resolving issues and compete for the 'Best Flatmate' badge.",
      icon: "🏆",
    },
    {
      title: "Punishment Generator",
      description:
        "If a complaint gets 10+ upvotes, an automated punishment is suggested, e.g., 'Make chai for everyone for a week.'",
      icon: "⚖️",
    },
    {
      title: "Leaderboard & Stats",
      description:
        "Track who has the most complaints and see the top complaint categories for your flat.",
      icon: "📊",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-700 mb-8">
        Platform Features
      </h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <span className="text-3xl">{feature.icon}</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h2>
            <p className="text-gray-600 flex-grow">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
