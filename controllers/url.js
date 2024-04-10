const url = require("short-unique-id");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const uid = new url({ length: 8 });
  const shortID = uid.rnd();
  const body = req.body;
  if (!body) return res.status(400).json({ error: "Url is required" });

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", { id: shortID });
}

async function getUrlByShortId(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleTest(req, res) {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  getUrlByShortId,
  handleGetAnalytics,
  handleTest,
};
