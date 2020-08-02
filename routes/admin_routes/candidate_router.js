const express = require("express");
const router = express.Router();
const CandidateControllers = require("../../controllers/admin_controllers/candidate_controllers");
const RequireAdminAuth = require("../../middlewares/admin/verify_admin");

router.post("/", RequireAdminAuth, CandidateControllers.addCandidate);
router.get("/", RequireAdminAuth, CandidateControllers.fetchAllCandidates);
router.get("/:id", RequireAdminAuth, CandidateControllers.fetchCandidateById);
router.put("/:id", RequireAdminAuth, CandidateControllers.updateCandidate);
router.delete("/:id", RequireAdminAuth, CandidateControllers.removeCandidate);
router.get("/users/tolink", RequireAdminAuth, CandidateControllers.fetchUsers);

module.exports = router;
