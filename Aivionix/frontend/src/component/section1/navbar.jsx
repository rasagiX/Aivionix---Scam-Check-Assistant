import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "User Guide", path: "/userguide" },
    { name: "Terms", path: "/terms" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#030712]/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        
        {/* LOGO */}
        <Link to="/" className="text-xl font-semibold tracking-wide">
          Aivionix
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-8 text-white/70">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`transition ${
                location.pathname === link.path
                  ? "text-white"
                  : "hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex items-center gap-3">
          
          {/* Login */}
          <Link to="/login">
            <button className="border border-white/20 px-4 py-2 rounded-xl text-sm hover:bg-white/10 transition">
              Login
            </button>
          </Link>

          {/* Signup */}
          <Link to="/signup">
            <button className="bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2 rounded-xl text-sm font-medium hover:scale-105 transition shadow-lg shadow-purple-500/30">
              Sign Up
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
}