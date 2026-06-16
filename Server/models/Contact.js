const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

  address: {
    type: String,
    default: "Mumbai, Maharashtra, India",
  },

  phone: {
    type: String,
    default: "+91 9876543210",
  },

  email: {
    type: String,
    default: "avconstruction@gmail.com",
  },

  description: {
    type: String,
    default:
      "Have questions about your construction project? Our team is ready to help you.",
  },

});

module.exports =
  mongoose.model(
    "Contact",
    contactSchema
  );