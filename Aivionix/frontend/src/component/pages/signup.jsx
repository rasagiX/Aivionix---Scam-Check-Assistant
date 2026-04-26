import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password.trim()
      );

      // 🔥 Save user's name
      await updateProfile(userCredential.user, {
        displayName: formData.name
      });

      // ✅ Success message
      setMessage("Account created successfully ✅");

      // 🚀 Redirect after short delay
      setTimeout(() => {
        navigate("/chat");
      }, 1500);

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-black to-indigo-900 text-white px-4">

      <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">

        <h2 className="text-3xl font-semibold mb-2 text-center">
          Create Account
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Join Aivionix to protect yourself from scams.
        </p>

        {/* ✨ Message */}
        {message && (
          <div
            className={`mb-4 text-center text-sm ${
              message.includes("success")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Create Account
          </button>
        </form>

        <div className="my-6 border-t border-white/10"></div>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 transition"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}