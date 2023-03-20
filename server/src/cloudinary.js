//Getting started DOCS: https://cloudinary.com/documentation/how_to_integrate_cloudinary
//Node.js SDK: https://cloudinary.com/documentation/node_integration

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = { cloudinary };

// Parameter names: snake_case.
// Classes: PascalCase.
// Methods: snake_case.
// Pass parameter data as: Object