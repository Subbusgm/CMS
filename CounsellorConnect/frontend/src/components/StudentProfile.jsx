import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import "./StudentProfile.css"; // Assuming you create a CSS file for styling.

const StudentProfile = () => {
  // const { usn } = useParams(); // Get USN from URL params
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // console.log("Profile");
  

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/student/profile`, {
          method: "GET",
          credentials: "include",
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass token for authentication
          // },
        });

        // const x = localStorage.getItem("token");
        // console.log(x); 

        // const response = await axios.get(`http://localhost:5000/api/student/profile`, {
        //   withCredentials: true,
        //   // headers: {
        //   //   Authorization: `Bearer ${x}`,  // Send token in Authorization header
        //   // },
        // });

        // console.log("Profile");
        // console.log(response);
  
        if (!response.ok) {
          throw new Error("Failed to fetch student data.");
        }

        const data = await response.json();
        setStudentData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <Header />
      <div className="profile-container">
        <h2 className="profile-title">Your Profile</h2>
        <div className="profile-card">
          <div className="profile-info">
            <p><strong>USN:</strong> {studentData.usn}</p>
            <p><strong>Name:</strong> {`${studentData.first_name} ${studentData.last_name}`}</p>
            <p><strong>Email:</strong> {studentData.email_id}</p>
            <p><strong>Phone Number:</strong> {studentData.phone_number}</p>
            <p><strong>Branch:</strong> {studentData.branch}</p>
            <p><strong>CGPA:</strong> {studentData.cgpa}</p>
            <p><strong>Counselor Name:</strong> {studentData.counselor_name}</p>
          </div>
          <div className="profile-buttons">
            <button
              className="button primary"
              onClick={() => navigate(`/student/courses`)}
            >
              View Academic Data
            </button>
            <button
              className="button secondary"
              onClick={() => navigate(`/student/events`)}
            >
              View Activity Points
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Header from "./Header";

// const StudentProfile = () => {
//   const { usn } = useParams(); // Get USN from URL params
//   const navigate = useNavigate();
//   const [studentData, setStudentData] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/student/${usn}`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass token for authentication
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch student data.");
//         }

//         const data = await response.json();
//         setStudentData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchStudentData();
//   }, [usn]);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <Header />
//       <div className="profile-container">
//         <h2>Student Profile</h2>
//         <div className="profile-details">
//           <p><strong>USN:</strong> {studentData.usn}</p>
//           <p><strong>Name:</strong> {`${studentData.first_name} ${studentData.last_name}`}</p>
//           <p><strong>Email:</strong> {studentData.email_id}</p>
//           <p><strong>Phone Number:</strong> {studentData.phone_number}</p>
//           <p><strong>Branch:</strong> {studentData.branch}</p>
//           <p><strong>CGPA:</strong> {studentData.cgpa}</p>
//           <p><strong>Counselor Name:</strong> {studentData.counselor_name}</p>
//         </div>
//         <div className="profile-buttons">
//           <button
//             className="academic-data-button"
//             onClick={() => navigate(`/student/${usn}/courses`)}
//           >
//             View Academic Data
//           </button>
//           <button
//             className="activity-data-button"
//             onClick={() => navigate(`/student/${usn}/events`)}
//           >
//             View Activity Points
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfile;
