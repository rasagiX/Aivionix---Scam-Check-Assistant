import AnimatedSq from "./animatedsq";

export default function Section2() {
 return (
<div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white px-6 pt-12">
  <AnimatedSq />

  <div className="max-w-xl mt-6 text-center">
    <h2 className="text-3xl font-semibold mb-4">
      Threats We Catch
    </h2>
    <p className="text-white/70">
      From random SMS to fake offers, we highlight the tricks before they reach your money..
    </p>
  </div>
</div>
 );
}