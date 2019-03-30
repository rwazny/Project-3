const router = require("express").Router();
const mealRoutes = require("./meal");

// Book routes
router.use("/meal", mealRoutes);

module.exports = router;
