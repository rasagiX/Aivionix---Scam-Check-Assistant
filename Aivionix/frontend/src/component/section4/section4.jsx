import React from "react";
import "./section4.css";

const Section4 = () => {
  return (
    <section className="section4">

      {/* Background Text */}
      <h1 className="section4-bg-text">
        LEVEL UP YOUR SAFETY
      </h1>

      {/* Phone Mockup */}
      <div className="section4-phone-wrapper">

        <div className="section4-phone">

          <div className="section4-screen">
            <h3>We Check Every Messages</h3>
            <p>
              Instant AI checks to spot risky texts before you tap.
            </p>
            <button>Learn More</button>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Section4;