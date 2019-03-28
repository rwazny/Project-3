const router = require("express").Router();
const nutritionController = require("../../controllers/nutrition/nutritionController")

router
  .route("/").get(nutritionController.findAllNutrition);
  //.post(nutritionController.create);

// router
//   .route("/:id")
//   .get(nutritionController.findById)
//   .put(nutritionController.update)
//   .delete(nutritionController.remove);
  

//module.exports = router;
