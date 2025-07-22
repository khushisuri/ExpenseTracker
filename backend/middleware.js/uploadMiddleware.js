//  multer package, which is used to handle multipart/form-data (primarily for file uploads).
const multer = require("multer");

// Storage Configuration
const storage = multer.diskStorage({

  //  Multer internally passes the cb - callback
  //  function into these configuration functions to allow you to tell it to 
  //  save where/how to save the file or reject file.
  destination: (req, file, cb) => {
    //No error (null), save in uploads/ folder.
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});



const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("only .jpeg .jpg and .png formats are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = {upload};
