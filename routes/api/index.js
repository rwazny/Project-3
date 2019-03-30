const router = require("express").Router();
const mealRoutes = require("./meal");
const workouts = require("./workouts");
const user = require("./user");

// Book routes
router.use("/meals", mealRoutes);
router.use("/users", user);
router.use("/workouts", workouts);

module.exports = router;
