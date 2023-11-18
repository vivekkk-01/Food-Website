const mongoose = require("mongoose");

exports.getFood = async (req, res, next) => {
  const foodItems = await mongoose.connection.db.collection("food_items");

  foodItems.find({}).toArray(async (err, data) => {
    const foodCategory = await mongoose.connection.db.collection(
      "food_category"
    );
    foodCategory.find().toArray((err, catData) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ data, catData });
      }
    });
  });
};
