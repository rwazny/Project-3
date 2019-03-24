const mongoose = require("mongoose");
const resistance = require("./resistance");
const cardio = require("./cardio");

const workOutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  resistance: [resistance],
  cardio: [cardio]
});

const WorkOut = mongoose.model("WorkOut", workOutSchema);

module.exports = WorkOut;
