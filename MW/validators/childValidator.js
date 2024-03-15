const { body, query, param } = require("express-validator");
// Child Data: _id(Number), fullName, age , level (one of PreKG,KG1,KG2), address
// (city,street and building)

exports.addChildVal = [
  //body("_id").optional().isNumeric().withMessage("id must be a number"),
  body("fullName").isString().withMessage("fullName must be a string"),
  body("age").isNumeric().withMessage("age must be a number"),
  body("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("level must be one of PreKG, KG1, KG2"),
  body("address.city").isString().withMessage("city must be a string"),
  body("address.street")
    .optional()
    .isString()
    .withMessage("street must be a string"),
  body("address.building")
    .optional()
    .isString()
    .withMessage("building must be a string"),
];

exports.checkChildId = [param("id").isInt().withMessage("id must be number")];
