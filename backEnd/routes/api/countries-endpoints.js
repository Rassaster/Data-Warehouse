const router = require("express").Router();
// Requiring JSON schemas:
const { countrySchema } = require("../../schema/schemas");
// ******************** MIDDLEWARES ******************** //
// Schema middlewares:
const { validateJSONSchema } = require("../../middlewares/JSONvalidation");
// JWT middlewares:
const { jwtokenExtraction, jwtokenVerification } = require("../../middlewares/jwtoken");
// Security/Credentials middlewares:
const { checkUserPermissions, justAdminGate } = require("../../middlewares/users-midwares");
// CRUD middlewares:
const { createNewCountry, getCountryById, getCountryByName, getAllCountries, updateCountryById, deleteCountryById } = require("../../middlewares/countries-midwares");
// ******************** ENDPOINTS ******************** //
// -> /dataWarehouse/countries/create Create new country. Just Admin:
router.post("/create", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, validateJSONSchema(countrySchema), createNewCountry, (req, res) => {
  if (req.countryCreation["Status"] === 201) {
    res.status(201).json(req.countryCreation)
  };
});
// -> /dataWarehouse/countries/countryId:{countryId}. Admin and User:
router.get("/countryId::countryId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getCountryById, (req, res) =>{
  res.status(200).json(req.countryById);
  delete req.countryById["CountryFound"];
});
// -> /dataWarehouse/countries/countryName:{countryName}. Admin and User:
router.get("/countryName::countryName", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getCountryByName, (req, res) => {
  res.status(200).json(req.countryByName);
  delete req.countryByName["CountryFound"];
});
// -> /dataWarehouse/countries. For both Admins and Users.
router.get("/listAll", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getAllCountries, (req, res) => {
  res.status(200).json(req.getAllCountries);
});
// Update country by Id:
// -> /dataWarehouse/countries/updateCountryId::{countryId}. Admin and User:
router.put("/updateCountryId::countryId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getCountryById, validateJSONSchema(countrySchema), updateCountryById, (req, res) => {
  if (!req.updateCountryByID["CountryFound"]) {
    res.status(200).json(req.updateCountryByID);
  } else if (!req.updateCountryByID["CountryUpdated"]) {
    res.status(409).json(req.updateCountryByID);
  } else if (req.updateCountryByID["CountryUpdated"]) {
    res.status(204).json(req.updateCountryByID);
  };
  delete req.countryById["CountryFound"];
  delete req.updateCountryByID["CountryUpdated"];
});
// -> /dataWarehouse/countries/deleteCountryId::{countryId}. Admin and User:
router.delete("/deleteCountryId::countryId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getCountryById, deleteCountryById, (req, res) => {
  if (!req.countryDeletion["CountryDeleted"]) {
    res.status(200).json(req.countryDeletion);
  } else {
    res.status(204).send("");
  };
  delete req.countryById["CountryFound"];
  delete req.countryDeletion["CountryDeleted"];
});


// Exports:
module.exports = router;