const express = require("express");
const { handleRedirect } = require("../controllers/urlController");

const router = express.Router();

router.get("/:id", handleRedirect);

module.exports = router;
