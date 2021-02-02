const User = require("../models/index").User;

exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error();
    next(error);
  }
};
