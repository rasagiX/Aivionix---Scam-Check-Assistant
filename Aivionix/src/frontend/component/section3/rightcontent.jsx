import React from "react";

const RightContent = () => {
  return (
    <div className="right-content">
      <div className="dots-container">
        {[...Array(40)].map((_, i) => (
          <span key={i} className="dot"></span>
        ))}
      </div>
    </div>
  );
};

export default RightContent;