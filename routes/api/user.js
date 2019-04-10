const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/user/:email").get(userController.findUser);

router.route("/push").put(userController.pushWorkOut);

router.route("/user").post(userController.createUser);

router
  .route("/week/:week&:type&:name&:user")
  .get(userController.findWorkOutsByWeek);

router.route("/settings").put(userController.updateSettings);

router.route("/workouts/:id").get(userController.findUserWorkOuts);
module.exports = router;
