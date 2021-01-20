const express = require("express");
const router = express.Router();
const blogRoute = require("./blog.route");
const authRoute = require("./auth.route");

router.use("/", authRoute);
router.use("/blogs", blogRoute);

module.exports = router;
