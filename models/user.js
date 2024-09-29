const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todo = require("./event");

//!    schema creation or coloum
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true ,unique: true},
  password: {
    type: String,
    required: true,
  },
  todo: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
