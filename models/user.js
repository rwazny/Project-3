const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }],
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "WorkOut" }],
  topPanel: { type: String, default: "nutrition" },
  theme: { type: String },
  darkMode: { type: Boolean, default: true },
  xlFit: { type: Boolean, default: false },
  xlNut: { type: Boolean, default: false }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
