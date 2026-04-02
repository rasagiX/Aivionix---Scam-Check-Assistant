import React from 'react';

function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-950 via-indigo-950 to-black text-white flex items-center justify-center">
      <div className="max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-10 w-full mx-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Login
        </h1>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <input type="password" placeholder="Password" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition">
            Sign In
          </button>
        </form>
        <p className="text-center mt-6 text-gray-400">
          Don't have account? <a href="/signup" className="text-purple-400 hover:underline">Sign up</a>
        </p>
        <div className="text-center mt-6">
          <a href="/" className="text-gray-400 hover:text-white transition">
            Back to Home →
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;

