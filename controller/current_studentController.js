const User = require("../models/User");
const GPA = require("../models/GPA");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { getDataUri } = require("../utils/dataUri");
const cloudinary = require("cloudinary");

exports.getCurrStudents = catchAsyncError(async (req, res) => {
    const perPage = 10; // 50
    const pageNumber = req.query.page;
    const skipPages = perPage * (pageNumber-1);
    const users = await User.find({ role: 'current_student' }).sort({ name : "asc" }).limit(perPage).skip(skipPages);
    res.status(200).json(users);
})

exports.updateStudent = catchAsyncError(async (req, res) => {
    const userID = req.data.userID;

    const currUser = await User.findById(userID);
    const profilePicID = currUser.avatar.public_id;
    if (profilePicID) {
        await cloudinary.v2.uploader.destroy(profilePicID);
    }
    const updateFields = {};
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.email) updateFields.email = req.body.email;
    if (req.file) {
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloud = await cloudinary.v2.uploader.upload(fileUri.content);
        // console.log(cloud);
        updateFields.avatar = {
            public_id : cloud.public_id,
            url : cloud.secure_url
        }
    }

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const user = await User.findById(userID);
    res.status(200).json(user);
})

exports.updateAchievements = catchAsyncError(async (req, res, next) => {
    const userID = req.data.userID;
    const user = await User.findById(userID);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }

    const updateFields = {
        student_achievements : req.body
    }

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const updatedUser = await User.findById(userID);
    res.status(200).json(updatedUser);
});

exports.updateActivities = catchAsyncError(async (req, res, next) => {
    const userID = req.data.userID;
    const user = await User.findById(userID);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }

    const updateFields = {
        student_activities : req.body
    }

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const updatedUser = await User.findById(userID);
    res.status(200).json(updatedUser);
});

exports.updateProjects = catchAsyncError(async (req, res, next) => {
    const userID = req.data.userID;
    const user = await User.findById(userID);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }

    const updateFields = {
        student_projects : req.body
    }

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const updatedUser = await User.findById(userID);
    res.status(200).json(updatedUser);
});

exports.getGPA = catchAsyncError(async (req, res, next) => {
    const userID = req.data.userID;
    const currUser = await User.findById(userID);
    if (!currUser) {
        return next(new ErrorHandler("User does not exist", 404));
    }
    const rollNumber = currUser.rollNumber;

    const gpa = await GPA.find({ rollNumber : rollNumber });
    res.status(200).json(gpa);
})