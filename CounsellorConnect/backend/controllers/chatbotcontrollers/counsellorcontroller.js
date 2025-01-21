const db = require('../../config/db.js');  // Your MySQL configuration

// Controller function to handle counselor-related queries including meeting details
exports.getCounselorInfo = (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  console.log('Intent Name:', intentName);

  // Retrieve parameters or context
  const studentID = req.body.queryResult.parameters.StudentID; // Extract StudentID parameter from current query
  const studentContext = req.body.queryResult.outputContexts.find(ctx =>
    ctx.name.endsWith('/contexts/student_context')
  ); // Look for the student_context in outputContexts
  const storedStudentID = studentContext?.parameters?.StudentID || studentID; // If found in context, use it, else use current query

  console.log('StudentID:', storedStudentID);  // Log StudentID for debugging

  switch (intentName) {
    case 'Default Welcome Intent': {
      return res.json({
        fulfillmentText: 'Welcome! Please provide your Student USN to proceed.',
      });
    }

    case 'after_welcome': {
      console.log('StudentID in after_welcome:', studentID);

      // Add StudentID to context for subsequent intents
      return res.json({
        fulfillmentText: `Great. Your USN is ${studentID}. How can I assist you further?`,
        outputContexts: [
          {
            name: `${req.body.session}/contexts/student_context`,
            lifespanCount: 5, // Set lifespan count for how long the context is valid
            parameters: {
              StudentID: studentID, // Store StudentID in context
            },
          },
        ],
      });
    }

    case 'Get_Counselor_Name': {
      if (!storedStudentID) {
        return res.json({ fulfillmentText: 'Student ID is missing. Please provide your USN.' });
      }
      
      const query = `
        SELECT CONCAT(f.first_name, ' ', f.last_name) AS counselorName
        FROM faculty f
        INNER JOIN student s ON f.faculty_id = s.faculty_id
        WHERE s.usn = ?
      `;
      db.query(query, [storedStudentID], (err, result) => {
        if (err) {
          return res.json({ fulfillmentText: 'Error fetching counselor details.' });
        }
        const responseText = result.length
          ? `Your counselor's name is ${result[0].counselorName}.`
          : 'No counselor found.';
        return res.json({ fulfillmentText: responseText });
      });
      break;
    }

    case 'Get_Counselor_ID': {
      if (!storedStudentID) {
        return res.json({ fulfillmentText: 'Student ID is missing. Please provide your USN.' });
      }

      const query = `
        SELECT f.faculty_id AS counselorID
        FROM faculty f
        INNER JOIN student s ON f.faculty_id = s.faculty_id
        WHERE s.usn = ?
      `;
      db.query(query, [storedStudentID], (err, result) => {
        if (err) {
          return res.json({ fulfillmentText: 'Error fetching counselor details.' });
        }
        const responseText = result.length
          ? `Your counselor's ID is ${result[0].counselorID}.`
          : 'No counselor found.';
        return res.json({ fulfillmentText: responseText });
      });
      break;
    }

    case 'Get_Counselor_Phone': {
      if (!storedStudentID) {
        return res.json({ fulfillmentText: 'Student ID is missing. Please provide your USN.' });
      }

      const query = `
        SELECT f.phone_number AS phoneNumber
        FROM faculty f
        INNER JOIN student s ON f.faculty_id = s.faculty_id
        WHERE s.usn = ?
      `;
      db.query(query, [storedStudentID], (err, result) => {
        if (err) {
          return res.json({ fulfillmentText: 'Error fetching counselor details.' });
        }
        const responseText = result.length
          ? `Your counselor's phone number is ${result[0].phoneNumber}.`
          : 'No counselor found.';
        return res.json({ fulfillmentText: responseText });
      });
      break;
    }

    case 'Get_Counselor_Email': {
      if (!storedStudentID) {
        return res.json({ fulfillmentText: 'Student ID is missing. Please provide your USN.' });
      }

      const query = `
        SELECT f.email_id AS emailID
        FROM faculty f
        INNER JOIN student s ON f.faculty_id = s.faculty_id
        WHERE s.usn = ?
      `;
      db.query(query, [storedStudentID], (err, result) => {
        if (err) {
          return res.json({ fulfillmentText: 'Error fetching counselor details.' });
        }
        const responseText = result.length
          ? `Your counselor's email ID is ${result[0].emailID}.`
          : 'No counselor found.';
        return res.json({ fulfillmentText: responseText });
      });
      break;
    }

    case 'Get_Counselor_Qualification': {
      if (!storedStudentID) {
        return res.json({ fulfillmentText: 'Student ID is missing. Please provide your USN.' });
      }

      const query = `
        SELECT f.qualification AS counselorQualification
        FROM faculty f
        INNER JOIN student s ON f.faculty_id = s.faculty_id
        WHERE s.usn = ?
      `;
      db.query(query, [storedStudentID], (err, result) => {
        if (err) {
          return res.json({ fulfillmentText: 'Error fetching counselor qualification.' });
        }
        const responseText = result.length
          ? `Your counselor's qualification is ${result[0].counselorQualification}.`
          : 'No counselor found.';
        return res.json({ fulfillmentText: responseText });
      });
      break;
    }

    case 'Get_Counselor_Department': {
      if (!storedStudentID) {
        return res.json({ fulfillmentText: 'Student ID is missing. Please provide your USN.' });
      }

      const query = `
        SELECT f.department AS counselorDepartment
        FROM faculty f
        INNER JOIN student s ON f.faculty_id = s.faculty_id
        WHERE s.usn = ?
      `;
      db.query(query, [storedStudentID], (err, result) => {
        if (err) {
          return res.json({ fulfillmentText: 'Error fetching counselor department details.' });
        }
        const responseText = result.length
          ? `Your counselor's department is ${result[0].counselorDepartment}.`
          : 'No counselor department found.';
        return res.json({ fulfillmentText: responseText });
      });
      break;
    }

    case 'Get_Meeting_Details': {
      if (!storedStudentID) {
        return res.json({ fulfillmentText: 'Student ID is missing. Please provide your USN.' });
      }

      const query = `
        SELECT m.date, m.purpose, m.duration
        FROM meeting m
        INNER JOIN student s ON m.student_usn = s.usn
        WHERE s.usn = ?
      `;
      db.query(query, [storedStudentID], (err, result) => {
        if (err) {
          return res.json({ fulfillmentText: 'Error fetching meeting details.' });
        }
        if (result.length) {
          let responseText = 'Here are your upcoming meetings:\n';
          result.forEach(meeting => {
            responseText += `- Meeting on ${meeting.date} for ${meeting.purpose} (Duration: ${meeting.duration})\n`;
          });
          return res.json({ fulfillmentText: responseText });
        } else {
          return res.json({ fulfillmentText: 'No upcoming meetings found.' });
        }
      });
      break;
    }

    default:
      return res.json({
        fulfillmentText: 'I am not sure how to handle this request. Please try again.',
      });
  }
};
