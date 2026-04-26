const features = [
  "Scans SMS, WhatsApp chats, emails, and suspicious links",
  "Detects urgency tricks, fake rewards, KYC traps, and payment scams",
  "Shows a simple risk result with beginner-friendly guidance",
];

const LeftContent = () => {
  return (
    <div className="left-content">
      <h2>Learn How We Protect You</h2>
      <h4>See what our checker does</h4>

      <p>
        Our tool reviews suspicious messages for the patterns scammers use most often.
        Instead of showing technical jargon, it highlights what looks risky and explains
        why in simple language.
      </p>

      <div className="feature-list">
        {features.map((item) => (
          <div key={item} className="feature-item">
            <span className="feature-icon">✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <button className="learn-btn">
        Learn More <span>→</span>
      </button>
    </div>
  );
};

export default LeftContent;