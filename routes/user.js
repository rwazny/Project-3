const router = require("express").Router();
const userController = require("../controllers/userController");

//gets all workouts, used for finding individual exercises
router
  .route("/api/users")
  .get(userController.findUser)
  .post(userController.createUser);

module.exports = router;
