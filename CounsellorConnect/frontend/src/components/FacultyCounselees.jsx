import React, { useEffect, useState } from "react";
import "./FacultyCounselees.css"; // Import the CSS file for styling
import Header2 from "./Header2";

const FacultyCounselees = () => {
  // const { facultyId } = useParams(); // Extract facultyId from URL
  const [counselees, setCounselees] = useState([]);
  const [academicPerformance, setAcademicPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounselees = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/api/faculty/${facultyId}/counselees`);
        const response = await fetch(`http://localhost:5000/api/faculty/counselees`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setCounselees(data);
      } catch (err) {
        setError("Failed to fetch counselees.");
      } finally {
        setLoading(false);
      }
    };

    const fetchAcademicPerformance = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/faculty/counselees/academics`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setAcademicPerformance(data);
      } catch (err) {
        setError("Failed to fetch academic performance.");
      }
    };

    // fetchCounselees();

    const fetchData = async () => {
      await fetchCounselees();
      await fetchAcademicPerformance();
      setLoading(false);
    };
    fetchData();

  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <Header2 />
      <div className="faculty-container">
        <h2>Faculty Counselees</h2>
        {counselees.length > 0 ? (
          <table className="faculty-table" style={{ marginBottom: "30px" }}>
            <thead>
              <tr>
                <th>USN</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Total Activity Points</th>
              </tr>
            </thead>
            <tbody>
              {counselees.map((counselee) => (
                <tr key={counselee.usn}>
                  <td>{counselee.usn}</td>
                  <td>{`${counselee.first_name} ${counselee.last_name}`}</td>
                  <td>{counselee.phone_number}</td>
                  <td>{counselee.email_id}</td>
                  <td>{counselee.total_activity_points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">No counselee data available for this faculty.</div>
        )}

        {/* Academic Performance Table */}
        <h2>Academic Performance of Counselees</h2>
        {academicPerformance.length > 0 ? (
          <table className="faculty-table">
            <thead>
              <tr>
                <th>USN</th>
                <th>Name</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Attendance (%)</th>
                <th>Final CIE Marks</th>
              </tr>
            </thead>
            <tbody>
              {academicPerformance.map((record, index) => (
                <tr key={index}>
                  <td>{record.usn}</td>
                  <td>{`${record.first_name} ${record.last_name}`}</td>
                  <td>{record.course_code}</td>
                  <td>{record.course_name}</td>
                  <td>{record.attendance}%</td>
                  <td>{record.final_cie_marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">No academic performance data available.</div>
        )}
      </div>
    </div>
  );
};

export default FacultyCounselees;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const FacultyCounselees = () => {
//   const { facultyId } = useParams(); // Extract facultyId from URL
//   const [counselees, setCounselees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCounselees = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/faculty/${facultyId}/counselees`);
//         setCounselees(response.data);
//       } catch (err) {
//         setError("Failed to fetch counselees.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCounselees();
//   }, [facultyId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold text-center mb-4">Counselees Activity Points</h1>
//       {counselees.length > 0 ? (
//         <table className="w-full table-auto border-collapse border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-4 py-2">USN</th>
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Phone</th>
//               <th className="border px-4 py-2">Email</th>
//               <th className="border px-4 py-2">Total Activity Points</th>
//             </tr>
//           </thead>
//           <tbody>
//             {counselees.map((counselee) => (
//               <tr key={counselee.usn} className="hover:bg-gray-50">
//                 <td className="border px-4 py-2">{counselee.usn}</td>
//                 <td className="border px-4 py-2">{`${counselee.first_name} ${counselee.last_name}`}</td>
//                 <td className="border px-4 py-2">{counselee.phone_number}</td>
//                 <td className="border px-4 py-2">{counselee.email_id}</td>
//                 <td className="border px-4 py-2">{counselee.total_activity_points}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="text-center text-gray-500">No counselees available.</div>
//       )}
//     </div>
//   );
// };

// export default FacultyCounselees;