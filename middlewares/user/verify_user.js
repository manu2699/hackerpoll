const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.USER_JWT_KEY);
    req.userData = { _id: decodedToken._id };
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      status: false,
      message: "User Authentication failed"
    });
  }
};
