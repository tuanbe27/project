const router = require("express").Router();
const blogController = require("../controllers").blogController;
const { requireLogin } = require("../controllers").authController;

router
  .route("/")
  .get(requireLogin, blogController.getItem)
  .post(requireLogin, blogController.create);

module.exports = router;
