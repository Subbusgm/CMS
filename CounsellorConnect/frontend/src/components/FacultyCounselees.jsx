import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./FacultyCounselees.css"; // Import the CSS file for styling

const FacultyCounselees = () => {
  const { facultyId } = useParams(); // Extract facultyId from URL
  const [counselees, setCounselees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounselees = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/faculty/${facultyId}/counselees`);
        setCounselees(response.data);
      } catch (err) {
        setError("Failed to fetch counselees.");
      } finally {
        setLoading(false);
      }
    };

    fetchCounselees();
  }, [facultyId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <Header />
      <div className="faculty-container">
        <h2>Faculty Counselees</h2>
        {counselees.length > 0 ? (
          <table className="faculty-table">
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