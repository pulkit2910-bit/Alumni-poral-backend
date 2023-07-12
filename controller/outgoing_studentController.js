const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

exports.getOutgoingStudents = catchAsyncError(async (req, res) => {
    const perPage = 10; // 50
    const pageNumber = req.query.page;
    const skipPages = perPage * (pageNumber-1);
    const users = await User.find({ role: 'outgoing_students' }).sort({ name : "asc" }).limit(perPage).skip(skipPages);
    res.status(200).json(users);
})

exports.updateJobOffers = catchAsyncError(async (req, res, next) => {
    const userID = req.data.userID;
    const user = await User.findById(userID);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }

    const updateFields = {
        student_job_offers : req.body
    }

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const updatedUser = await User.findById(userID);
    res.status(200).json(updatedUser);
});

exports.updateJobExperiences = catchAsyncError(async (req, res, next) => {
    const userID = req.data.userID;
    const user = await User.findById(userID);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }

    const updateFields = {
        student_job_experiences : req.body
    }

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const updatedUser = await User.findById(userID);
    res.status(200).json(updatedUser);
});

exports.updateCompetitiveExams = catchAsyncError(async (req, res, next) => {
    const userID = req.data.userID;
    const user = await User.findById(userID);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }

    const updateFields = {
        student_competitive_exams : req.body
    }

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const updatedUser = await User.findById(userID);
    res.status(200).json(updatedUser);
});

exports.updateHigherStudies = catchAsyncError(async (req, res, next) => {
    const userID = req.data.userID;
    const user = await User.findById(userID);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }

    const updateFields = {
        student_higher_studies : req.body
    }

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const updatedUser = await User.findById(userID);
    res.status(200).json(updatedUser);
});