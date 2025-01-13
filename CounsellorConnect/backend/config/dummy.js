const db = require("./db");

const result = db.execute('SELECT * FROM student WHERE usn = 1RV22IS069' );
console.log(result);