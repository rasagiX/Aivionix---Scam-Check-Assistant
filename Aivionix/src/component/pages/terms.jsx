import React from 'react';

function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-950 via-indigo-950 to-black text-white p-8">
      <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Terms of Service
        </h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg mb-4">
            These Terms of Service ("Terms") govern your use of Aivionix ("Service") provided by the Aivionix team.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing or using the Service, you agree to be bound by these Terms.</p>
          {/* Add more sections */}
        </div>
        <div className="text-center mt-12">
          <a href="/" className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Terms;
