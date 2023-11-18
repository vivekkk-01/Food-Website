const User = require("../models/user");
const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postUser = async (req, res, next) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    error = new HttpError(error.array()[0].msg, 422);
    return next(error);
  }
  const { name, email, password, location } = req.body;

  const securedPass = await bcrypt.hash(password, 12);
  let user;
  try {
    user = new User({
      name,
      email,
      password: securedPass,
      location,
    });
    await user.save();
  } catch (err) {
    return next(err);
  }

  res.status(201).json({ message: "User created", user: user });
};

exports.loginUser = async (req, res, next) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    error = new HttpError(error.array()[0].msg, 422);
    return next(error);
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      const error = new HttpError(
        "User with that email address doesn't exists.",
        401
      );
      return next(error);
    }
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      const error = new HttpError("Enter a correct password!", 422);
      return next(error);
    }
    const data = {
      user: {
        id: user.id,
      },
    };

    const secret = process.env.JWT_SECRET;

    const authToken = jwt.sign(data, secret);
    return res.json({ message: "", authToken });
  } catch (err) {
    return next(err);
  }
};
