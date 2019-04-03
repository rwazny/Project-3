const db = require("../models");
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
      .then(data => res.json(data))
      .catch(err => console.log(err));
  },
  findUserWorkOuts: function(req, res) {
    db.User.findById({ _id: req.params.id })
      .populate("workouts")
      .then(data => res.json(data));
  },
  findWorkOutsByWeek: function(req, res) {
    let { week, name, user } = req.params;
    week = parseInt(week);
    console.log(req.params);
    db.WorkOut.aggregate([
      { $unwind: "$resistance" },
      {
        $match: {
          $and: [{ "resistance.name": name }, { week: week }, { user: user }]
        }
      }
    ]).then(workOutData => res.json(workOutData));
  }
};
