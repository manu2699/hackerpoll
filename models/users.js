const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  votes: {
    type: [{ type: Schema.Types.ObjectId, ref: "candidate" }]
  },
  isVoted: { type: Boolean, default: false }
});

module.exports = mongoose.model("user", userSchema);