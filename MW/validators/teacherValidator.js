const { body, query, param } = require("express-validator");
const { options } = require("../../Route/childRouter");

//_id(objectID), fullname,password, email , image (which is string)

exports.addTeacherVal = [
  body("_id").optional().isMongoId().withMessage("id must be objectID"),
  body("fullname").isString().withMessage("name must be string"),
  // body("password")
  //   .isLength({ min: 8 })
  //   .withMessage("password length must be >= 8")
  //   .isStrongPassword()
  //  .withMessage("weak password"),
  body("email").isEmail().withMessage("email not valid"),
  body("image").optional().isURL().withMessage("image link not valid"),
];

exports.CheckTeacherId = [
  param("id").isMongoId().withMessage("id must be int"),
];
