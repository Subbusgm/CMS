import React, { useEffect, useState } from "react";
import "./ActivityPoints.css"; // Import the CSS file for styling
import Header2 from "./Header2";

const StudentActivity = () => {
  // const { usn } = useParams();
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        // const response = await axios.get(`http://localhost:5000/api/student/events`);
        const response = await fetch(`http://localhost:5000/api/student/events`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        
        setActivities(data);
      } catch (err) {
        setError("Failed to fetch activity data.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <Header2 />
      <div className="activity-container">
        <h2>Activity Points</h2>
        {activities.length > 0 ? (
          <table className="activity-table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Event Category</th>
                <th>Points Earned</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.event_id}>
                  <td>{activity.event_id}</td>
                  <td>{activity.event_name}</td>
                  <td>{activity.event_category}</td>
                  <td>{activity.number_of_points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">No activity data available for this student.</div>
        )}
      </div>
    </div>
  );
};

export default StudentActivity;