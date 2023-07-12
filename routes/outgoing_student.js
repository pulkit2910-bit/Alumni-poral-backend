const { getOutgoingStudents, updateJobOffers, updateJobExperiences, updateCompetitiveExams, updateHigherStudies } = require('../controller/outgoing_studentController');
const { verifyUser } = require('../middlewares/authMiddleware');

const router = require('express').Router();

// GET request to get all outgoing Stduents
router.get('/', verifyUser, getOutgoingStudents);

// PUT request to update job offers
router.put("/job-offers/edit", verifyUser, updateJobOffers);

// PUT request to update job offers
router.put("/job-experiences/edit", verifyUser, updateJobExperiences);

// PUT request to update job offers
router.put("/competitive-exams/edit", verifyUser, updateCompetitiveExams);

// PUT request to update job offers
router.put("/higher-studies/edit", verifyUser, updateHigherStudies);

module.exports = router;