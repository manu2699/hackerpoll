const express = require("express");
const router = express.Router();
const CandidateControllers = require("../../controllers/user_controllers/candidate_controller");
const RequireUserAuth = require("../../middlewares/user/verify_user");

router.get("/", RequireUserAuth, CandidateControllers.fetchAllCandidates);
router.get("/:id", RequireUserAuth, CandidateControllers.fetchCandidateById);
router.put("/vote/:id", RequireUserAuth, CandidateControllers.voteCandidate);

module.exports = router;
