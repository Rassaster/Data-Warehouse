// Requiring "Router" object from "Express":
const router = require("express").Router();
const apiUsers = require("./api/users-endpoint");
const apiRegions = require("./api/regions-endpoints");
const apiCountries = require("./api/countries-endpoints");
const apiCities = require("./api/cities-endpoints");
const apiCompanies = require("./api/companies-endpoints");
const apiContacts = require("./api/contacts-endpoints");
// const apiOrders = require("./api/orders-endpoint");

router.use("/users", apiUsers);
router.use("/regions", apiRegions);
router.use("/countries", apiCountries);
router.use("/cities", apiCities);
router.use("/companies", apiCompanies);
router.use("/contacts", apiContacts);
// router.use("/orders", apiOrders);

// Exports:
module.exports = router;