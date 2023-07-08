const { getCurrStudents } = require('../controller/current_studentController');
const { verifyUser } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get("/", verifyUser, getCurrStudents)

module.exports = router;