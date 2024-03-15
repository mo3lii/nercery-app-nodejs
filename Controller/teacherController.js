const Schema = require("../Model/teacher");
const classSchema = require("../Model/class");
const bcrypt = require("bcrypt");
exports.getAllTeachers = (req, res, next) => {
  Schema.find()
    .then((data) => res.status(200).json({ data }))
    .catch((error) => next(error));
};

exports.getTeacherById = (req, res, next) => {
  Schema.findById(req.params.id).then((data) => {
    if (data == null) throw new Error("teacher not exists");
    res.status(200).json(data);
  });
};

exports.addTeacher = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (error, hash) => {
    const newTeacher = new Schema({
      fullname: req.body.fullname,
      password: hash,
      email: req.body.email,
      image: req.body.image,
    });
    console.log("password : ", hash);

    newTeacher
      .save()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => next(error));
  });
};

exports.updateTeacher = (req, res, next) => {
  Schema.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    .then((data) => {
      console.log(req.params.id);
      if (data == null) throw new Error("teacher not exists");
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.deleteTeacher = (req, res, next) => {
  Schema.findOneAndDelete({ _id: req.body._id }, { new: true })
    .then((deleted) => {
      if (deleted == null) throw new Error("teacher not exists");
      res.status(200).json({ deletedTeacher: deleted });
    })
    .catch((error) => next(error));
};

exports.getSupervisors = (req, res, next) => {
  classSchema
    .find()
    .populate({ path: "supervisor", select: "fullname email image" })
    .then((classes) => {
      const supersData = classes.map((classData) => classData.supervisor);
      res.status(200).json({ supersData });
    })
    .catch((error) => next(error));
};
