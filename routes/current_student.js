const { getCurrStudents, getGPA, updateStudent, updateAchievement, uploadAchievement, deleteAchievement, uploadActivity, updateActivity, deleteActivity, uploadProject, updateProject } = require('../controller/current_studentController');
const { verifyUser } = require('../middlewares/authMiddleware');
const { singleUpload, fileUpload } = require('../middlewares/multer');

const router = require('express').Router();

// GET request to get all current Stduents
router.get("/", verifyUser, getCurrStudents);

// GET request to get gpa of current user student 
router.get("/gpa", verifyUser, getGPA);

// PUT request to update profile and upload docs
router.put("/edit-profile", verifyUser, singleUpload, updateStudent);

// POST request to upload achievement docs
router.post("/achievement/upload", verifyUser, fileUpload, uploadAchievement);

// PUT request to update achievement docs
router.put("/achievement/edit/:achievementID", verifyUser, fileUpload, updateAchievement);

// DELETE request to update achievement info
router.delete("/achievement/delete/:achievementID", verifyUser, deleteAchievement);

// POST request to upload activity docs
router.post("/activity/upload", verifyUser, fileUpload, uploadActivity);

// PUT request to update activity docs
router.put("/activity/edit/:activityID", verifyUser, fileUpload, updateActivity);

// DELETE request to update activity info
router.delete("/activity/delete/:activityID", verifyUser, deleteActivity);

// POST request to upload project docs
router.post("/project/upload", verifyUser, fileUpload, uploadProject);

// PUT request to update project docs
router.put("/project/edit/:projectID", verifyUser, fileUpload, updateProject);

// DELETE request to update project info
router.delete("/project/delete/:projectID", verifyUser, deleteActivity);

module.exports = router;