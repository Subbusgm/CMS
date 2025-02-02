import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // Assuming you have a common Header component
import "./FacultyMeetings.css"; // Assuming you create a CSS file for styling
import Header2 from "./Header2";

const FacultyMeetings = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // Track if the form is shown
  const [showModal, setShowModal] = useState(false); 
  const [meetingDetails, setMeetingDetails] = useState({
    date: "",
    time: "",
    duration: "",
    studentUsn: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/faculty/students", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch students.");
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    setMeetingDetails({
      ...meetingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const scheduleMeeting = async () => {
    const { date, time, duration, studentUsn } = meetingDetails;

    if (!date || !time || !duration) {
      alert("Please fill in all fields.");
      return;
    }
    try {   
        console.log("HERE");
        
      const response = await fetch("http://localhost:5000/api/faculty/schedule-meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            student_usn: studentUsn,
            date,
            time,
            duration,
          }),
        credentials: "include",
      });

      console.log(response);
      

      if (response.ok) {
        alert("Meeting scheduled and notification sent to the student.");
      } else {
        alert("Failed to schedule the meeting.");
      }
    } catch (err) {
      alert("Error occurred while scheduling the meeting.");
    }
  };

//   const openScheduleForm = (studentUsn) => {
//     setMeetingDetails({ ...meetingDetails, studentUsn });
//     setShowForm(true);
//   };

   const openScheduleModal = (studentUsn) => {
    setMeetingDetails({ ...meetingDetails, studentUsn });
    setShowModal(true); // Show the modal
  };  

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <Header2 />
      <div className="faculty-meetings-container">
        <h2 className="faculty-meetings-title">Manage Meetings</h2>
        <table className="meetings-table">
          <thead>
            <tr>
              <th>USN</th>
              <th>Student Name</th>
              <th>Schedule Meeting</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.usn}>
                <td>{student.usn}</td>
                <td>{`${student.first_name} ${student.last_name}`}</td>
                <td>
                  <button
                    className="button primary"
                    onClick={() => openScheduleModal(student.usn)}
                  >
                    Schedule Meeting
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Scheduling Meeting */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Schedule a Meeting</h3>
              <form>
                <label>Date:</label>
                <input
                  type="date"
                  name="date"
                  value={meetingDetails.date}
                  onChange={handleInputChange}
                />
                <label>Time:</label>
                <input
                  type="time"
                  name="time"
                  value={meetingDetails.time}
                  onChange={handleInputChange}
                />
                <label>Duration:</label>
                <input
                  type="text"
                  name="duration"
                  placeholder="Duration in minutes"
                  value={meetingDetails.duration}
                  onChange={handleInputChange}
                />
                <button type="button" onClick={scheduleMeeting}>
                  Schedule Meeting
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)} // Close the modal
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Conditional rendering for the schedule meeting form */}
        {/* {showForm && (
          <div className="schedule-meeting-form">
            <h3>Schedule a Meeting</h3>
            <form>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={meetingDetails.date}
                onChange={handleInputChange}
              />
              <label>Time:</label>
              <input
                type="time"
                name="time"
                value={meetingDetails.time}
                onChange={handleInputChange}
              />
              <label>Duration:</label>
              <input
                type="text"
                name="duration"
                placeholder="Duration in minutes"
                value={meetingDetails.duration}
                onChange={handleInputChange}
              />
              <button type="button" onClick={scheduleMeeting}>
                Schedule Meeting
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FacultyMeetings;