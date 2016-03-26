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

exports.saveMessage = function(body, table) {
  // connection.connect();
  var roomExists = false;

  console.log('made it to saveMessage');
  connection.query('SELECT * FROM Rooms', function(error, results, fields) {
    console.log('results in SaveMessage: ', results);
    
    if (results.length !== 0) { // results will be an array, even if none found
      roomExists = true;
    } 

    // if room doesn't exist, do an INSERT into Room table and get the roomID

    // do the same for user

    // once room and user exist, do an INSERT for message to Messages table using the roomID

  });

  // var queryArgString = args.join(',');  

  // var sqlString = 'INSERT INTO ' + table + ' VALUES (DEFAULT, "' + queryArgString + '")';

  // connection.query(sqlString, function(error, results, fields) {
  //   // callback for query
  //   console.log('mysql connection.query error: ', error);
  //   console.log('mysql connection.query results: ', results);
  //   console.log('mysql connection.query fields: ', fields);
  // });

  // connection.end(function(err) {
  // // The connection is terminated now
  //   console.log('saveMessage db error: ', err);
  // });
};


// will take data and save it to database (for POST requests)
exports.saveUser = function(body, table) {
  // connection.connect();
  
  // COME BACK TO THIS: check if the user exists?

  // if the user does not exist, add them
  var sqlString = 'INSERT INTO ' + table + ' VALUES (DEFAULT, "' + body.username + '")';

  connection.query(sqlString, function(error, results, fields) {
    // callback for query
    // console.log('mysql connection.query error: ', error);
    // console.log('mysql connection.query results: ', results);
    // console.log('mysql connection.query fields: ', fields);
  });

  // connection.end(function(err) {
  // // The connection is terminated now
  //   console.log('saveUser db error: ', err);
  // });
};

// query the database (for GET requests)
exports.query = function() {

};

// remove from database (do we need this?)
exports.remove = function() {

};
