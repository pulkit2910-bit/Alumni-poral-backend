const { getCurrStudents, getGPA, updateStudent, updateAchievements, updateActivities, updateProjects,  } = require('../controller/current_studentController');
const { verifyUser } = require('../middlewares/authMiddleware');
const { singleUpload, fileUpload } = require('../middlewares/multer');

const router = require('express').Router();

// GET request to get all current Stduents
router.get("/", verifyUser, getCurrStudents);

// GET request to get gpa of current user student 
router.get("/gpa", verifyUser, getGPA);

// PUT request to update profile and upload docs
router.put("/edit-profile", verifyUser, singleUpload, updateStudent);

// PUT request to update achievement docs
router.put("/achievement/edit", verifyUser, updateAchievements);

// PUT request to update activity docs
router.put("/activity/edit", verifyUser, updateActivities);

// PUT request to update project docs
router.put("/project/edit", verifyUser, updateProjects);

module.exports = router;