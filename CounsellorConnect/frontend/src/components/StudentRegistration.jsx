import React, { useState } from "react";
import Header from "./Header";

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    usn: "",
    phoneNumber: "",
    email: "",
    branch: "",
    faculty_id: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.usn) newErrors.usn = "USN is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.branch) newErrors.branch = "Branch is required";
    if (!formData.branch) newErrors.faculty_id = "Faculty ID is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password && formData.password.length < 6)
      newErrors.password = "Password should be at least 6 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/api/student/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Registration successful!");
        } else {
          alert(data.message || "Registration failed!");
        }
      } catch (error) {
        alert("An error occurred. Please try again later.");
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="register-container">
        <div className="register-form">
          <h2>Student Registration</h2>
          <form onSubmit={handleSubmit} className="reg-form">
            <div className="form-group">
              <label htmlFor="firstName" >First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your First Name"
              />
              {errors.firstName && <span>{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your Last Name"
              />
              {errors.lastName && <span>{errors.lastName}</span>}
            </div>
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
              {errors.usn && <span>{errors.usn}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your Phone Number"
              />
              {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email ID"
              />
              {errors.email && <span>{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="branch">Branch</label>
              <input
                type="text"
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="Enter your Branch"
              />
              {errors.branch && <span>{errors.branch}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="faculty_id">Faculty_ID</label>
              <input
                type="text"
                id="faculty_id"
                name="faculty_id"
                value={formData.faculty_id}
                onChange={handleChange}
                placeholder="Enter your Faculty Id"
              />
              {errors.faculty_id && <span>{errors.faculty_id}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
              />
              {errors.password && <span>{errors.password}</span>}
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;
