const router = require("express").Router();
const mealController = require("../../controllers/meal/mealController");

// "/api/meals/find/:id"
router.route("/find/:id").get(mealController.findById);

router.route("/user/:user").get(mealController.findMealNames);

// Matches with "/api/meals/:date"
router.route("/:date&:user").get(mealController.findByDate);

//

// Matches with "/api/meals"
router
  .route("/")
  .get(mealController.findAll)
  .post(mealController.create);

// Matches with "/api/meals/:id"

module.exports = router;
