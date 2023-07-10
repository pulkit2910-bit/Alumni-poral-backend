const router = require('express').Router();
const { getUser, updateEducation, deleteUser, updateUser, updateExperience, updateContact, updateAchievements, getAllUsers, getAlumni } = require('../controller/alumniController');
const { verifyUser } = require("../middlewares/authMiddleware");
const { singleUpload } = require("../middlewares/multer");

// get all alumnis
router.get('/', verifyUser, getAlumni);

// get all users
router.get('/search', verifyUser, getAlumni);

// delete user
router.delete('/delete/:userID', verifyUser, deleteUser);

// update basic user details
router.put('/edit-profile', verifyUser, singleUpload, updateUser);

// update education details
router.put('/edit-profile/education', verifyUser, updateEducation);

// update experience details
router.put('/edit-profile/experience', verifyUser, updateExperience);

// update contact details
router.put('/edit-profile/contact', verifyUser, updateContact);

// update contact details
router.put('/edit-profile/achievements', verifyUser, updateAchievements);

module.exports = router;