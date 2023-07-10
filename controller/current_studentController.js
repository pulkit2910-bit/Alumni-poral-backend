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

exports.uploadAchievement = catchAsyncError(async (req,res,next) => {
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

    await User.updateOne({ _id : userID }, {$push : { student_achievements : uploadFields }});
    const updatedUser = await User.findById(userID);
    res.status(200).json(updatedUser);
})

exports.updateAchievement = catchAsyncError(async (req, res, next) => {
    const userID = req.data.userID;
    const achievementID = req.params.achievementID;
    const user = await User.findById(userID);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }

    const achievement_index = user.student_achievements.findIndex(obj => obj._id.toString() === achievementID);
    if (achievement_index === -1) {
        return next(new ErrorHandler("Achievement does not exist", 404));
    }

    if (req.body.title) user.student_achievements[achievement_index].title = req.body.title;
    if (req.body.desc) user.student_achievements[achievement_index].desc = req.body.desc;
    if (req.file) {
        const file_public_id = user.student_achievements[achievement_index].public_id;
        if (file_public_id) {
            await cloudinary.v2.uploader.destroy(file_public_id);
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloud = await cloudinary.v2.uploader.upload(fileUri.content);
        // console.log(cloud);
        user.student_achievements[achievement_index].public_id = cloud.public_id;
        user.student_achievements[achievement_index].url = cloud.secure_url;
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
});

exports.deleteAchievement = catchAsyncError(async (req, res, next) => {
    const userID = req.data.userID;
    const achievementID = req.params.achievementID;
    const user = await User.findById(userID);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }
    const reqAchievement = user.student_achievements.find(({ _id }) => _id === achievementID);
    if (!reqAchievement) {
        return next(new ErrorHandler("Achievement does not exist", 404));
    }
    
    await User.updateOne({ _id : userID }, {$pull : { student_achievements : { _id : achievementID } }});
    const updatedUser = await User.findById(userID);
    res.status(200).json(updatedUser);
})

exports.uploadActivity = catchAsyncError(async (req,res,next) => {
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

    await User.updateOne({ _id : userID }, {$push : { student_activities : uploadFields }});
    const updatedUser = await User.findById(userID);
    res.status(200).json(updatedUser);
})

exports.updateActivity = catchAsyncError(async (req, res, next) => {
    const userID = req.data.userID;
    const activityID = req.params.activityID;
    const user = await User.findById(userID);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }

    const activity_index = user.student_activities.findIndex(obj => obj._id.toString() === activityID);
    if (activity_index === -1) {
        return next(new ErrorHandler("Activity does not exist", 404));
    }

    if (req.body.title) user.student_activities[activity_index].title = req.body.title;
    if (req.body.desc) user.student_activities[activity_index].desc = req.body.desc;
    if (req.file) {
        const file_public_id = user.student_activities[activity_index].public_id;
        if (file_public_id) {
            await cloudinary.v2.uploader.destroy(file_public_id);
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloud = await cloudinary.v2.uploader.upload(fileUri.content);
        // console.log(cloud);
        user.student_activities[activity_index].public_id = cloud.public_id;
        user.student_activities[activity_index].url = cloud.secure_url;
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
});

exports.deleteActivity = catchAsyncError(async (req, res, next) => {
    const userID = req.data.userID;
    const activityID = req.params.activityID;
    const user = await User.findById(userID);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }
    const reqActivity = user.student_activities.find(({ _id }) => _id === activityID);
    if (!reqActivity) {
        return next(new ErrorHandler("Activity does not exist", 404));
    }
    
    await User.updateOne({ _id : userID }, {$pull : { student_activities : { _id : activityID } }});
    const updatedUser = await User.findById(userID);
    res.status(200).json(updatedUser);
})

exports.uploadProject = catchAsyncError(async (req,res,next) => {
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

    await User.updateOne({ _id : userID }, {$push : { student_projects : uploadFields }});
    const updatedUser = await User.findById(userID);
    res.status(200).json(updatedUser);
})

exports.updateProject = catchAsyncError(async (req, res, next) => {
    const userID = req.data.userID;
    const projectID = req.params.projectID;
    const user = await User.findById(userID);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }

    const project_index = user.student_projects.findIndex(obj => obj._id.toString() === projectID);
    if (project_index === -1) {
        return next(new ErrorHandler("Project does not exist", 404));
    }

    if (req.body.title) user.student_projects[projectID].title = req.body.title;
    if (req.body.desc) user.student_projects[projectID].desc = req.body.desc;
    if (req.file) {
        const file_public_id = user.student_projects[projectID].public_id;
        if (file_public_id) {
            await cloudinary.v2.uploader.destroy(file_public_id);
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloud = await cloudinary.v2.uploader.upload(fileUri.content);
        // console.log(cloud);
        user.student_projects[projectID].public_id = cloud.public_id;
        user.student_projects[projectID].url = cloud.secure_url;
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
});

exports.deleteProject = catchAsyncError(async (req, res, next) => {
    const userID = req.data.userID;
    const projectID = req.params.projectID;
    const user = await User.findById(userID);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }
    const reqActivity = user.student_projects.find(({ _id }) => _id === projectID);
    if (!reqActivity) {
        return next(new ErrorHandler("Project does not exist", 404));
    }
    
    await User.updateOne({ _id : userID }, {$pull : { student_projects : { _id : projectID } }});
    const updatedUser = await User.findById(userID);
    res.status(200).json(updatedUser);
})

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