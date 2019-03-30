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
  //Gets all Nutrition
  getNutrition: function() {
    return axios.get("/api/nutrition");
  },

  saveWorkOut: function(data) {
    return axios.post("/api/savedworkouts", data);
  },

  //--------------------USER--------------------------

  createUser: function(data) {
    console.log(`hey qt 3.14`);
    return axios.post("/api/users", data);
  },

  findUser: function(data) {
    return axios.get("/api/users");
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
