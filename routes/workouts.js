const router = require("express").Router();
const workOutController = require("../controllers/workout/workOutController");

router.route("/api/workouts").get(workOutController.findAll);
// .post(workOutController.create);

// router
//   .route("/api/workouts/:id")
//   .get(workOutController.findById)
//   .put(workOutController.update)
//   .delete(workOutController.remove);

module.exports = router;
