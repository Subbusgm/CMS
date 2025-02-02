// In UpcomingMeetings.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentMeeting.css";
import Header2 from "./Header2";

const StudentMeeting = () => {
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(null);
  const [reason, setReason] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/student/meetings", {
          method: "GET",
          credentials: "include", // Ensure credentials are passed (cookies)
        });

        if (!response.ok) {
          throw new Error("Failed to fetch meetings.");
        }

        const data = await response.json();
        setMeetings(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMeetings();
  }, []);

  const handleAccept = (meetingId) => {
    updateMeetingStatus(meetingId, 'accepted');
  };

  const handleDecline = (meetingId) => {
    if (!reason.trim()) {
      alert("Please provide a reason for declining.");
      return;
    }
    updateMeetingStatus(meetingId, 'declined', reason);
  };

  const updateMeetingStatus = async (meetingId, status, reason = '') => {
    try {
      const response = await fetch("http://localhost:5000/api/student/respond-meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ meetingId, status, reason }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update meeting status.");
      }

      setMeetings(meetings.filter(meeting => meeting.meeting_id !== meetingId));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
        <Header2/>
        <div className="student-meetings-page">
        <h2>Your Upcoming Meetings</h2>
        {error && <p className="error">{error}</p>}
        {meetings.length === 0 ? (
            <p>No upcoming meetings scheduled.</p>
        ) : (
            <table>
            <thead>
                <tr>
                <th>Faculty</th>
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {meetings.map((meeting) => (
                <tr key={meeting.meeting_id}>
                    <td>{meeting.faculty_name}</td>
                    <td>{new Date(meeting.date).toLocaleDateString()}</td>
                    <td>{meeting.time}</td>
                    <td>{meeting.duration}</td>
                    <td>
                    <button className="accept" onClick={() => handleAccept(meeting.meeting_id)}>Accept</button>
                    <button className="decline" onClick={() => setSelectedMeeting(meeting.meeting_id)}>Decline</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}

        {selectedMeeting && (
            <div>
            <h3>Reason for Decline</h3>
            <textarea 
                value={reason} 
                onChange={(e) => setReason(e.target.value)} 
                placeholder="Provide a reason..." 
            />
            <button onClick={() => handleDecline(selectedMeeting)}>Submit</button>
            </div>
        )}
        </div>
    </div>
    
  );
};

export default StudentMeeting;
