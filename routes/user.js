const router = require('express').Router();
const { getUser, updateContact, updateUser } = require('../controller/userController');
const { verifyUser } = require('../middlewares/authMiddleware');
const { singleUpload } = require('../middlewares/multer');

// Get a user
router.get('/', verifyUser, getUser);

// update basic user details
router.put('/edit-profile/basic-details', verifyUser, singleUpload, updateUser);

// update contact details
router.put('/edit-profile/contact', verifyUser, updateContact);

module.exports = router;