const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const foodItemSchema = new Schema({
  name:{type:String, required: true, min: 1, max: 250, trim: true},
  calories:{type:Number, required: true, trim: true},
protein:{type:Number, required: true, trim: true},
carbohydrates:{type:Number, required: true, trim: true},
fats:{type:Number, required: true, trim: true}
});

const mealSchema = new Schema({
  date:{type: Date, default:Date.now},
  name:{type: String, min:1, max:250, trim: true},
  foodItem :{type: [foodItemSchema]}
})
const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;