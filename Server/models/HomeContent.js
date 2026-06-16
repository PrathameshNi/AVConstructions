const mongoose = require("mongoose");

const homeContentSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Welcome to Zore Constructions"
  },

  subtitle: {
    type: String,
    default: "We build your dream projects 🚧"
  },

  motive: {
    type: String,
    default:
      "Our mission is to deliver high-quality construction solutions."
  },

  image: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model(
  "HomeContent",
  homeContentSchema
);