import axios from "axios";

export default {
  // Gets all WorkOuts
  getWorkOuts: function() {
    return axios.get("/api/workouts");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/workouts/" + id);
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
