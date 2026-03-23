
export default function AnimatedSquare() {
  return (
    <div className="relative flex items-center justify-center h-[400px]">

      <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 shadow-[0_0_80px_rgba(139,92,246,0.5)] animate-pulse" />

      <div className="absolute w-72 h-72 border border-white/10 rounded-full" />
      <div className="absolute w-96 h-96 border border-white/5 rounded-full" />

    </div>2
  );
}

