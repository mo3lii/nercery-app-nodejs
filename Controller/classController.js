const Schema = require("../Model/class");
const teacherSchema = require("../Model/teacher");
const childSchema = require("../Model/child");
const { response } = require("express");

exports.getAllClasses = (req, res, next) => {
  Schema.find()
    .populate({ path: "supervisor", select: { fullname: 1 } })
    .populate({ path: "children", select: { fullName: 1 } })
    .then((data) => res.status(200).json({ data }))
    .catch((error) => next(error));
};

exports.getClassById = (req, res, next) => {
  Schema.findById(req.params.id)
    .populate({ path: "supervisor", select: { fullname: 1 } })
    .populate({ path: "children", select: { fullName: 1 } })
    .then((data) => {
      if (data == null) throw new Error("child not exists");
      res.status(200).json(data);
    });
};

exports.updateClass = (req, res, next) => {
  Schema.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    .then((data) => {
      console.log(req.params.id);
      if (data == null) throw new Error("class not exists");
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.deleteClass = (req, res, next) => {
  Schema.findOneAndDelete({ _id: req.body._id }, { new: true })
    .then((deleted) => {
      if (deleted == null) throw new Error("class not exists");
      res.status(200).json({ deletedClass: deleted });
    })
    .catch((error) => next(error));
};

exports.getClassChildrenInfo = (req, res, next) => {
  Schema.findById(req.params.id)
    .populate({ path: "children" })
    .select("children")
    .then((data) => {
      if (data == null) throw new Error("class not exists");
      res.status(200).json(data);
    });
};

exports.getClassSuperInfo = (req, res, next) => {
  Schema.findById(req.params.id)
    .populate({ path: "supervisor" })
    .select("supervisor")
    .then((data) => {
      if (data == null) throw new Error("class not exists");
      res.status(200).json(data);
    });
};

async function saveClassToDB(req, res, next) {
  const newClass = new Schema({
    _id: req.body._id,
    name: req.body.fullname,
    supervisor: req.body.supervisor,
    children: req.body.children,
  });
  newClass
    .save()
    .then((data) => res.status(200).json(data))
    .catch((error) => next(error));
  console.log("class added");
}

exports.addClass = async (req, res, next) => {
  try {
    let supervisor = await teacherSchema.findById(req.body.supervisor);
    let childPromises = req.body.children.map((child) =>
      childSchema.findById(child)
    );
    let children = await Promise.all(childPromises);

    if (!supervisor) next(new Error("supervisor not exist"));
    else if (children.some((ch) => !ch))
      next(new Error("one or more children not exist"));
    else {
      await saveClassToDB(req, res, next);
      res.status(200).json({ data: req });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// exports.addClass = async (req, res, next) => {
//   try {
//     let supervisor = await teacherSchema.findById(req.body.supervisor);
//     if (!supervisor) await next(new Error("supervisor not exist"));

//     let childPromises = req.body.children.map((child) =>
//       childSchema.findById(child)
//     );
//     let children = await Promise.all(childPromises);
//     children.forEach(async (child, i) => {
//       if (!child)
//         await next(new Error(`child ${req.body.children[i]} not exist`));
//     });

//     const newClass = new Schema({
//       _id: req.body._id,
//       name: req.body.fullname,
//       supervisor: req.body.supervisor,
//       children: req.body.children,
//     });
//     newClass
//       .save()
//       .then((data) => res.status(200).json(data))
//       .catch((error) => next(error));
//     console.log("class added");
//   } catch (error) {
//     console.log(error.message);
//   }
// };
