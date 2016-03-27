var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      next();
    }, 
    post: function (req, res) { // a function which handles posting a message to the database
      
    }, 
    options: function (req, res) { // a function which handles cross-origin requests to the database
      
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {},
    options: function (req, res) {}
  }
};

models();

