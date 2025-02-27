
const About = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-blue-600 text-center">About QuirkyRoomie</h1>
      <p className="text-gray-700 mt-4 text-center">
        QuirkyRoomie is a <strong>Flatmate Conflict Management System</strong> designed to help roommates resolve household issues efficiently.
      </p>

      {/* Section: Features */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Key Features</h2>
        <ul className="mt-4 space-y-3 text-gray-700 list-disc pl-6">
          <li><span className="font-semibold text-blue-600">Complaint Logging:</span> Easily report issues like noise, cleanliness, and bill disputes.</li>
          <li><span className="font-semibold text-blue-600">Voting System:</span> Flatmates can upvote/downvote complaints for resolution priority.</li>
          <li><span className="font-semibold text-blue-600">Gamification:</span> Earn karma points and compete for the "Best Flatmate" badge.</li>
          <li><span className="font-semibold text-blue-600">Leaderboard & Stats:</span> Track the most common complaints and who resolves the most.</li>
        </ul>
      </div>

      {/* Section: How It Works */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">How It Works</h2>
        <div className="mt-4 grid md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-600">Step 1: Register/Login</h3>
            <p className="text-gray-600 mt-2">Flatmates create accounts and join a flat group using a Flat Code.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-600">Step 2: Report a Complaint</h3>
            <p className="text-gray-600 mt-2">File a complaint with details like issue type, severity, and description.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-600">Step 3: Vote & Resolve</h3>
            <p className="text-gray-600 mt-2">Flatmates vote, and the system suggests punishments or rewards resolution efforts.</p>
          </div>
        </div>
      </div>

      {/* Section: Call to Action */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Join QuirkyRoomie Today!</h2>
        <p className="text-gray-600 mt-2">Make your living space conflict-free. Sign up now and start managing your flat efficiently.</p>
        <a href="/register" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-blue-800">
          Get Started
        </a>
      </div>
    </div>
  );
};

export default About;
