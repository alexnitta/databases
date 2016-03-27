var db = require('../db');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (body, table) {
      console.log('messages req.body in models: ', body);
      db.saveMessage(body, table);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (body, table) {
      console.log('users req.body in models: ', body);
      db.saveUser(body, table);
    }
  }
};

