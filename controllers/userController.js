const db = require("../models");

module.exports = {
  createUser: function(req, res) {
    console.log(req.body);
    db.User.create(req.body);
  },
  findUser: function(req, res) {
    db.User.find();
  }
};
