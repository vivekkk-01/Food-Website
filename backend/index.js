const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

const usersRoute = require("./routes/user");
const foodRoute = require("./routes/foodData");
const HttpError = require("./models/http-error");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
  next();
});

app.use(usersRoute);
app.use(foodRoute);

app.use((err, req, res, next) => {
  if (err) {
    const error = new HttpError("Couldn't find this route.", 404);
    next(error);
  }
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({ message: err.message || "An unknown error occurred!" });
  next(err);
});

mongoose.connect(process.env.MONGO_URL, async () => {
  app.listen(process.env.PORT);
});
