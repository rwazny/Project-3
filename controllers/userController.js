const db = require("../models");
const ObjectId = require("mongodb").ObjectID;
module.exports = {
  createUser: function(req, res) {
    console.log(req.body);
    db.User.create(req.body).then(userData => res.json(userData));
  },
  findUser: function(req, res) {
    db.User.findOne(req.body).then(dbData => res.json(dbData));
  },
  pushWorkOut: function(req, res) {
    db.User.findByIdAndUpdate(req.body.userId, {
      $push: { workouts: req.body.id }
    })
      .then(yeet => console.log(yeet))
      .catch(err => console.log(err));
  },
  findUserWorkOuts: function(req, res) {
    db.User.findById({ _id: req.params.id })
      .populate("workouts")
      .then(data => res.json(data));
  }
};
