const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 30);

    const token = jwt.sign(
        { userID: `${user._id}`, isAdmin: `${user.isAdmin}` }, 
        process.env.JWT_ACCESS_KEY,
        { expiresIn: parseInt(exp.getTime() / 1000) } 
    );
    
    const options ={
        maxAge: 3600000, // 1 hr
        httpOnly: true
    };

    res.status(statusCode).cookie('token', token, options).json({
        user,
        token
    });
}

module.exports = { sendToken };