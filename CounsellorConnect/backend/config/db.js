const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();


const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL Database');
    connection.release();
  }
});

module.exports = db;
