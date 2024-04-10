const express = require("express");
const {
  handleGenerateNewShortURL,
  getUrlByShortId,
  handleGetAnalytics,
  handleTest,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", getUrlByShortId);
router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/url/test", handleTest);

module.exports = router;
