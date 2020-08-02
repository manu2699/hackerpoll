const CandidateModel = require("../../models/candidate");
const UserModel = require("../../models/users");

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
    const candidate = await CandidateModel.findById(req.params.id);
    res.status(200).send(candidate);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Some error occured :(" });
  }
};

const voteCandidate = async (req, res) => {
  try {
    let user = await UserModel.findById(req.userData._id).select("votes");
    if (user.votes.includes(req.params.id)) {
      return res.status(400).json({
        message: "You have already Registered Your vote to this candidate",
      });
    }

    await CandidateModel.updateOne(
      { _id: req.params.id }, {
      $inc: { noOfVotes: 1 }
    })

    await UserModel.updateOne(
      { _id: req.userData._id },
      { $push: { votes: req.params.id } }
    )

    const io = req.app.get("io");
    let listenObj = `Vote`;
    io.emit(listenObj, true);

    res.status(200).json({ message: "Thankyou for voting", });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Some error occured :(" });
  }
}

module.exports = {
  fetchAllCandidates,
  fetchCandidateById,
  voteCandidate,
};
