// ~~~Worry about breaking into seperate file later~~~
const mongoose = require(`mongoose`);

//Required portion for reps schema does not work
const resistanceSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 1, max: 250 },
  sets: { type: Number, required: true, min: 1, max: 250 },
  reps: {
    type: [Number],
    required: function() {
      return 1 || this.sets;
    },
    min: 1,
    max: 250
  },
  weight: {
    type: [Number],
    required: true,
    required: function() {
      return 1 || this.sets;
    },
    min: 1,
    max: 250
  }
});

const cardioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  distance: {
    type: Number,
    required: function() {
      return !this.time; //only required if there is no time
    },
    min: 1,
    max: 250
  },
  time: {
    type: Number,
    required: function() {
      return !this.distance; //only required if there is no distance
    },
    min: 1,
    max: 250
  }
});

const workOutSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  name: { type: String, unique: true, min: 1, max: 250 },
  resistance: {
    type: [resistanceSchema],
    required: function() {
      return !this.cardio;
    }
  },
  cardio: {
    type: [cardioSchema],
    required: function() {
      return !this.resistance;
    }
  }
});

const WorkOut = mongoose.model("WorkOut", workOutSchema);
module.exports = WorkOut;
