const Alumni = require("../models/Alumni");
const bcrypt = require('bcryptjs');
const { sendToken } = require("../utils/sendToken")

exports.registerUser = async (req, res) => {
    const file = req.file;
    
    try {
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
                dob : req.body.dob,
                address : req.body.address,
                countryCode : req.body.countryCode,
                phoneNumber : req.body.phoneNumber,
            });
        }
        const user = await newUser.save();
        res.status(200).json(user);   
    } catch(err) {
        res.status(500).json(err);
    }
}

exports.loginUser = async (req, res) => {
    
}

exports.logoutUser = async (req, res) => {

}