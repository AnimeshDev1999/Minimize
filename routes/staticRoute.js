const express = require("express");
const {
  renderHome,
  renderLogin,
  renderSignup,
  renderProfile,
} = require("../controllers/staticController");

const router = express.Router();

router.get("/", renderHome);
router.get("/login", renderLogin);
router.get("/signup", renderSignup);
router.get("/profile", renderProfile);

module.exports = router;
