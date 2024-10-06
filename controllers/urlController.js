const Url = require("../models/urls");
const shortid = require("shortid");
const { errorChecker } = require("../services/errorHandler");

async function createShortId(req, res) {
  const originalUrl = req.body.userUrl;
  const shortId = shortid();
  try {
    const allUrls = await Url.find({ createdBy: req.user._id });
    if (allUrls.length <= 9) {
      Url.create({
        shortId,
        redirectUrl: originalUrl,
        visitHistory: [],
        createdBy: req.user._id,
      });
      res.render("alert", {
        user: req.user,
        stts: true,
        msg: "Short URL generated successfully.",
      });
    } else {
      res.render("alert", {
        user: req.user,
        stts: false,
        msg: "Reached limit delete some short URLs to create more.",
      });
    }
  } catch (error) {
    errorChecker(error, req, res);
  }
}

async function handleRedirect(req, res) {
  const shortId = req.params.id;
  try {
    const result = await Url.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );
    res.redirect(result.redirectUrl);
  } catch (error) {
    errorChecker(error, req, res);
  }
}

async function clearUserData(req, res) {
  try {
    await Url.deleteMany({ createdBy: req.user._id });
    res.render("alert", {
      user: req.user,
      stts: true,
      msg: "All short URLs deleted successfully.",
    });
  } catch (error) {
    errorChecker(error, req, res);
  }
}

module.exports = { createShortId, handleRedirect, clearUserData };
