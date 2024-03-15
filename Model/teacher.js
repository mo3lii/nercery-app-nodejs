const mongoose = require("mongoose");

//_id(objectID), fullname,password, email , image (which is string)

const Schema = new mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  fullname: String,
  password: String,
  email: String,
  image: String,
});

module.exports = mongoose.model("teachers", Schema);
