const router = require('express').Router();
const { getUser, updateEducation, deleteUser, updateUser, updateExperience, updateContact, updateAchievements, getAllUsers } = require('../controller/userController');
const { verifyUser } = require("../middlewares/authMiddleware");

// get a user
router.get('/', verifyUser, getUser);

// get all users
router.get('/search', verifyUser, getAllUsers);

// delete user
router.delete('/delete/:userID', verifyUser, deleteUser);

// update basic user details
router.put('/edit-profile', verifyUser, updateUser);

// update education details
router.put('/edit-profile/education', verifyUser, updateEducation);

// update experience details
router.put('/edit-profile/experience', verifyUser, updateExperience);

// update contact details
router.put('/edit-profile/contact', verifyUser, updateContact);

// update contact details
router.put('/edit-profile/achievements', verifyUser, updateAchievements);

module.exports = router;