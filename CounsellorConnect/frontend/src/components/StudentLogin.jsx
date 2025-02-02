import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    usn: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);  // Add loading state

  const validateForm = () => {
    const newErrors = {};
    if (!formData.usn) newErrors.usn = "USN is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true); // Show loading indicator
      try {
        const response = await fetch("http://localhost:5000/api/student/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          // withCredentials : true
          credentials: "include",
        });

        // const response = await axios({
        //   method:'post',
        //   url : 'http://localhost:5000/api/student/login',
        //   data:{

        //   }
        // })

        const data = await response.json();
        console.log(data.token);
        

        if (response.ok) {
          localStorage.setItem("token", data.token); // Store token in localStorage
          // const x = localStorage.getItem("token");
          // console.log(x);
          
          
          alert("Login successful!");
          navigate(`/student/profile`);  
        } else {
          alert(data.message || "Login failed!");
        }
      } catch (error) {
        alert("An error occurred. Please try again later.");
        console.error(error);
      } finally {
        setIsLoading(false); // Stop loading indicator
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <div className="login-form">
          <h2 className="student-login-title">Student Login</h2>
          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-group">
              <label htmlFor="usn">USN</label>
              <input
                type="text"
                id="usn"
                name="usn"
                value={formData.usn}
                onChange={handleChange}
                placeholder="Enter your USN"
              />
              {errors.usn && <span className="error">{errors.usn}</span>}  {/* Display error */}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error">{errors.password}</span>} {/* Display error */}
            </div>
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}  {/* Display loading state */}
            </button>
          </form>
          <p className="no-account">
            Don't have an account?{" "}
            <Link to="/register" className="register-link">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
