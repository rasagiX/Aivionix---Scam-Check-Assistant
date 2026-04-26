import AnimatedSq from "./animatedsq";

const threatCards = [
  {
    title: "Fake Bank Alerts",
    text: "We flag urgent KYC, account block, and fake verification messages before they pressure you into clicking.",
  },
  {
    title: "Payment & OTP Tricks",
    text: "Detect UPI requests, OTP theft attempts, and refund scams designed to empty your balance in minutes.",
  },
  {
    title: "Shopping & Prize Frauds",
    text: "Spot fake offers, gift links, lottery claims, and task scams that look tempting but lead to losses.",
  },
];

export default function Section2() {
  return (
    <section className="relative overflow-hidden bg-[#040714] text-white">
      {/* background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(99,102,241,0.18),transparent_24%),radial-gradient(circle_at_20%_75%,rgba(168,85,247,0.12),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.08),transparent_22%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.9)]" />
            Threat Intelligence
          </div>

          <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Threats We Catch
            <br />
            <span className="text-violet-300">Before They Catch You</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
            From random SMS to fake shopping offers, we identify the common scam
            patterns people see every day and explain the risk in simple words.
          </p>
        </div>

        <div className="mt-14 flex justify-center">
          <AnimatedSq />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {threatCards.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(79,70,229,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
            >
              <div className="mb-4 h-10 w-10 rounded-2xl bg-violet-500/15 ring-1 ring-white/10" />
              <h3 className="text-lg font-medium text-white/90">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}