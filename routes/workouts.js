const router = require("express").Router;
const workOutController = require("../controllers/workout/workOutController");

router
  .route("/")
  .get(workOutController.findAll)
  .post(workOutController.create);

router
  .route("/:id")
  .get(workOutController.findById)
  .put(workOutController.update)
  .delete(workOutController.remove);

module.exports = router;
