const { check, validationResult } = require("express-validator");

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
exports.userSignupValidator = [
  check("email").isEmail().withMessage("Enter your email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be contain 6 characters or more"),
];

/**
 * @description handle the error if error occurs
 */
exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
