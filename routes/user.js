const router = require('express').Router();
const { getUser, updateContact, updateUser, getAllStudents } = require('../controller/userController');
const { verifyUser } = require('../middlewares/authMiddleware');
const { singleUpload } = require('../middlewares/multer');

// Get a user
router.get('/', verifyUser, getUser);

// Get a user
router.get('/student/search', verifyUser, getAllStudents);

// update basic user details
router.put('/edit-profile/basic-details', verifyUser, singleUpload, updateUser);

// update contact details
router.put('/edit-profile/contact', verifyUser, updateContact);

module.exports = router;