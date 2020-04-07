var mongoose = require("mongoose");

var decorationsSchema = new mongoose.Schema({
   name: {type: String, required: true},
   image: String,
   description: String,
   location: String,
   price: String,
   contactno: String,
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

module.exports = mongoose.model("decorations", decorationsSchema);