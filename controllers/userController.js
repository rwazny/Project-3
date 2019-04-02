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
      .then(yeet => console.log(yeet))
      .catch(err => console.log(err));
  },
  findUserWorkOuts: function(req, res) {
    db.User.findById({ _id: req.params.id })
      .populate("workouts")
      .then(data => res.json(data));
  },
  findWorkOutsByWeek: function(req, res) {
    const { date, name } = req.params;
    console.log(req.params)
    db.WorkOut.aggregate([
      { $unwind: "$resistance" },
      { $match: { "resistance.name": name } },
      {$group: {date: {$week: new Date(date)}}}     
    ]).then(workOutData => res.json(workOutData));
  },
};
