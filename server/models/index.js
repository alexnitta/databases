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



/*

Thoughts before lunch break:



possible solutions
1 - create a connect method on db module
  - move .saveMessage and .saveUser methods into model (this code) 
  - somehow check if connection is already open (or use pooling)
    - if not, create a new one 

*/