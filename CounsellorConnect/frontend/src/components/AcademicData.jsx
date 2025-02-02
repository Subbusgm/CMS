import React, { useEffect, useState } from "react";
import "./AcademicData.css"; // Assuming a CSS file for styling
import Header2 from "./Header2";

const AcademicData = () => {
  // const { usn } = useParams();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch academic data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // const response = await axios.get(
        //   `http://localhost:5000/api/student/${usn}/courses`
        // );
        const response = await fetch(`http://localhost:5000/api/student/courses`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();  
        console.log(data);
              
        setCourses(data);
      } catch (err) {
        setError("Failed to fetch academic data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <Header2 />
      <div className="academic-container">
        <h2 className="academic-title">Academic Performance</h2>
        {courses.length > 0 ? (
          <div className="table-wrapper">
            <table className="academic-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Attendance (%)</th>
                  <th>Final CIE Marks</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.course_code}>
                    <td>{course.course_code}</td>
                    <td>{course.course_name}</td>
                    <td>{course.attendance}%</td>
                    <td>{course.final_cie_marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data">No academic data available for this student.</div>
        )}
      </div>
    </div>
  );
};

export default AcademicData;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Header from "./Header";

// const AcademicData = () => {
//     // console.log("HI");
//   const {usn} = useParams();
//   const [courses, setCourses] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch academic data
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`http://localhost:5000/api/student/${usn}/courses`);
//         setCourses(response.data);
//       } catch (err) {
//         setError("Failed to fetch academic data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [usn]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h2>Academic Performance</h2>
//       {courses.length > 0 ? (
//         <table border="1" cellPadding="10" cellSpacing="0">
//           <thead>
//             <tr>
//               <th>Course Code</th>
//               <th>Course Name</th>
//               <th>Attendance (%)</th>
//               <th>Final CIE Marks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {courses.map((course) => (
//               <tr key={course.course_code}>
//                 <td>{course.course_code}</td>
//                 <td>{course.course_name}</td>
//                 <td>{course.attendance}</td>
//                 <td>{course.final_cie_marks}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div>No academic data available for this student.</div>
//       )}
//     </div>
//   );
// };

// export default AcademicData;
