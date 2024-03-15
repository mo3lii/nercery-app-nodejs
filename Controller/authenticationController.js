const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const teacher = require("../Model/teacher");
exports.login = (req, res, next) => {
  if (req.body.fullname == "mostafa" && req.body.password == "123") {
    let token = jwt.sign(
      {
        id: 999,
        fullname: req.body.fullname,
        role: "admin",
      },
      "mostafa123",
      {
        expiresIn: "4h",
      }
    );
    res.status(200).json({ data: "Authenticated as admin", token });
  } else {
    teacher
      .findOne({
        fullname: req.body.fullname,
      })
      .then((foundTeacher) => {
        if (!foundTeacher) {
          let error = new Error("you are not Authnicated");
          error.status = 401;
          throw error;
        } else {
          bcrypt
            .compare(req.body.password, foundTeacher.password)
            .then((result) => {
              result == true;
              if (result) {
                let token = jwt.sign(
                  {
                    id: foundTeacher._id,
                    fullname: foundTeacher.fullname,
                    role: "teacher",
                  },
                  "mostafa123",
                  {
                    expiresIn: "4h",
                  }
                );
                res
                  .status(200)
                  .json({ data: "Authenticated as teacher", token });
              } else {
                res.json({ data: "wrong pass" });
              }
            })
            .catch((error) => {
              console.error(error);
              res.status(500).json({ message: error.message });
            });
        }
      });
  }
};
