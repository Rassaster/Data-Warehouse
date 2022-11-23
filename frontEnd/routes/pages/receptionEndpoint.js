const router = require("express").Router();
router.get("/", (req, res) => {
  let num = 0;
  if (num === 0) {
    res.redirect("contactos");
  } else {
    res.redirect("login");
  }
});
module.exports = router;