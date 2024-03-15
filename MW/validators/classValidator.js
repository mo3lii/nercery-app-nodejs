const { body, query, param } = require("express-validator");

// Class Data:_id(Number), name, supervisor (teacher id number), children which is
// array of children ids
exports.addClassVal = [
  // body("_id").isNumeric().withMessage("id must be a number"),
  body("name")
    .isString()
    .withMessage("name must be string")
    .isLength({ min: 5 })
    .withMessage("name must be atleast 5 chars"),
  body("supervisor").isMongoId().withMessage("super id is not valid"),
  body("children")
    .optional()
    .isArray()
    .withMessage("children array is not valid"),
];

exports.checkClassId = [param("id").isInt().withMessage("id must be number")];
