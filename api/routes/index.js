const express = require("express");
const router = express.Router();
const blogRoute = require("./post.route");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");

router.use("/", authRoute);
router.use("/posts", blogRoute);
router.use("/profile", userRoute);

module.exports = router;
