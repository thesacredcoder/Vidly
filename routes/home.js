const express = require("express");
const router = express();

router.get("/", (req, res) => {
  res.send("This is the homepage to vidly");
});

module.exports = router;
