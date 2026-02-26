import Navbar from "./navbar";
import LeftContent from "./leftcontent";
import AnimatedSquare from "./animatedsquare";

export default function Section1() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black text-white">

      <Navbar />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6 py-16">

        <LeftContent />

        <AnimatedSquare />

      </div>

    </div>
  );
}