var models = require('../models');

module.exports = {
  messages: { 
    get: function (req, res) { // a function which handles a get request for all messages
      var rows = models.messages.get('Messages'); // 'Messages' is the table we are reading from in the DB
      console.log('Messages rows: ', rows);
      res.end(rows);    
    }, 
    post: function (req, res) { // a function which handles posting a message to the database
      models.messages.post(req.body, 'Messages'); // 'Messages' is the table we are writing to in the DB
      res.end();     
    }, 
    options: function (req, res) {}
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      var rows = models.users.get('Users');
      console.log('Users rows: ', rows);
      res.end(rows);
    },
    post: function (req, res) {
      models.users.post(req.body, 'Users'); // 'Users' is the table we are writing to in the DB
      res.end();      
    },
    options: function (req, res) {}
  }
};

models();

