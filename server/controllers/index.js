var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('messages req.body in controller: ', req.body); 
      models.messages.post(req.body, 'Messages'); // 'Messages' is the table we are writing to in the DB
      res.end();     
    }, // a function which handles posting a message to the database
    options: function (req, res) {}
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      models.users.post(req.body, 'Users'); // 'Users' is the table we are writing to in the DB
      console.log('users req.body in controller: ', req.body);
      res.end();      
    },
    options: function (req, res) {}
  }
};

models();

