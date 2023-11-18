const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userControllers = require("../controllers/user");

router.post(
  "/create-user",
  [
    body("name").not().isEmpty().withMessage("Please enter your name!"),
    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Please enter a valid email address!"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password should atleast be 8 characters long!"),
    body("location")
      .not()
      .isEmpty()
      .withMessage("Please enter your current location!"),
  ],
  userControllers.postUser
);

router.post("/login", [
  body("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should atleast be 8 characters long"),
  userControllers.loginUser,
]);

module.exports = router;
