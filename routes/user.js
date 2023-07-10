const User = require("../models/User");
const router = require('express').Router();
const { verifyUser } = require('../middlewares/authMiddleware');
const catchAsyncError = require('../middlewares/catchAsyncError');

router.get('/', verifyUser, catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.query.userID);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json(user);
}))

module.exports = router;