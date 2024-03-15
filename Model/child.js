const mongoose = require("mongoose");
// : _id(Number), fullName, age , level (one of PreKG,KG1,KG2), address
// (city,street and building
const AutoIncrement = require("mongoose-sequence")(mongoose);

const addressSchema = new mongoose.Schema(
  {
    city: String,
    street: String,
    building: String,
  },
  {
    _id: false,
  }
);
const Schema = new mongoose.Schema({
  _id: Number,
  fullname: String,
  age: Number,
  level: String,
  address: addressSchema,
});
// Schema.plugin(AutoIncrement);
// Schema.plugin(AutoIncrement, {
//   inc_field: "_id",
//   collection_name: "first_counters",
// });

module.exports = mongoose.model("children", Schema);
