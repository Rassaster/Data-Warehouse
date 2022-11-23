const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("empresas", {title: "Empresas"});
})

module.exports = router;