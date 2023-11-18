const express = require("express");
const router = express();

const foodDataControllers = require("../controllers/foodData");

router.get("/food-data", foodDataControllers.getFood);
module.exports = router;
