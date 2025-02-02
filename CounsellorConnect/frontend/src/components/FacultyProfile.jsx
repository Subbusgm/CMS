import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header"; // Assuming there's a common Header component
import "./FacultyProfile.css"; // Assuming a CSS file for styling
import Header2 from "./Header2";

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/faculty/profile`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        setFaculty(data);
      } catch (err) {
        setError("Failed to fetch faculty details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacultyDetails();
  }, []);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <Header2 />
      <div className="profile-container">
        <h2 className="profile-title">Faculty Profile</h2>
        <div className="profile-card">
          <div className="profile-info">
            <p><strong>Faculty ID:</strong> {faculty.faculty_id}</p>
            <p><strong>Name:</strong> {faculty.name}</p>
            <p><strong>Department:</strong> {faculty.department}</p>
            <p><strong>Qualification:</strong> {faculty.qualification}</p>
            <p><strong>Email:</strong> {faculty.email}</p>
            <p><strong>Phone:</strong> {faculty.phone_number}</p>
          </div>
          <div className="profile-buttons">
            <button
              className="button primary"
              onClick={() => navigate(`/faculty/counselees`)}
            >
              Monitor Counselees
            </button>
            <button
              className="button primary"
              onClick={() => navigate(`/faculty/students`)}
            >
              Manage Meetings
            </button>
          </div>
        </div>
        <div className="courses-section">
          <h3 className="courses-title">Courses</h3>
          {faculty.courses.length > 0 ? (
            <ul className="courses-list">
              {faculty.courses.map((course) => (
                <li key={course.course_code}>
                  {course.course_code} - {course.course_name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-courses">No courses assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;