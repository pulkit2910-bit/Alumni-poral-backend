const multer = require('multer'); 

const storage = multer.memoryStorage();

const singleUpload = multer({storage}).single("profile-pic");

const postUpload = multer({storage}).single("post");

const fileUpload= multer({storage}).single("file");

const update_files_upload = multer({storage}).any();

module.exports = { singleUpload, postUpload, fileUpload, update_files_upload };