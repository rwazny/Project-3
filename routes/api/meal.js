const router = require("express").Router();
const mealController = require("../../controllers/meal/mealController");

// Matches with "/api/meals/:date"
router.route("/:date&:user").get(mealController.findByDate);

// Matches with "/api/meals"
router
  .route("/")
  .get(mealController.findAll)
  .post(mealController.create);

// Matches with "/api/meals/:id"
router
  .route("/:id")
  .get(mealController.findById)
  .put(mealController.update)
  .delete(mealController.remove);

module.exports = router;
