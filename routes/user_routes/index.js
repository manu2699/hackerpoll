const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth_router");
const CandidateRoutes = require("./candidate_router");

router.use("/auth", AuthRoutes);
router.use("/candidate", CandidateRoutes);

module.exports = router;