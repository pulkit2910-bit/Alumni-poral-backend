const multer = require('multer'); 

const storage = multer.memoryStorage();

const singleUpload = multer({storage}).single("profile-pic");

const postUpload = multer({storage}).single("post");

const fileUpload= multer({storage}).single("achievemnt-file");

// const placementDetails = multer({storage}).single("placement-file");

module.exports = { singleUpload, postUpload, fileUpload };