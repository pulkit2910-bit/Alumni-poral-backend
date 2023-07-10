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

exports.uploadPlacementDetails = catchAsyncError(async (req,res,next) => {
    const userID = req.data.userID;
    const user = await User.findById(userID);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }

    const uploadFields = {};
    if (req.body.title) uploadFields.title = req.body.title;
    if (req.body.desc) uploadFields.desc = req.body.desc;
    if (req.file) {
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloud = await cloudinary.v2.uploader.upload(fileUri.content);
        // console.log(cloud);
        uploadFields.public_id = cloud.public_id;
        uploadFields.url = cloud.secure_url;
    }

    await User.updateOne({ _id : userID }, {$push : { placement_details : uploadFields }});
    const updatedUser = await User.findById(userID);
    res.status(200).json(updatedUser);
})

exports.updatePlacementDetails = catchAsyncError(async (req, res, next) => {
    const userID = req.data.userID;
    const placementID = req.params.placementID;
    const user = await User.findById(userID);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }

    const placement_index = user.placement_details.findIndex(obj => obj._id.toString() === placementID);
    if (placement_index === -1) {
        return next(new ErrorHandler("Placement Detail does not exist", 404));
    }

    if (req.body.title) user.placement_details[placement_index].title = req.body.title;
    if (req.body.desc) user.placement_details[placement_index].desc = req.body.desc;
    if (req.file) {
        const file_public_id = user.placement_details[placement_index].public_id;
        if (file_public_id) {
            await cloudinary.v2.uploader.destroy(file_public_id);
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloud = await cloudinary.v2.uploader.upload(fileUri.content);
        // console.log(cloud);
        user.placement_details[placement_index].public_id = cloud.public_id;
        user.placement_details[placement_index].url = cloud.secure_url;
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
});

exports.deletePlacementDetails = catchAsyncError(async (req, res, next) => {
    const userID = req.data.userID;
    const placementID = req.params.placementID;
    const user = await User.findById(userID);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }
    const reqPlacementDetail = user.placement_details.find(({ _id }) => _id === placementID);
    if (!reqPlacementDetail) {
        return next(new ErrorHandler("Placement Detail does not exist", 404));
    }
    
    await User.updateOne({ _id : userID }, {$pull : { placement_details : { _id : placementID } }});
    const updatedUser = await User.findById(userID);
    res.status(200).json(updatedUser);
})