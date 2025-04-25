const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nastia!2006',
  database: 'blohsh'
});

connection.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL (blohsh)');
});

module.exports = connection;
