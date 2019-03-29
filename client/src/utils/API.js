import axios from "axios";

export default {
  // Gets all WorkOuts
  getAllWorkOuts: function() {
    return axios.get("/api/workouts");
  },
<<<<<<< HEAD
  // Gets all WorkOuts
  getSavedWorkOuts: function() {
    return axios.get("/api/savedworkouts");
  },
  //
  addExercise: function(data) {
    return axios.post("/api/workouts", data);
=======

  //Gets all Nutrition
  getNutrition: function(){
    return axios.get("/api/nutrition");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/workouts/" + id);
>>>>>>> Meal
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/workouts/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/workouts", bookData);
  }
};
