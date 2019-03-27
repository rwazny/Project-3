const db = require("../../models/exercise/workout");

module.exports = {
  findAll: function(req, res) {
    db.find({})
      .sort({ date: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
