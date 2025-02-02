import React from "react";
import { Link, useNavigate } from "react-router-dom";
import clogo from "../../public/clogo.png"
import option from "../../public/option.jpg"

const Header2 = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/student/logout", {
            method: "GET",
            credentials: "include", // Ensures cookies are sent
        });
    
        const data = await response.json();
        if (response.ok) {
            alert(data.message); // Optional: Show logout success message
            navigate("/"); // Redirect to the login or home page
        } else {
            alert("Logout failed. Try again.");
        }
        } catch (error) {
            console.error("Logout Error:", error);
            alert("Something went wrong. Try again.");
        }
    };

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
          <Link to="#" className="nav-link"  onClick={handleLogout}>
            Logout
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

export default Header2;
