const Alumni = require("../models/Alumni");
const bcrypt = require('bcryptjs');
const { sendToken } = require("../utils/sendToken")
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

exports.registerUser = catchAsyncError(async (req, res, next) => {    
    const findUser = await Alumni.findOne({ email : req.body.email });
    if (findUser) { 
        return next(new ErrorHandler("User already exists", 409));
    }

    let degree = "", batch="20";
    [...rollNumber].forEach(e => {
        if (e >= 'A' && e <= 'Z') degree += e;
    });
    batch += rollNumber.slice(-2);

    console.log(degree + " " + batch);

    const file = req.file;
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    
    var newUser;
    if (file) {
        // add cloudinary and multer
    } else {
        newUser = await new Alumni({
            name : req.body.name,
            email: req.body.email,
            password : hashPassword,
            rollNumber : req.body.rollNumber,
            degree : degree,
            batch : batch,
            dob : req.body.dob,
            address : req.body.address,
            phoneNumber : req.body.phoneNumber,
        });
    }
    const user = await newUser.save();
    sendToken(user, 200, res); 
})

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    // Find user in MongoDB
    const user = await Alumni.findOne({email : email});
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    // Validate Password
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
        return next(new ErrorHandler("Incorrect Password", 400));
    }
    
    sendToken(user, 200, res);
})

exports.logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json('User has been logged out !');
}