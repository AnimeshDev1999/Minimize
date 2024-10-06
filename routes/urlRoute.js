const express = require("express");
const {
  createShortId,
  clearUserData,
} = require("../controllers/urlController");

const router = express.Router();

router.post("/create", createShortId);
router.get("/clear", clearUserData);

module.exports = router;
