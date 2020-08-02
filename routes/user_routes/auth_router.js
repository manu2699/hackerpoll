const express = require("express");
const router = express.Router();
const Validators = require("../../middlewares/auth/validators");
const ValidateReq = require("../../middlewares/auth/validate_req");
const AuthController = require("../../controllers/user_controllers/auth_controllers.js");

router.post("/signin", Validators.signinValidator, ValidateReq, AuthController.signIn);
router.post("/signup", Validators.signupValidator, ValidateReq, AuthController.signUp);

module.exports = router;
