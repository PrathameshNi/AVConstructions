const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

<<<<<<< HEAD
module.exports = cloudinary;
=======
module.exports = cloudinary;
>>>>>>> f845563bcd01cce836799a3a740f3aa45cb10b96
