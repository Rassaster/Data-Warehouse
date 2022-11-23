const router = require("express").Router();

const receptionEndpoint = require("./pages/receptionEndpoint");
const loginPage = require("./pages/loginPage");
const contactosPage = require("./pages/contactosPage");
const empresasPage = require("./pages/empresasPage");
const usuariosPage = require("./pages/usuariosPage");
const region_ciudadPage = require("./pages/region-ciudadPage");

router.use("/", receptionEndpoint);
router.use("/login", loginPage);
router.use("/contactos", contactosPage);
router.use("/empresas", empresasPage);
router.use("/usuarios", usuariosPage);
router.use("/region-ciudad", region_ciudadPage);

module.exports = router;