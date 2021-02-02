const Post = require("../models").Post;
exports.getItem = async (req, res, next) => {
  console.log(req.user);
  res.send("ok");
};
exports.create = async (req, res, next) => {
  try {
    const { title, description, body } = req.body;
    const newPost = new Post({
      title,
      description,
      body,
      author: req.user.id,
    });
    newPost.save();
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error();
    next(error);
  }
};
