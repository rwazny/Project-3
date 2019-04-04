const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  meals: [{type: mongoose.Schema.Types.ObjectId, ref: "Meal"}],
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "WorkOut" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
