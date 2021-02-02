const { check } = require("express-validator");

/**
 * @description validate data from sending request to create post
 */
exports.createdBody = [
  check("title").not().isEmpty().withMessage("Title is required"),
  check("description").isString().isLength({ max: 255 }).withMessage("Description too long"),
  check("body").not().isEmpty().withMessage("Body is required"),
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
