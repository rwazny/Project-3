import axios from "axios";

export default {
  // Gets all WorkOuts
  getAllWorkOuts: function() {
    return axios.get("/api/workouts");
  },
  // Gets all WorkOuts
  getSavedWorkOuts: function() {
    return axios.get("/api/savedworkouts");
  },
  //
  addExercise: function(data) {
    return axios.post("/api/workouts", data);
  },
  //Gets all Meal
  getMeal: function() {
    return axios.get("/api/meals");
  },

  saveWorkOut: function(data) {
    return axios.post("/api/savedworkouts", data);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/workouts/" + id);
  },
  // Saves meal to the database
  saveMeal: function(mealData) {
    console.log("inside API saveMeal");
    return axios.post("/api/meals", mealData);
  }
};
