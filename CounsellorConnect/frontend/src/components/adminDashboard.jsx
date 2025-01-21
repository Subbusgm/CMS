import React, { useState, useEffect } from 'react';

const DepartmentDetails = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch department details
    const fetchDepartmentDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/dashboard', {
          method: "GET",
        });

        // Check if response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch department details");
        }

        const data = await response.json();
        setDepartments(data);  // Set the department data to state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching department details:", error);
        setError("An error occurred while fetching department details.");
        setLoading(false);
      }
    };

    // Fetch department details on component mount
    fetchDepartmentDetails();
  }, []);

  if (loading) {
    return <div className="loading">Loading department details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="academic-container">
      <h1 className="academic-title">Department Details</h1>
      {departments.length > 0 ? (
        <div className="table-wrapper">
          <table className="academic-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Faculty Count</th>
                <th>Student Count</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, index) => (
                <tr key={index}>
                  <td>{dept.department}</td>
                  <td>{dept.faculty_count}</td>
                  <td>{dept.student_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No department details available.</p>
      )}
    </div>
  );
};

export default DepartmentDetails;
