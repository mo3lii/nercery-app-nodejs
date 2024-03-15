const Schema = require("../Model/counters");

module.exports.generateChildId = async () => {
  try {
    let counter = await Schema.findOne({ name: "childCounter" });
    if (!counter) {
      counter = new Schema({ name: "childCounter", value: 1 });
    } else {
      counter.value++;
    }
    await counter.save();
    return counter.value; 
  } catch (error) {
    console.error("Error generating child ID:", error);
    throw error;
  }
};

module.exports.generateClassId = async () => {
  try {
    let counter = await Schema.findOne({ name: "classCounter" });
    if (!counter) {
      counter = new Schema({ name: "classCounter", value: 1 });
    } else {
      counter.value++;
    }
    await counter.save();
    return counter.value; // Return the incremented value
  } catch (error) {
    console.error("Error generating class ID:", error);
    throw error;
  }
};
