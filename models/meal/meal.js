const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 250,
    trim: true
  },
  calories: { type: Number, required: true, trim: true },
  protein: { type: Number, required: true, trim: true },
  carbohydrates: { type: Number, required: true, trim: true },
  fats: { type: Number, required: true, trim: true },
  servingUnit: { type: String, required: true, trim: true },
  servingQty: { type: Number, required: true, trim: true, max: 100 }
});
const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 250,
    trim: true
  },
  foodItem: { type: [foodItemSchema] }
});
const nutritionSchema = new mongoose.Schema({
  date: { type: String },
  week: { type: Number },
  user: { type: String },
  name: { type: String, min: 1, max: 250, trim: true },
  meal: { type: [mealSchema] }
});

const Nutrition = mongoose.model("Nutrition", nutritionSchema);
module.exports = Nutrition;
