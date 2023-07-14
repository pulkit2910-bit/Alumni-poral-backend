const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { getDataUri } = require("../utils/dataUri");
const cloudinary = require("cloudinary");

// get a user
exports.getUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.query.userID);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json(user);
});

// get all students
exports.getAllStudents = catchAsyncError(async (req, res) => {
    const perPage = 10; // 50
    const pageNumber = req.query.page;
    const skipPages = perPage * (pageNumber-1);
    const users = await User.find({"$or" : [{ role : "current_student" }, { role : "outgoing_student" }]}).sort({ name : "asc" }).limit(perPage).skip(skipPages);
    res.status(200).json(users);
})

// update contact details
exports.updateContact = catchAsyncError(async (req, res) => {
    const userID = req.data.userID;
    const updateFields = {};
    
    if (req.body.email) updateFields.email = req.body.email;
    if (req.body.altEmail) updateFields.altEmail = req.body.altEmail;
    if (req.body.phoneNo) updateFields.phoneNo = req.body.phoneNo;
    if (req.body.altPhoneNo) updateFields.altPhoneNo = req.body.altPhoneNo;
    if (req.body.socialHandles) updateFields.socialHandles = req.body.socialHandles;

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const user = await User.findById(userID);
    res.status(200).json(user);
})

// update basic details
exports.updateUser = catchAsyncError(async (req, res) => {
    const userID = req.data.userID;

    const currUser = await User.findById(userID);
    const profilePicID = currUser.avatar.public_id
    if (profilePicID) {
        await cloudinary.v2.uploader.destroy(profilePicID);
    }

    const updateFields = {};
    
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.title) updateFields.title = req.body.title;
    if (req.body.location) updateFields.location = req.body.location;
    if (req.body.about) updateFields.about = req.body.about;
    if (req.body.skills) updateFields.skills = req.body.skills;
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