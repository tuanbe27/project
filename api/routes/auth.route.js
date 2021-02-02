const router = require("express").Router();
const {
  login,
  signup,
  logout,
  requireLogin,
} = require("../controllers").authController;
const {
  userSignupValidator,
  userLoginValidator,
} = require("../validators").auth;
const { runValidation } = require("../validators").validResult;

router.route("/signup").post(userSignupValidator, runValidation, signup);
router.route("/login").post(userLoginValidator, runValidation, login);
router.route("/logout").get(logout);
router.route("/test").get(requireLogin, (req, res) => {
  res.json(" login");
});
module.exports = router;
