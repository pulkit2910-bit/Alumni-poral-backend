const { getOutgoingStudents } = require('../controller/outgoing_studentController');
const { verifyUser } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/', verifyUser, getOutgoingStudents)

module.exports = router;