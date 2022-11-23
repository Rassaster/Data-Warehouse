const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("login", {title: "DW | Home"});
});

module.exports = router;