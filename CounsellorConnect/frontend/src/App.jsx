import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StudentLogin from "./components/StudentLogin";
import Home from "./components/Home";
import CounselorLogin from "./components/CounselorLogin";
import StudentRegistration from "./components/StudentRegistration";
import StudentProfile from "./components/StudentProfile";
import AcademicData from "./components/AcademicData";
import ActivityPoints from "./components/ActivityPoints";
import FacultyLogin from "./components/FacultyLogin";
import FacultyProfile from "./components/FacultyProfile";
import FacultyCounselees from "./components/FacultyCounselees";
import FileUpload from "./components/uploadFile";
import FacultyMeetings from "./components/FacultyMeetings";
import StudentMeeting from "./components/StudentMeeting";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route to redirect to /home */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/faculty" element={<FacultyLogin />} />
        <Route path="/register" element={<StudentRegistration />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/courses" element={<AcademicData />} />
        <Route path="/student/events" element={<ActivityPoints />} />
        <Route path="/student/meetings" element={<StudentMeeting />} />
        <Route path="/faculty/profile" element={<FacultyProfile />} />
        <Route path="/faculty/counselees" element={<FacultyCounselees />} />
        <Route path="/faculty/students" element={<FacultyMeetings />} />
        <Route path="/upload" element={<FileUpload />} />
      </Routes>
    </Router>
  );
};

export default App;