const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const { token } = req.cookies;
    !token && res.status(401).json("User not authenticated !");
    
    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, payload) => {
        if (err) {
            return res.status(403).json('Invalid Token');
        } 
        else {
            req.data = payload;
            next();
        } 
    })
}

module.exports = { verifyUser };    