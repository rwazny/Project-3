const router = require("express").Router();
const workOutController = require("../controllers/workout/workOutController");
const userController = require("../controllers/userController");

//gets user
router
  .route("/api/users")
  .get(userController.findUser)
  .post(userController.createUser)
  .put(userController.pushWorkOut);
//gets all workouts, used for finding individual exercises
router
  .route("/api/workouts")
  .get(workOutController.findAllWorkOuts)
  .post(workOutController.addExercise);

//gets presaved workouts
router
  .route("/api/savedworkouts")
  .get(workOutController.findSavedWorkOuts)
  .post(workOutController.saveWorkOut);

// router
//   .route("/api/workouts/:id")
//   .get(workOutController.findById)
//   .put(workOutController.update)
//   .delete(workOutController.remove);

module.exports = router;
