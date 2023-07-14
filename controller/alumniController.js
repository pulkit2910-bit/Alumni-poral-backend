const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

exports.getAlumni = catchAsyncError(async (req, res) => {
    const perPage = 10; // 50
    const pageNumber = req.query.page;
    const skipPages = perPage * (pageNumber-1);
    const users = await User.find({ role: 'alumni' }).sort({ name : "asc" }).limit(perPage).skip(skipPages);
    res.status(200).json(users);
})

// exports.getAllUsers = catchAsyncError(async (req, res, next) => {
//     const perPage = 10; // 50
//     const pageNumber = req.query.page;
//     const skipPages = perPage * (pageNumber-1);
//     const users = await User.find().sort({ name : "asc" }).limit(perPage).skip(skipPages);

//     res.status(200).json(users);
// })

exports.deleteUser = catchAsyncError(async (req, res) => {
    if (req.data.userID === req.params.userID) {
        await User.findByIdAndDelete(req.params.userID);
        res.status(200).json("User Deleted !");
    } else {
      res.status(403).json("You are not allowed to delete this user");
    }
})

// update education details
exports.updateEducation = catchAsyncError(async (req, res) => {
    const userID = req.data.userID;
    const updateFields = {
        education : req.body
    };

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const user = await User.findById(userID);
    res.status(200).json(user);
})

// update experience details
exports.updateExperience = catchAsyncError(async (req, res) => {
    const userID = req.data.userID;
    const currCompany = req.body.filter((exp) => exp.endDate === null);
    const updateFields = {
        experience : req.body
    };
    if (currCompany.length > 0) updateFields.company = currCompany[0].company;

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const user = await User.findById(userID);
    res.status(200).json(user);
})

// update achievements details
exports.updateAchievements = catchAsyncError(async (req, res) => {
    const userID = req.data.userID;
    const updateFields = {
        achievements : req.body
    };

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const user = await User.findById(userID);
    res.status(200).json(user);
})