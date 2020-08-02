const CandidateModel = require("../../models/candidate");
const UserModel = require("../../models/users");

const addCandidate = async (req, res) => {
  try {
    let newCandidate = new CandidateModel({ ...req.body });
    newCandidate = await newCandidate.save();
    res.status(200).json({ message: "Candidate added", data: newCandidate });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Some error occured :(" });
  }
};

const updateCandidate = async (req, res) => {
  try {
    const existingCandidate = await CandidateModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Inventory updated", data: existingCandidate });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Some error occured :(" });
  }
};

const fetchAllCandidates = async (req, res) => {
  try {
    const candidates = await CandidateModel.find({}).sort({ noOfVotes: -1 });
    res.status(200).send(candidates);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Some error occured :(" });
  }
};

const fetchCandidateById = async (req, res) => {
  try {
    let candidate = await CandidateModel.findById(req.params.id)
      .populate("linkedUser");
    res.status(200).send(candidate);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Some error occured :(" });
  }
};

const removeCandidate = async (req, res) => {
  try {
    await CandidateModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Candidate removed" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Some error occured :(" });
  }
};

const fetchUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}).select("email");
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Some error occured :(" });
  }
}

module.exports = {
  addCandidate,
  updateCandidate,
  fetchAllCandidates,
  fetchCandidateById,
  removeCandidate,
  fetchUsers
};
