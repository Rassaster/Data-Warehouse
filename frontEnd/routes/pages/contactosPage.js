const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("contactos", {title: "Contactos"});
});

module.exports = router;