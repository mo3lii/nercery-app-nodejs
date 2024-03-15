const { validationResult } = require("express-validator");

// module.exports = (req, res, next) => {
//   let result = validationResult(req);
//   if (result.errors.length > 0) {
//     let filnalMsg = result.errors.reduce(
//       (accumulator, curr) => accumulator + curr.msg + " , ",
//       ""
//     );
//     let errs = new Error(filnalMsg);
//     errs.status = 422;
//     next(errs);
//   } else next();
// };

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    const err = new Error(errorMessages.join(", "));
    err.status = 422;
    return next(err);
  }
  next();
};
