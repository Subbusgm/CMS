-- Faculty Table
INSERT INTO faculty (department, qualification, email_id, phone_number, first_name, last_name, number_of_counselees, password) 
VALUES 
('Computer Science', 'MSc', 'cs1@university.com', '1234567890', 'Alice', 'Smith', 0, 'password123'),
('Electrical', 'PhD', 'ee1@university.com', '2345678901', 'Bob', 'Johnson', 0, 'password123'),
('Mechanical', 'MTech', 'me1@university.com', '3456789012', 'Charlie', 'Brown', 0, 'password123'),
('Civil', 'BTech', 'ce1@university.com', '4567890123', 'David', 'Lee', 0, 'password123'),
('Electronics', 'MSc', 'ec1@university.com', '5678901234', 'Eva', 'White', 0, 'password123');

-- Course Table
INSERT INTO course (course_code, number_of_credits, course_name) 
VALUES 
('CS101', 3, 'Introduction to Computer Science'),
('EE101', 4, 'Introduction to Electrical Engineering'),
('ME101', 3, 'Introduction to Mechanical Engineering'),
('CE101', 3, 'Introduction to Civil Engineering'),
('EC101', 3, 'Introduction to Electronics');

-- Handles Table
INSERT INTO handles (faculty_id, course_code) 
VALUES 
(1, 'CS101'),
(2, 'EE101'),
(3, 'ME101'),
(4, 'CE101'),
(5, 'EC101');

-- Student Table
INSERT INTO student (usn, branch, first_name, last_name, number_of_backlogs, phone_number, cgpa, email_id, faculty_id, password) 
VALUES 
('CS10120', 'Computer Science', 'David', 'Lee', 0, '4567890123', 8.5, 'david.lee@university.com', 1, 'password123'),
('CS10121', 'Computer Science', 'Eva', 'White', 1, '5678901234', 7.2, 'eva.white@university.com', 1, 'password123'),
('EE10120', 'Electrical', 'Frank', 'Davis', 0, '6789012345', 8.0, 'frank.davis@university.com', 2, 'password123'),
('EE10121', 'Electrical', 'Grace', 'Miller', 2, '7890123456', 6.8, 'grace.miller@university.com', 2, 'password123'),
('ME10120', 'Mechanical', 'Henry', 'Wilson', 0, '8901234567', 8.3, 'henry.wilson@university.com', 3, 'password123'),
('ME10121', 'Mechanical', 'Ivy', 'Moore', 1, '9012345678', 7.4, 'ivy.moore@university.com', 3, 'password123'),
('CE10120', 'Civil', 'John', 'Taylor', 0, '9123456789', 8.7, 'john.taylor@university.com', 4, 'password123'),
('CE10121', 'Civil', 'Kathy', 'Anderson', 0, '9234567890', 7.9, 'kathy.anderson@university.com', 4, 'password123'),
('EC10120', 'Electronics', 'Louis', 'Jackson', 0, '9345678901', 8.1, 'louis.jackson@university.com', 5, 'password123'),
('EC10121', 'Electronics', 'Mia', 'Harris', 0, '9456789012', 7.5, 'mia.harris@university.com', 5, 'password123');

-- Guardian Table
INSERT INTO guardian (student_usn, phone_number, guardian_name, relationship, email_id) 
VALUES 
('CS10120', '1112233445', 'John Lee', 'Father', 'john.lee@guardian.com'),
('CS10121', '1122334456', 'Sarah White', 'Mother', 'sarah.white@guardian.com'),
('EE10120', '1233454567', 'Peter Davis', 'Father', 'peter.davis@guardian.com'),
('EE10121', '1244555678', 'Linda Miller', 'Mother', 'linda.miller@guardian.com'),
('ME10120', '1356787890', 'George Wilson', 'Father', 'george.wilson@guardian.com'),
('ME10121', '1367898901', 'Helen Moore', 'Mother', 'helen.moore@guardian.com'),
('CE10120', '1478901234', 'Samuel Taylor', 'Father', 'samuel.taylor@guardian.com'),
('CE10121', '1589012345', 'Rachel Anderson', 'Mother', 'rachel.anderson@guardian.com'),
('EC10120', '1690123456', 'David Jackson', 'Father', 'david.jackson@guardian.com'),
('EC10121', '1712345678', 'Olivia Harris', 'Mother', 'olivia.harris@guardian.com');

-- Activity Points Table
INSERT INTO activity_points (event_category, event_name, number_of_points, doc_link) 
VALUES 
('Sports', 'Football Tournament', 10, 'link_to_football_doc'),
('Cultural', 'Drama Performance', 15, 'link_to_drama_doc'),
('Academics', 'Research Paper Publication', 20, 'link_to_paper_doc'),
('Sports', 'Basketball Tournament', 12, 'link_to_basketball_doc'),
('Cultural', 'Singing Competition', 10, 'link_to_singing_doc');

-- Earned By Table
INSERT INTO earned_by (event_id, student_usn) 
VALUES 
(1, 'CS10120'),
(2, 'CS10121'),
(3, 'EE10120'),
(4, 'EE10121'),
(5, 'ME10120'),
(1, 'ME10121'),
(2, 'CE10120'),
(3, 'CE10121'),
(4, 'EC10120'),
(5, 'EC10121');

-- Attendance Table
INSERT INTO attended_by (course_code, student_usn, percentage, date, permission_doc_link, permission, final_cie_marks) 
VALUES 
('CS101', 'CS10120', 95.0, '2025-01-10', 'link_to_permission_doc', true, 80.0),
('EE101', 'EE10120', 90.0, '2025-01-10', 'link_to_permission_doc', true, 75.0),
('ME101', 'ME10120', 85.0, '2025-01-10', 'link_to_permission_doc', true, 70.0),
('CE101', 'CE10120', 92.0, '2025-01-10', 'link_to_permission_doc', true, 78.0),
('EC101', 'EC10120', 88.0, '2025-01-10', 'link_to_permission_doc', true, 72.0),
('CS101', 'CS10121', 89.0, '2025-01-11', 'link_to_permission_doc', false, 74.0),
('EE101', 'EE10121', 91.0, '2025-01-11', 'link_to_permission_doc', true, 77.0),
('ME101', 'ME10121', 84.0, '2025-01-11', 'link_to_permission_doc', false, 68.0),
('CE101', 'CE10121', 95.0, '2025-01-11', 'link_to_permission_doc', true, 82.0),
('EC101', 'EC10121', 90.0, '2025-01-11', 'link_to_permission_doc', true, 75.0);

-- Meeting Table
INSERT INTO meeting (purpose, duration, date, student_usn, faculty_id) 
VALUES 
('Career Guidance', '00:30:00', '2025-01-10', 'CS10120', 1),
('Research Discussion', '00:45:00', '2025-01-11', 'EE10120', 2),
('Project Review', '01:00:00', '2025-01-12', 'ME10120', 3),
('Career Guidance', '00:30:00', '2025-01-12', 'CE10120', 4),
('Research Discussion', '00:45:00', '2025-01-13', 'EC10120', 5),
('Project Review', '00:45:00', '2025-01-13', 'CS10121', 1),
('Career Guidance', '00:30:00', '2025-01-14', 'EE10121', 2),
('Research Discussion', '00:45:00', '2025-01-14', 'ME10121', 3),
('Project Review', '01:00:00', '2025-01-15', 'CE10121', 4),
('Career Guidance', '00:30:00', '2025-01-15', 'EC10121', 5);
