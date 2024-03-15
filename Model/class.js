const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// :_id(Number), name, supervisor (teacher id number), children which is array of children ids

const Schema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "teachers" },
    children: [{ type: Number, ref: "children" }],
  },
  { _id: false }
);
// Schema.plugin(AutoIncrement);
// Schema.plugin(AutoIncrement, {
//   inc_field: "_id",
//   collection_name: "second_counters",
// });
module.exports = mongoose.model("classes", Schema);
