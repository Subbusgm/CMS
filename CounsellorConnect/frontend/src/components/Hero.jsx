import React from "react";

const Hero = () => {
  return (
    <div className="hero">
      <div className="main-section">
        <div className="content-left">
          <p className="section-label">Welcome to CounselorConnect</p>
          <h1 className="section-title">Seamless Learning For Brighter Futures</h1>
          <p className="section-description">
            Our innovative platform offers an effortless and seamless approach to
            learning, empowering students of RVCE to achieve brighter futures.
            Join us on a transformative journey to simplify education and unlock
            your full potential.
          </p>
          <div className="button-group">
            <a href="student" className="student-button">
              Student
            </a>
            <a href="faculty" className="counselor-button">
              Faculty
            </a>
          </div>
        </div>
        <div className="content-right">
          <img src="hero section.png" alt="hero" className="hero-img" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
