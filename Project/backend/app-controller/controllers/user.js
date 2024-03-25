const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const jwtSecret = process.env.SECRET;
  const jwtData = {
    email: user.email,
    id: user._id,
  };
  return jwt.sign(jwtData, jwtSecret, { expiresIn: process.env.EXPIRE_TIME });
};

exports.getUser = async (req, res, next) => {
  const id = req.params;

  try {
    const user = await User.findById(id);

    if(user) {
      return res.status(200).json({ user: user });
    }
    else {
      return res.status(400).json({ errorMessage: "User doesn't exist" });
    }
  } 
  catch (error) {
    return res.status(500).json({ errorMessage: "Error finding user" });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if(users) {
      return res.status(200).json({ users: users });
    }
    else {
      return res.status(500).json({ errorMessage: "Users couldn't retrieved" });
    }
  }
  catch (error) {
    return res.status(500).json({ errorMessage: "Error finding users" });
  }
};

exports.updateUser = async (req, res, next) => {

};

exports.createUser = async (req, res, next) => {
  const { password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  };

  try {
    const user = await User.create(newUser);

    if(user) {
      return res.status(201).json({ message: "User succesfully created" });
    }
    else {
      return res.status(400).json({ errorMessage: "Creation failed" });
    }
  } 
  catch (error) {
    return res.status(500).json({ errorMessage: "Error creating user" });
  }
};

exports.deleteUser = (req, res, next) => {
  const id = req.params;

  try {
    const user = User.findByIdAndRemove(id);

    if(user) {
      return res.status(201).json({ message: "User succesfully deleted" });
    }
    else {
      return res.status(500).json({ errorMessage: "User doesn't exist" });
    }
  } 
  catch (error) {
    return res.status(500).json({ errorMessage: "Error deleting user" });    
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ errorMessage: "Internal server error" });
      }

      if (!result) {
        return res.status(400).json({ errorMessage: "Invalid email and password" });
      } 
      else {
        if (err) {
          return res.status(500).json({ errorMessage: "Session save error" });
        }
        const token = createToken(user);
        if (!token) {
          return res.status(500).json({ errorMessage: "Token couldn't created" });
        }
        return res.status(200).json({ token: token });
      }
    });
  } 
  catch (error) {
    return res.status(500).json({ errorMessage: "Error in login action" });    
  }
};
