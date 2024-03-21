// // 
// import multer from 'multer'
// const path = require('path');

// // Set storage engine for Multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // cb(null, 'uploads/'); // Destination directory for uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
//   }
// });

// // Initialize Multer middleware
//  export const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 }, // Limit file size to 1MB (adjust as needed)
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   }
// }).single('PhotoURL'); // Assuming 'PhotoURL' is the field name for file upload

// // Check file type
// function checkFileType(file, cb) {
//   // Allowed file extensions
//   const filetypes = /jpeg|jpg|png|gif/;
//   // Check the extension
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check the MIME type
//   const mimetype = filetypes.test(file.mimetype);
//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb('Error: Images only!'); // Error message for invalid file type
//   }
// }

// module.exports = upload;
