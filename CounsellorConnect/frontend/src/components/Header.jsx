import React from "react";
import { Link } from "react-router-dom";
import clogo from "../../public/clogo.png"
import option from "../../public/option.jpg"

const Header = () => {
  return (
    <div className="header">
      <header className="header-content">
        <Link to="/" className="logo">
          <img src={clogo} alt="CC" className="logo-icon" />
          <span className="logo-text">CounselorConnect</span>
        </Link>

        <nav className="nav">
          <Link to="/home" className="nav-link">
            Home
          </Link>
          <Link to="/feedback" className="nav-link">
            Feedback
          </Link>
          <Link to="/sem-registration" className="nav-link">
            Semester Registration
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </nav>

        <Link to="/contact" className="contact-button">
          Contact Us
        </Link>

        <button type="button" className="menu-button">
          <img src={option} alt="menu-button" className="menu-icon" />
        </button>
      </header>
    </div>
  );
};

export default Header;
