// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');


// cloudinary.config({
//     cloud_name : process.env.CLOUD_NAME,
//     api_key : process.env.CLOUD_API_KEY,
//     api_secret : process.env.CLOUD_API_SECRET
// });

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'wanderlust_DEV',
//       allowerdFormats: ["png" , "jpg" , "jpeg"]
//     },
// });

// module.exports ={
//     cloudinary,
//     storage
// }


const multer  = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

module.exports = storage;