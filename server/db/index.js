var mysql = require('mysql');

var promise = require('bluebird');


// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'p',
  database: 'chat'
});

var queryAsync = promise.promisify(connection.query, {context: connection});

exports.saveMessage = function(body, table) {
  // connection.connect();
  var roomExists = false;
  var userExists = false;
  var roomId, userId;

  console.dir(queryAsync);

  // check if room exists; if not, add it. Return the room Id. 
  var createRoomPromise = queryAsync('INSERT INTO Rooms VALUES (DEFAULT, "' + body.roomname + '")');
  var roomExistPromise = queryAsync('SELECT Id, Name FROM Rooms WHERE Name="' + body.roomname + '"')
    .then(function(results) {
      if (results.length) {
        roomId = results[0].Id;
        return roomId;
      } else {
        createRoomPromise.then(function(results) {
          roomId = results.insertId;
          return roomId;
        });
      }
    });

  // check if user exists; if not, add it. Return the user Id. 
  var createUserPromise = queryAsync('INSERT INTO Users VALUES (DEFAULT, "' + body.username + '")');
  var userExistPromise = queryAsync('SELECT Id, Name FROM Users WHERE Name="' + body.username + '"')
    .then(function(results) {
      if (results.length) {
        userId = results[0].Id;
        return userId;
      } else {
        createRoomPromise.then(function(results) {
          userId = results.insertId;
          return userId;
        });
      }
    });

  // when userId and roomId are set, we will run this promise to write to the Messages table
  
  // var messageCreatePromise = queryAsync({sql: 'INSERT INTO Messages SET id=DEFAULT, User_ID=?, Room_ID=?, Text=?', values: [roomId, userId, body.message]});
  
  // // queue up promises to get userId and roomId
  
  // promise.all([roomExistPromise, userExistPromise])
  // .then(messageCreatePromise);
  
  // // this is the version we set up on Saturday, end of pair work
  
  // promise.all([roomExistPromise, userExistPromise])
  // .then(function(roomUserIds) {
  //   connection.query({sql: 'INSERT INTO Messages SET id=DEFAULT, User_ID=?, Room_ID=?, Text=?', values: [roomUserIds[1], roomUserIds[0], body.message]}, function(error, results, fields) {
  //     console.log('Message INSERT results: ', results);
  //     console.log('Message INSERT error: ', error);
  //     console.log('Message INSERT fields: ', fields);

  //   });
  // });

  // connection.query('SELECT Id, Name FROM Rooms WHERE Name="' + body.roomname + '"', function(error, results, fields) {
    
  //   if (results.length !== 0) { // results will be an array, even if none found
  //     roomExists = true;
  //     roomId = results[0].Id;
  //     console.log('roomId already existed', roomId);
  //   } 

  //   if (!roomExists) {
  //   // if room doesn't exist, do an INSERT into Room table and get the roomID
  //     connection.query('INSERT INTO Rooms VALUES (DEFAULT, "' + body.roomname + '")', function(error, results, fields) {
  //       roomId = results.insertId;
  //       console.log('room now exists', roomId);
  //     });
  //   }

  //   connection.query('SELECT Id, Name FROM Users WHERE Name="' + body.username + '"', function(error, results, fields) {
      
  //     if (results.length !== 0) { // results will be an array, even if none found
  //       userExists = true;
  //       userId = results[0].Id;
  //       console.log('user already existed', userId);
  //     } 

  //     if (!userExists) {
  //     // if user doesn't exist, do an INSERT into User table and get the userId
  //       connection.query('INSERT INTO Users VALUES (DEFAULT, "' + body.username + '")', function(error, results, fields) {
  //         userId = results.insertId;
  //         console.log('user now exists', userId);
  //       });
  //     }

  //     connection.query('INSERT INTO Messages VALUES (DEFAULT, 46, 12, "message")', function(error, results, fields) {
  //       console.log('Message INSERT results: ', results);
  //       console.log('Message INSERT error: ', error);
  //       console.log('Message INSERT fields: ', fields);

  //     });

  //   });

  // });
  

  // check if user exists; if not, add it. Get the user Id. 




  // once room and user exist, do an INSERT for message to Messages table using the roomID and user ID

  // connection.query('INSERT INTO Messages VALUES (DEFAULT, ' + connection.escapeId(userId) + ', ' + connection.escapeId(roomId) + ', "' + body.text + '")', function(error, results, fields) {

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
