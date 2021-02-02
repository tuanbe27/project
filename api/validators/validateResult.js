const { validationResult } = require("express-validator");

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
