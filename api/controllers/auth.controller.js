const User = require("../models").User;
const shortId = require("shortId");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = async (req, res, next) => {
  try {
    // Check if email has been register
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "email has been registered" });
    }
    const { name, password, email } = req.body;
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/api/profile/${username}`;
    let newUser = new User({ name, password, email, profile, username });
    newUser.save();
    res.status(201).json({ success: true, message: `Sign up success` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email has been register or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email is not registered, please sign up",
      });
    }

    // Auth
    if (!user.authenticate(password)) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password does not match" });
    }

    // Generate token and send to client
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, role } = user;
    return res.json({
      success: true,
      token,
      user: { _id, username, name, email, role },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Successfully logged out" });
};

/**
 * @description Protect route
 */
exports.requireLogin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
});
