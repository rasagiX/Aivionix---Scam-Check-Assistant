const scamLabels = [
  "Bank / KYC Alerts",
  "UPI / OTP Requests",
  "Fake Shopping Links",
  "Job Offer Tasks",
  "Lottery & Prize Messages",
  "Phishing Emails",
];


export default function AnimatedSq() {
  const size = 420;              // whole orbit area
  const ringSize = size - 80;    // visible circle size
  const circleRadius = ringSize / 2;      // radius for dots
  const textRadius = circleRadius + 26;   // text slightly outside the circle

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* circle line */}
      <div
        className="absolute rounded-full border border-white/10"
        style={{ width: ringSize, height: ringSize }}
      />

      {/* dots + labels around circle */}
      {scamLabels.map((label, i) => {
        const angle = (2 * Math.PI * i) / scamLabels.length; // 0..2π
        const center = size / 2;

        // dot exactly on circle
        const dotX = center + circleRadius * Math.cos(angle);
        const dotY = center + circleRadius * Math.sin(angle);

        // text slightly outside circle
        let textX = center + textRadius * Math.cos(angle);
        let textY = center + textRadius * Math.sin(angle);

        // move left/right texts a bit down
        if (label === "Job Offer Scams" || label === "Bank / KYC Alerts") {
          textY += 20; // increase for more space under the dot
        }

        return (
          <div key={label}>
            {/* dot on circle */}
            <div
              className="absolute w-2 h-2 rounded-full bg-white/80 -translate-x-1/2 -translate-y-1/2"
              style={{ left: dotX, top: dotY }}
            />

            {/* label */}
            <div className="absolute text-xs text-white/80 font-medium whitespace-nowrap -translate-x-1/2 -translate-y-1/2 fade-in"style={{left: textX,top: textY,animationDelay: `${i}s`,}}>
            {label}
            </div>

          </div>
        );
      })}

      {/* center square */}
      <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 shadow-[0_0_80px_rgba(139,92,246,0.6)]" />
    </div>
  );
}




