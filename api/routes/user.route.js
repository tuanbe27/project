const router = require("express").Router();
const userController = require("../controllers").userController;
const { requireLogin } = require("../controllers").authController;

router
  .route("/")
  .get(requireLogin, userController.getUserInfo)

module.exports = router;
