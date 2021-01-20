const router = require("express").Router();
const {
  login,
  signup,
  logout,
  requireLogin,
} = require("../controllers").authController;
const { userSignupValidator, runValidation } = require("../validators").auth;

router.route("/signup").post(userSignupValidator, runValidation, signup);
router.route("/login").post(userSignupValidator, runValidation, login);
router.route("/logout").get(logout);
router.route("/secret").get(requireLogin, (req, res) => {
  res.json(" login");
});
module.exports = router;
