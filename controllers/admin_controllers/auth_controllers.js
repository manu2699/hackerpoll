const AdminModel = require("../../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  //required -> email, name, password
  try {
    if (req.body.secretPin !== process.env.ADMIN_SECRET) {
      return res.status(400).json({
        message: "Admin Secret Doesn't match",
      });
    }
    let existingAccount = await AdminModel.findOne({ email: req.body.email });
    if (existingAccount) {
      return res.status(400).json({
        message: "Account with same email already exists",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    let newAdmin = new AdminModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await newAdmin.save();
    return res.status(200).json({ message: "Sign-up Completed" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Some error occured :(" });
  }
}

const signIn = async (req, res) => {
  //required -> email , password
  try {
    let admin = await AdminModel.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(400).json({ message: "No such account found..." });
    }

    const verify = bcrypt.compareSync(req.body.password, admin.password);
    if (!verify) {
      return res.status(400).json({ message: "Invalid Credentials.." });
    }

    const token = jwt.sign({ _id: admin._id }, process.env.ADMIN_JWT_KEY);

    return res.status(200).json({
      message: "Login Succesfull", data: { admin, token }
    });

  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Some error occured :(" });
  }
}

module.exports = {
  signIn, signUp,
};
