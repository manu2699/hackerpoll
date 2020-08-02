const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const candidateSchema = mongoose.Schema({
  name: { type: String, required: true },
  challengeSolved: { type: Number, default: 0 },
  expertiseLevel: { type: Number, min: 1, max: 5, default: 1 },
  expertIn: {
    dataStructures: { type: Number, min: 1, max: 5, default: 1 },
    algorithms: { type: Number, min: 1, max: 5, default: 1 },
    cpp: { type: Number, min: 1, max: 5, default: 1 },
    java: { type: Number, min: 1, max: 5, default: 1 },
    python: { type: Number, min: 1, max: 5, default: 1 },
    javascript: { type: Number, min: 1, max: 5, default: 1 },
  },
  noOfVotes: { type: Number, default: 0 },
  linkedUser: { type: Schema.Types.ObjectId, ref: "user" }
});

module.exports = mongoose.model("candidate", candidateSchema);
