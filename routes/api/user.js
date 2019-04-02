const router = require("express").Router();
const userController = require("../../controllers/userController");

router
  .route("/")
  .get(userController.findUser)
  .post(userController.createUser)
  .put(userController.pushWorkOut);

router.route("/week/:week&:name&:user").get(userController.findWorkOutsByWeek);

router.route("/workouts/:id").get(userController.findUserWorkOuts);
module.exports = router;
