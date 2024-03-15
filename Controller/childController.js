const Schema = require("../Model/child");
const {
  generateChildId,
  generateClassId,
} = require("../services/autoIdService");
exports.getAllChildren = (req, res, next) => {
  Schema.find()
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getChildById = (req, res, next) => {
  Schema.findById(req.params.id)
    .then((data) => {
      console.log(req.params.id);
      if (data == null) throw new Error("child not exists");
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.insertChild = async (req, res, next) => {
  const childId = await generateChildId();
  const child = new Schema({
    _id: childId,
    fullname: req.body.fullname,
    age: req.body.age,
    level: req.body.level,
    address: req.body.address,
  });
  child
    .save()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.updateChild = (req, res, next) => {
  Schema.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    .then((data) => {
      console.log(req.params.id);
      if (data == null) throw new Error("child not exists");
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.deleteChildById = (req, res, next) => {
  Schema.findOneAndDelete({ _id: req.body._id }, { new: true })
    .then((deleted) => {
      if (deleted == null) throw new Error("child not exists");
      res.status(200).json({ deletedChild: deleted });
    })
    .catch((error) => next(error));
};
