const scamLabels = [
  "Bank / KYC Alerts",
  "UPI / OTP Requests",
  "Fake Shopping Links",
  "Job Offer Tasks",
  "Lottery & Prize Messages",
  "Phishing Emails",
];

export default function AnimatedSq() {
  const size = 520;
  const ringSize = 360;
  const circleRadius = ringSize / 2;
  const textRadius = circleRadius + 34;
  const center = size / 2;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* glow blobs */}
      <div className="absolute h-[320px] w-[320px] rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute h-[240px] w-[240px] rounded-full bg-cyan-400/10 blur-3xl" />

      {/* outer decorative rings */}
      <div
        className="absolute rounded-full border border-white/10"
        style={{ width: ringSize, height: ringSize }}
      />
      <div
        className="absolute rounded-full border border-violet-400/10"
        style={{ width: ringSize - 70, height: ringSize - 70 }}
      />
      <div
        className="absolute rounded-full border border-cyan-300/10"
        style={{ width: ringSize - 130, height: ringSize - 130 }}
      />

      {/* labels + dots */}
      {scamLabels.map((label, i) => {
        const angle = (2 * Math.PI * i) / scamLabels.length - Math.PI / 6;

        const dotX = center + circleRadius * Math.cos(angle);
        const dotY = center + circleRadius * Math.sin(angle);

        let textX = center + textRadius * Math.cos(angle);
        let textY = center + textRadius * Math.sin(angle);

        if (label === "Job Offer Tasks" || label === "Bank / KYC Alerts") {
          textY += 18;
        }

        return (
          <div key={label}>
            <div
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.25)]"
              style={{ left: dotX, top: dotY }}
            />

            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#0b1127]/70 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md md:text-sm"
              style={{ left: textX, top: textY }}
            >
              {label}
            </div>
          </div>
        );
      })}

      {/* center visual */}
      <div className="relative flex h-44 w-44 items-center justify-center rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-400 via-violet-500 to-fuchsia-500 shadow-[0_0_90px_rgba(139,92,246,0.45)]">
        <div className="absolute inset-[10px] rounded-[1.5rem] border border-white/15 bg-black/10 backdrop-blur-md" />
        <div className="relative z-10 text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-white/15 ring-1 ring-white/20" />
          <p className="mt-4 text-sm font-medium text-white/90">
            Scam Pattern
          </p>
          <p className="mt-1 text-xs text-white/65">
            Detection Layer
          </p>
        </div>
      </div>
    </div>
  );
}