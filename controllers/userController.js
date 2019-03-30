const db = require("../models");
const ObjectId = require("mongodb").ObjectID;
module.exports = {
  createUser: function(req, res) {
    console.log(req.body);
    db.User.create(req.body);
  },
  findUser: function(req, res) {
    db.User.findOne(req.body).then(dbData => res.json(dbData));
  },
  pushWorkOut: function(req, res) {
    db.User.findOneAndUpdate(
      { email: req.body.email },
      { $push: { workouts: ObjectId(req.body.id) } }
    );
  }
};
