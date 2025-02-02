import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const FacultyLogin = () => {
  const [formData, setFormData] = useState({
    facultyid: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.facultyid) newErrors.facultyid = "FacultyID is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/faculty/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          alert("Login successful!");
          navigate(`/faculty/profile`);
        } else {
          alert(data.message || "Login failed!");
        }
      } catch (error) {
        alert("An error occurred. Please try again later.");
        console.error(error);
      } finally {
        setIsLoading(false);
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
          <h2 className="student-login-title">Faculty Login</h2>
          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-group">
              <label htmlFor="facultyid">Faculty ID</label>
              <input
                type="text"
                id="facultyid"
                name="facultyid"
                value={formData.facultyid}
                onChange={handleChange}
                placeholder="Enter your FacultyID"
              />
              {errors.facultyid && <span className="error">{errors.facultyid}</span>}
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
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default FacultyLogin;
