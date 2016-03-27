var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'p',
  database: 'chat'
});

connection.connect();

// will take data and save it to database (for POST requests)
exports.save = function() {

};

// query the database (for GET requests)
exports.query = function() {

};

// remove from database (do we need this?)
exports.remove = function() {

};

connection.query('SELECT * FROM Messages', function(err, rows, fields) {
  if (err) {
    throw err;
  }
  console.log('Messages fields are: ', fields);
});

connnection.end();

