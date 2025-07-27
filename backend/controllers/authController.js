const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Feilds cannot be empty" });
  }
  try {
    const userVal = await User.findOne({ email });
    if (!userVal || !(await userVal.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      id: userVal._id,
      user: userVal,
      token: generateToken(userVal._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging user",err:error.message });
  }
};

const registerUser = async (req, res) => {
  
  const { fullname, email, password, profileImageUrl } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "Feilds cannot be empty" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      fullname,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user: user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user",err:error.message });
  }
};

const getUserInfo = async (req, res) => {
  // The reason you have access to req.user.id inside getUserInfo 
  // is because of the authentication middleware you defined earlier 
  try {
    const user = await User.findById(req.user.id).select("-password")
    if(!user){
     return res.status(404).json({message:"not found"})
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: "Error user invalid" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUserInfo,
};
