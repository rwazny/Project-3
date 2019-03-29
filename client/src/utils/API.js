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

  saveWorkOut: function(data) {
    return axios.post("/api/savedworkouts", data);
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
