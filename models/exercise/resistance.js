const mongoose = require("mongoose");

const resistanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true }
});

const Resistance = mongoose.model("Resistance", resistanceSchema);

module.exports = Resistance;
