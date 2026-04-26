import Navbar from "./navbar";
import LeftContent from "./leftcontent";
import RightContent from "./rightcontent";

export default function Section1() {
  return (
    <section className="relative overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(99,102,241,0.22),transparent_28%),radial-gradient(circle_at_25%_75%,rgba(168,85,247,0.12),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-6 py-6 md:px-10 lg:px-16">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <LeftContent />
          <RightContent />
        </div>
      </div>
    </section>
  );
}