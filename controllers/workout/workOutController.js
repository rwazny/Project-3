const db = require("../../models");

module.exports = {
  findSavedWorkOuts: function(req, res) {
    db.find({ name: { $ne: null } })
      .sort({ name: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findAllWorkOuts: function(req, res) {
    db.WorkOut.find({})
      .sort({ date: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  addExercise: function(req, res) {
    console.log(req.body);
    db.WorkOut.create(req.body);
  },

  saveWorkOut: function(req, res) {
    console.log(req.body);
    db.WorkOut.create(req.body)
      .then(dbData => {
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
      });
  }
  // deleteWorkOut: function(req, res) {
  //   db.findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
