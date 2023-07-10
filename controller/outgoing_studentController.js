const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { getDataUri } = require("../utils/dataUri");
const cloudinary = require("cloudinary");

exports.getOutgoingStudents = catchAsyncError(async (req, res) => {
    const perPage = 10; // 50
    const pageNumber = req.query.page;
    const skipPages = perPage * (pageNumber-1);
    const users = await User.find({ role: 'outgoing_students' }).sort({ name : "asc" }).limit(perPage).skip(skipPages);
    res.status(200).json(users);
})

// exports.uploadPlacementDocs = catchAsyncError(async (req, res) => {

// })