const User = require("../models/users");
const { setUser } = require("../services/auth");
const { errorChecker } = require("../services/errorHandler");

async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    await User.create({ name, email, password });
    res.redirect("/");
  } catch (error) {
    errorChecker(error, req, res);
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const result = await User.findOne({ email, password });
  if (result) {
    const token = setUser(result);
    res.cookie("token", token);
    res.redirect("/");
  } else {
    res.render("alert", {
      user: req.user,
      stts: false,
      msg: "Email or password incorrect, try again.",
    });
  }
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.redirect("/");
}

module.exports = { createUser, loginUser, logoutUser };
