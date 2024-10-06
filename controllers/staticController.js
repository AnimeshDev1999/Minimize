const Url = require("../models/urls");

async function renderHome(req, res) {
  if (req.user) {
    const allUrls = await Url.find({ createdBy: req.user._id });
    res.render("home", { user: req.user, urls: allUrls });
  } else {
    res.render("home", { user: req.user });
  }
}

async function renderProfile(req, res) {
  if (req.user) {
    const allUrls = await Url.find({ createdBy: req.user._id });
    res.render("userProfile", { user: req.user, urls: allUrls });
  } else {
    res.render("userProfile", { user: req.user });
  }
}

async function renderLogin(req, res) {
  await res.render("login", { user: req.user });
}

async function renderSignup(req, res) {
  await res.render("signup", { user: req.user });
}

module.exports = { renderHome, renderLogin, renderSignup, renderProfile };
