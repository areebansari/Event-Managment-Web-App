var mongoose = require("mongoose");

var venuesSchema = new mongoose.Schema({
   name: {type: String, required: true},
   image: String,
   price: String,
   description: String,
   location: String,
   capacity: String,
   category: String,
   contactno: String,
   cateringAvailable: String,
   decorationAvailable: String,
   createdAt: { type: Date, default: Date.now },
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "user"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "comment"
      }
   ]
});

module.exports = mongoose.model("venues", venuesSchema);
