import axios from "axios";

export default {
  //--------------------------------------------------
  //--------------------WORKOUTS----------------------
  //--------------------------------------------------

  // Gets all WorkOuts
  getAllWorkOuts: function() {
    return axios.get("/api/workouts");
  },
  getWorkOutById: function(id) {
    return axios.get("/api/workouts/find/" + id);
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

  //--------------------------------------------------
  //--------------------USER--------------------------
  //--------------------------------------------------

  createUser: function(data) {
    return axios.post("/api/users", data);
  },

  findUser: function(data) {
    return axios.get("/api/users", data);
  },

  findUserWorkOuts: function(id) {
    return axios.get("/api/users/workouts/" + id);
  },

  workOutByWeek: function(data) {
    return axios.get(
      `/api/users/week/${data.week}&${data.type}&${data.name}&${data.user}`
    );
  },

  //--------------------------------------------------
  //--------------------MEAL--------------------------
  //--------------------------------------------------
  // Saves meal to the database
  saveMeal: function(mealData) {
    return axios.post("/api/meals", mealData);
  },
  getMealNames: function(user) {
    return axios.get(`/api/meals/user/${user}`);
  },
  //Gets all Meal
  getMeal: function(id) {
    return axios.get("/api/meals/find/" + id);
  },
  getMealsByDate: function(date, user) {
    return axios.get(`/api/meals/${date}&${user}`);
  },
  saveWorkOut: function(data) {
    return axios.post("/api/workouts/savedworkouts", data);
  }
};
