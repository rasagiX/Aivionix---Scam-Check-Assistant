const riskItems = [
  { label: "Urgency Pressure", value: "High", tone: "danger" },
  { label: "Payment Request", value: "Detected", tone: "warning" },
  { label: "Suspicious Link", value: "Found", tone: "warning" },
  { label: "Safe Sender Match", value: "No", tone: "danger" },
];

const RightContent = () => {
  return (
    <div className="right-content">
      <div className="analysis-card">
        <div className="analysis-header">
          <div>
            <p className="analysis-title">Live Analysis Preview</p>
            <p className="analysis-subtitle">
              How the checker reviews a suspicious message
            </p>
          </div>

          <div className="analysis-live">
            <span className="analysis-live-dot"></span>
            Active
          </div>
        </div>

        <div className="message-preview">
          <div className="message-label">Suspicious Message</div>
          <p className="message-text">
            “Your bank KYC is pending. Verify now to avoid account suspension.
            Click the secure link below immediately.”
          </p>
        </div>

        <div className="risk-grid">
          {riskItems.map((item) => (
            <div key={item.label} className="risk-item">
              <span className="risk-item-label">{item.label}</span>
              <span className={`risk-pill ${item.tone}`}>{item.value}</span>
            </div>
          ))}
        </div>

        <div className="analysis-footer">
          <div>
            <p className="analysis-footer-title">Result</p>
            <p className="analysis-footer-text">
              Likely scam pattern detected. Avoid clicking the link or sharing details.
            </p>
          </div>

          <div className="analysis-score">
            <span>92%</span>
            <small>Risk</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightContent;