import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header"; // Assuming there's a common Header component
import "./FacultyProfile.css"; // Assuming a CSS file for styling

const FacultyProfile = () => {
  const { facultyId } = useParams();
  const [faculty, setFaculty] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/faculty/${facultyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Authentication token
            },
          }
        );
        setFaculty(response.data);
      } catch (err) {
        setError("Failed to fetch faculty details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacultyDetails();
  }, [facultyId]);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <Header />
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
              onClick={() => navigate(`/faculty/${facultyId}/counselees`)}
            >
              Monitor Counselees
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



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const FacultyProfile = () => {
//   const { facultyId } = useParams();
//   const [faculty, setFaculty] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFacultyDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/faculty/${facultyId}`
//         );
//         setFaculty(response.data);
//       } catch (err) {
//         setError("Failed to fetch faculty details.");
//       }
//     };

//     fetchFacultyDetails();
//   }, [facultyId]);

//   if (error) return <div>{error}</div>;
//   if (!faculty) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>Faculty Profile</h2>
//       <p><strong>ID:</strong> {faculty.faculty_id}</p>
//       <p><strong>Name:</strong> {faculty.name}</p>
//       <p><strong>Department:</strong> {faculty.department}</p>
//       <p><strong>Qualification:</strong> {faculty.qualification}</p>
//       <p><strong>Email:</strong> {faculty.email}</p>
//       <p><strong>Phone:</strong> {faculty.phone_number}</p>

//       <h3>Courses</h3>
//       {faculty.courses.length > 0 ? (
//         <ul>
//           {faculty.courses.map((course) => (
//             <li key={course.course_code}>
//               {course.course_code} - {course.course_name}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No courses assigned.</p>
//       )}

//       <button
//         onClick={() => navigate(`/faculty/${facultyId}/counselees`)}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         Monitor Counselees
//       </button>
//     </div>
//   );
// };

// export default FacultyProfile;
