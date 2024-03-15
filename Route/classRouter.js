const express = require("express");
const router = express.Router();
const controller = require("../Controller/classController");
const {
  isAdmin,
  isTeacher,
  isAdminOrTeacher,
} = require("../MW/auth/authenticationMW");
const {
  addClassVal,
  checkClassId,
} = require("../MW/validators/classValidator");
const validator = require("../MW/validators/validator");
///////////////////////////////////////
router
  .route("/class")
  .get(isAdminOrTeacher, controller.getAllClasses)
  .post(isAdmin, controller.addClass)
  .put(isAdmin, controller.updateClass)
  .delete(isAdmin, controller.deleteClass);

router.get("/class/:id", isAdminOrTeacher, controller.getClassById);

router.get(
  "/class/child/:id",
  isAdminOrTeacher,
  checkClassId,
  validator,
  controller.getClassChildrenInfo
);

router.get(
  "/class/teacher/:id",
  isAdminOrTeacher,
  checkClassId,
  validator,
  controller.getClassSuperInfo
);

module.exports = router;
