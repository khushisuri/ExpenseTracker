const jwt = require("jsonwebtoken");
const User = require("../models/User");
// middleware to make sure only authorized users have access
const protect = async (req, res, next) => {
    
    let token = req.headers.authorization?.split(" ")[1];
    
    if(!token){
       return res.status(401).json({message:"not authorized no token"})
    }

    try {
        //If valid, decoded will contain the payload (usually includes id, email, etc.)
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select("-password");
        next()
    } catch (error) {
        res.status(401).json({message:"not valid token"})
    }
};

module.exports = {protect}