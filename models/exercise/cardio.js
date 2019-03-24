const mongoose = require("mongoose");

const cardioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  distance: { type: Number, required: true },
  time: { type: Number, required: true }
});

const Cardio = mongoose.model("Cardio", cardioSchema);

module.exports = Cardio;
