import React from "react";
import "./section4.css";

const Section4 = () => {
  return (
    <section className="section4">
      <div className="section4-grid"></div>
      <div className="section4-glow section4-glow-1"></div>
      <div className="section4-glow section4-glow-2"></div>

      <div className="section4-bg-text">LEVEL UP YOUR SAFETY</div>

      <div className="section4-container">
        <div className="section4-left">
          <div className="section4-badge">
            <span className="section4-badge-dot"></span>
            Mobile Friendly Protection
          </div>

          <h2 className="section4-title">
            Safety That Fits
            <br />
            In Your Pocket
          </h2>

          <p className="section4-subtitle">
            Check risky messages anytime with a simple mobile-first experience
            designed for speed, clarity, and confidence.
          </p>

          <div className="section4-points">
            <div className="section4-point">
              <span className="section4-point-icon">✓</span>
              <span>Instant checks for SMS, WhatsApp, emails, and links</span>
            </div>

            <div className="section4-point">
              <span className="section4-point-icon">✓</span>
              <span>Simple risk result without confusing technical language</span>
            </div>

            <div className="section4-point">
              <span className="section4-point-icon">✓</span>
              <span>Built to help users react before they click or pay</span>
            </div>
          </div>

          <div className="section4-actions">
            <button className="section4-primary-btn">Learn More</button>
            <button className="section4-secondary-btn">See Demo</button>
          </div>
        </div>

        <div className="section4-right">
          <div className="section4-phone-wrapper">
            <div className="section4-phone">
              <div className="section4-screen">
                <div className="section4-screen-top">
                  <span className="section4-screen-dot"></span>
                  AI Safety Check
                </div>

                <div className="section4-screen-card">
                  <p className="section4-screen-label">Suspicious Message</p>
                  <p className="section4-screen-message">
                    “Your account needs urgent KYC verification. Tap the secure
                    link now to avoid suspension.”
                  </p>
                </div>

                <div className="section4-risk-row">
                  <div className="section4-risk-box">
                    <span className="section4-risk-label">Urgency</span>
                    <span className="section4-risk-pill danger">High</span>
                  </div>

                  <div className="section4-risk-box">
                    <span className="section4-risk-label">Link</span>
                    <span className="section4-risk-pill warning">Found</span>
                  </div>
                </div>

                <div className="section4-result-box">
                  <div>
                    <p className="section4-result-title">Likely Scam</p>
                    <p className="section4-result-text">
                      Avoid clicking and do not share personal details.
                    </p>
                  </div>

                  <div className="section4-score">92%</div>
                </div>

                <button className="section4-screen-btn">Open Checker</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;