import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-6">
      <h1 className="font-semibold tracking-wide uppercase">Aivionix</h1>

      <div className="hidden md:flex gap-8 text-white/70">
        <Link to="/" className="hover:text-white transition-colors duration-200">Home</Link>


        <Link to="/about" className="hover:text-white transition-colors duration-200">About</Link>
        <Link to="/userguide" className="hover:text-white transition-colors duration-200">User Guide</Link>
        <Link to="/terms" className="hover:text-white transition-colors duration-200">Terms & Conditions</Link>
      </div>

      <div className="flex gap-4">
        <Link to="/login">
        <button className="border border-white/20 px-5 py-2 rounded-xl transition-all duration-200 hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
          Login
          </button>
          </Link>

          <Link to="/signup">
        <button className="bg-white text-black px-5 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
          Sign up
        </button>
        </Link>
      </div>
    </div>
  );
}