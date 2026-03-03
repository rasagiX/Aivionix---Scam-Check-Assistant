export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-6">
      <h1 className="font-semibold tracking-wide uppercase">Aivionix</h1>

      <div className="hidden md:flex gap-8 text-white/70">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">User Guide</a>
        <a href="#">Terms & Conditions</a>
      </div>

      <div className="flex gap-4">
        <button className="text-white/70">Login</button>
        <button className="bg-white text-black px-4 py-2 rounded-lg">
          Sign up
        </button>
      </div>
    </div>
  );
}