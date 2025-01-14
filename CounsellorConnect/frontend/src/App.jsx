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

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route to redirect to /home */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/faculty" element={<FacultyLogin />} />
        <Route path="/register" element={<StudentRegistration />} />
        <Route path="/student/profile/:usn" element={<StudentProfile />} />
        <Route path="/student/:usn/courses" element={<AcademicData />} />
        <Route path="/student/:usn/events" element={<ActivityPoints />} />
        <Route path="/faculty/profile/:facultyId" element={<FacultyProfile />} />
        <Route path="/faculty/:facultyId/counselees" element={<FacultyCounselees />} />
      </Routes>
    </Router>
  );
};

export default App;
