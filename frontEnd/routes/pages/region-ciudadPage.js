const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("region-ciudad", {title: "Region-Ciudad"});
})

module.exports = router;