var db = require('../db');
var promise = require('bluebird');
var mysql = require('mysql');
var queryAsync = promise.promisify(db.connection.query, {context: db.connection});

module.exports = {
  messages: {
    get: function (table) {
      readMessages(table);
    }, // a function which produces all the messages
    post: function (body, table) {
      saveMessage(body, table);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (table) {
      readUsers(table);
    },
    post: function (body, table) {
      saveUser(body, table);
    }
  }
};

var readMessages = function(table) {
  var readMessagesPromise = queryAsync('SELECT * from Messages');
  readMessagesPromise
  .then(function(results) {
    console.log('readMessages results: ', results);
    return results;
  });
};

var readUsers = function(table) {
  var readUsersPromise = queryAsync('SELECT * from Users');
  readUsersPromise
  .then(function(results) {
    console.log('readUsers results: ', results);
    return results;
  });
};

var saveMessage = function(body, table) {
  // connection.connect();
  var roomExists = false;
  var userExists = false;
  var roomId, userId;

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
        createUserPromise.then(function(results) {
          userId = results.insertId;
          return userId;
        });
      }
    });


  promise.all([roomExistPromise, userExistPromise])
  .then(function(roomUserIds) {
    var messageSavePromise = queryAsync({sql: 'INSERT INTO Messages SET id=DEFAULT, User_ID=?, Room_ID=?, Text=?', values: [roomUserIds[1], roomUserIds[0], body.message]});
    messageSavePromise
    .catch(function(error) {
      console.log('Message Save Error: ', error);
    });
  });
};

var saveUser = function(body, table) {
    // connection.connect();
  var userExists = false;
  var ruserId;

  // check if user exists; if not, add it. Return the user Id. 
  var createUserPromise = queryAsync('INSERT INTO Users VALUES (DEFAULT, "' + body.username + '")');
  var userExistPromise = queryAsync('SELECT Id, Name FROM Users WHERE Name="' + body.username + '"')
    .then(function(results) {
      if (results.length) {
        userId = results[0].Id;
        return userId;
      } else {
        createUserPromise.then(function(results) {
          userId = results.insertId;
          return userId;
        });
      }
    });

  promise.all([userExistPromise])
  .catch(function(error) {
    console.log('User Save Error: ', error);
  });

};

