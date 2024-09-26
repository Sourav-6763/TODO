const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//!    schema creation or coloum
const todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdate: {
    type: "String",
    required: true,
  },
});

const Event = mongoose.model("Event", todoSchema);

module.exports = Event;
