const router = require("express").Router();
const workOutController = require("../../controllers/workout/workOutController");

//gets all workouts, used for finding individual exercises
router
  .route("/")
  .get(workOutController.findAllWorkOuts)
  .post(workOutController.addExercise);

//gets presaved workouts
router
  .route("/savedworkouts")
  .get(workOutController.findSavedWorkOuts)
  .post(workOutController.saveWorkOut);

// router
//   .route("/api/workouts/:id")
//   .get(workOutController.findById)
//   .put(workOutController.update)
//   .delete(workOutController.remove);

module.exports = router;