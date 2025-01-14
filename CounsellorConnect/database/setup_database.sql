CREATE DATABASE counselor_management;
USE counselor_management;

-- Faculty Table
CREATE TABLE faculty (
    faculty_id INT AUTO_INCREMENT PRIMARY KEY,
    department VARCHAR(100),
    qualification VARCHAR(100),
    email_id VARCHAR(100) UNIQUE,
    phone_number VARCHAR(15),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    number_of_counselees INT DEFAULT 0,
    password VARCHAR(255) -- Added password field
);

-- Course Table
CREATE TABLE course (
    course_code VARCHAR(20) PRIMARY KEY,
    number_of_credits INT,
    course_name VARCHAR(100)
);

-- Handles Table (Linking Faculty and Course)
CREATE TABLE handles (
    faculty_id INT,
    course_code VARCHAR(20),
    PRIMARY KEY (faculty_id, course_code),
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id),
    FOREIGN KEY (course_code) REFERENCES course(course_code)
);

-- Student Table
CREATE TABLE student (
    usn VARCHAR(20) PRIMARY KEY,
    branch VARCHAR(100),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    number_of_backlogs INT,
    phone_number VARCHAR(15),
    cgpa DECIMAL(4, 2),
    email_id VARCHAR(100) UNIQUE,
    faculty_id INT,
    password VARCHAR(255), -- Added password field
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id)
);

-- Guardian Table
CREATE TABLE guardian (
    student_usn VARCHAR(20),
    phone_number VARCHAR(15),
    guardian_name VARCHAR(50),
    relationship VARCHAR(50),
    email_id VARCHAR(100),
    PRIMARY KEY (student_usn),
    FOREIGN KEY (student_usn) REFERENCES student(usn)
);

-- Activity Points Table
CREATE TABLE activity_points (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    event_category VARCHAR(100),
    event_name VARCHAR(100),
    number_of_points INT, -- Renamed to match the requirement
    doc_link VARCHAR(255) -- Renamed to match the requirement
);

-- Earned By Table (Linking Student and Activity Points)
CREATE TABLE earned_by (
    event_id INT,
    student_usn VARCHAR(20),
    PRIMARY KEY (event_id, student_usn),
    FOREIGN KEY (event_id) REFERENCES activity_points(event_id),
    FOREIGN KEY (student_usn) REFERENCES student(usn)
);

-- Attendance Table
CREATE TABLE attended_by (
    course_code VARCHAR(20),
    student_usn VARCHAR(20),
    percentage DECIMAL(5, 2),
    date DATE,
    permission_doc_link VARCHAR(255),
    permission BOOLEAN,
    final_cie_marks DECIMAL(5, 2), -- Added final CIE marks
    PRIMARY KEY (course_code, student_usn),
    FOREIGN KEY (course_code) REFERENCES course(course_code),
    FOREIGN KEY (student_usn) REFERENCES student(usn)
);

-- Meeting Table
CREATE TABLE meeting (
    meeting_id INT AUTO_INCREMENT PRIMARY KEY,
    purpose VARCHAR(255),
    duration TIME,
    date DATE,
    student_usn VARCHAR(20),
    faculty_id INT,
    FOREIGN KEY (student_usn) REFERENCES student(usn),
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id)
);
