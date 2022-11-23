const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("usuarios", {title: "Usuarios"});
})

module.exports = router;