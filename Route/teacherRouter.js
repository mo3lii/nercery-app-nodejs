const express = require("express");
const router = express.Router();
const controller = require("../Controller/teacherController");
const {
  isAdmin,
  isTeacher,
  isAdminOrTeacher,
} = require("../MW/auth/authenticationMW");
const {
  addTeacherVal,
  CheckTeacherId,
} = require("../MW/validators/teacherValidator");
const validator = require("../MW/validators/validator");

//////////////////////////////////
router
  .route("/teacher")
  .get(isAdminOrTeacher, controller.getAllTeachers)
  .put(isAdmin, controller.updateTeacher)
  .post(isAdmin, addTeacherVal, validator, controller.addTeacher)
  .delete(isAdmin, controller.deleteTeacher);

router.get("/teacher/supervisor", isAdminOrTeacher, controller.getSupervisors);

router.get(
  "/teacher/:id",
  isAdmin,
  CheckTeacherId,
  validator,
  controller.getTeacherById
);

//export router
module.exports = router;
