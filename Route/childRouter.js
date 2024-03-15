const express = require("express");
const router = express.Router();
const controller = require("../Controller/childController");
const {
  isAdmin,
  isTeacher,
  isAdminOrTeacher,
} = require("../MW/auth/authenticationMW");
const {
  addChildVal,
  checkChildId,
} = require("../MW/validators/childValidator");
const validator = require("../MW/validators/validator");
////////////////////////////////////
router
  .route("/child")
  .get(isTeacher, controller.getAllChildren)
  .post(isTeacher, addChildVal, validator, controller.insertChild)
  .delete(isAdminOrTeacher, controller.deleteChildById)
  .put(isAdminOrTeacher, controller.updateChild);

router.get(
  "/child/:id",
  isAdminOrTeacher,
  checkChildId,
  validator,
  controller.getChildById
);

module.exports = router;
