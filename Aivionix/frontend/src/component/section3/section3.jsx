import LeftContent from "./leftcontent";
import RightContent from "./rightcontent";
import TopContent from "./topcontent";
import './section3.css'
import React from 'react'

const Section3 = () => {
  return (
    <section className="section3">
      <div className="section3-card">
        <TopContent/>
        <div className="section3-body">
          <LeftContent/>
          <RightContent/>
        </div>
      </div>
    </section>
  );
};



export default Section3;