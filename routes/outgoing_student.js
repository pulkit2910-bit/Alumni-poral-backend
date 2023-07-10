const { getOutgoingStudents, uploadPlacementDetails, updatePlacementDetails, deletePlacementDetails } = require('../controller/outgoing_studentController');
const { verifyUser } = require('../middlewares/authMiddleware');
const { fileUpload } = require('../middlewares/multer');

const router = require('express').Router();

// GET request to get all outgoing Stduents
router.get('/', verifyUser, getOutgoingStudents);

// POST request to upload placement docs
router.post("/placement_details/upload", verifyUser, fileUpload, uploadPlacementDetails);

// PUT request to update placement docs
router.put("/placement_details/edit/:placementID", verifyUser, fileUpload, updatePlacementDetails);

// DELETE request to update placement info
router.delete("/placement_details/delete/:placementID", verifyUser, deletePlacementDetails);

module.exports = router;