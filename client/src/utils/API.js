import axios from "axios";

export default {
  // Gets all WorkOuts
  getAllWorkOuts: function() {
    return axios.get("/api/workouts");
  },
  // Gets all WorkOuts
  getSavedWorkOuts: function() {
    return axios.get("/api/workouts/saved");
  },
  getWorkOutsByDate: function(date) {
    return axios.get("/api/workouts/" + date);
  },
  //Push workout to User object
  pushWorkOut: function(data) {
    return axios.put("/api/users", data);
  },
  //add single exercise
  addExercise: function(data) {
    return axios.post("/api/workouts", data);
  },
  //Gets all Meal
  getMeal: function() {
    return axios.get("/api/meals");
  },

  saveWorkOut: function(data) {
    return axios.post("/api/workouts/savedworkouts", data);
  },

  //--------------------USER--------------------------

  createUser: function(data) {
    return axios.post("/api/users", data);
  },

  findUser: function(data) {
    return axios.get("/api/users", data);
  },

  findUserWorkOuts: function(id) {
    return axios.get("/api/users/workouts/" + id);
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
