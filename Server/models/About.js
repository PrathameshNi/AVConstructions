const mongoose = require("mongoose");

const aboutSchema =
  new mongoose.Schema({

    title: {
      type: String,
      default: "About Us",
    },

    description: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "10+",
    },

    projects: {
      type: String,
      default: "50+",
    },

    satisfaction: {
      type: String,
      default: "100%",
    },

    image: {
      type: String,
      default: "",
    },
  });

module.exports =
  mongoose.model(
    "About",
    aboutSchema
  );