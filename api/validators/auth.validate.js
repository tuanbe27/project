const { check } = require("express-validator");

/**
 * @description validate data from sending request to sign up
 */
exports.userSignupValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Enter your email  correctly"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be contain 6 characters or more"),
];

/**
 * @description validate data from sending request to sign in
 */
exports.userLoginValidator = [
  check("email").isEmail().withMessage("Enter your email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be contain 6 characters or more"),
];
