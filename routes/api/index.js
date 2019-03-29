const router = require("express").Router();
const nutritionRoutes = require("./nutrition");

router.use("/nutrition", nutritionRoutes);

module.exports = router;
