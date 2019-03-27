const mongoose = require("mongoose");

const resistanceSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 1, max: 10000, trim: true },
  sets: { type: Number, required: true, min: 1, max: 10000, trim: true },
  reps: {
    type: [Number],
    required: function() {
      return 1 || this.sets;
    },
    min: 0,
    max: 10000,
    trim: true
  },
  weight: {
    type: [Number],
    required: true,
    required: function() {
      return 1 || this.sets;
    },
    min: 0,
    max: 10000,
    trim: true
  }
});

const Resistance = mongoose.model("Resistance", resistanceSchema);

module.exports = Resistance;
