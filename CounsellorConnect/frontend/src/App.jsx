import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StudentLogin from "./components/StudentLogin";
import Home from "./components/Home";
import CounselorLogin from "./components/CounselorLogin";
import StudentRegistration from "./components/StudentRegistration";
import StudentProfile from "./components/StudentProfile";
import AcademicData from "./components/AcademicData";
import ActivityPoints from "./components/ActivityPoints";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route to redirect to /home */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/counselor" element={<CounselorLogin />} />
        <Route path="/register" element={<StudentRegistration />} />
        <Route path="/student/profile/:usn" element={<StudentProfile />} />
        <Route path="/student/:usn/academic" element={<AcademicData />} />
        <Route path="/student/:usn/activity" element={<ActivityPoints />} />
      </Routes>
    </Router>
  );
};

export default App;
