import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );

      // ✅ Success message
      setMessage("Login successful ✅");

      // 🚀 Redirect after short delay
      setTimeout(() => {
        navigate("/chat");
      }, 1500);

    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setMessage("Invalid email or password ❌");
      } else {
        setMessage("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-black to-indigo-900 text-white px-4">

      <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">

        <h2 className="text-3xl font-semibold mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Log in to continue protecting yourself.
        </p>

        {/* ✨ Message */}
        {message && (
          <div
            className={`mb-4 text-center text-sm ${
              message.includes("successful")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Login
          </button>
        </form>

        <div className="my-6 border-t border-white/10"></div>

        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 hover:text-indigo-300 transition"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}