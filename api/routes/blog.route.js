const router = require("express").Router();
const blogController = require("../controllers").blogController;

router.route("/").get(blogController.getItem);

module.exports = router;
