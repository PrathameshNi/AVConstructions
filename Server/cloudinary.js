const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


module.exports = cloudinary;
<<<<<<< HEAD
=======

>>>>>>> e1f93cf3f43ef12e365ca378131b441f4ebaa2af
module.exports = cloudinary;

