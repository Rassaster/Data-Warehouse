const router = require("express").Router();
// Requiring JSON schemas:
const { citySchema } = require("../../schema/schemas");
// ******************** MIDDLEWARES ******************** //
// Schema middlewares:
const { validateJSONSchema } = require("../../middlewares/JSONvalidation");
// JWT middlewares:
const { jwtokenExtraction, jwtokenVerification } = require("../../middlewares/jwtoken");
// Security/Credentials middlewares:
const { checkUserPermissions, justAdminGate } = require("../../middlewares/users-midwares");
// CRUD middlewares:
const { createNewCity, getCityById, getCityByName, getAllCities, updateCityById, deleteCityById } = require("../../middlewares/cities-midwares");
// ******************** ENDPOINTS ******************** //
// -> /dataWarehouse/cities/create Create new city. Just Admin:
router.post("/create", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, validateJSONSchema(citySchema), createNewCity, (req, res) => {
  if (req.cityCreation["Status"] === 201) {
    res.status(201).json(req.cityCreation)
  };
});
// -> /dataWarehouse/cities/cityId:{cityId}. Admin and User:
router.get("/cityId::cityId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getCityById, (req, res) =>{
  res.status(200).json(req.cityById);
  delete req.cityById["CityFound"];
});
// -> /dataWarehouse/cities/cityName:{cityName}. Admin and User:
router.get("/cityName::cityName", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getCityByName, (req, res) => {
  res.status(200).json(req.cityByName);
  delete req.cityByName["CityFound"];
});
// -> /dataWarehouse/cities. For both Admins and Users.
router.get("/listAll", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getAllCities, (req, res) => {
  res.status(200).json(req.getAllCities);
});
// Update city by Id:
// -> /dataWarehouse/cities/updateCityId::{cityId}. Admin and User:
router.put("/updateCityId::cityId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getCityById, validateJSONSchema(citySchema), updateCityById, (req, res) => {
  if (!req.updateCityByID["CityFound"]) {
    res.status(200).json(req.updateCityByID);
  } else if (!req.updateCityByID["CityUpdated"]) {
    res.status(409).json(req.updateCityByID);
  } else if (req.updateCityByID["CityUpdated"]) {
    res.status(204).json(req.updateCityByID);
  };
  delete req.cityById["CityFound"];
  delete req.updateCityByID["CityUpdated"];
});
// -> /dataWarehouse/cities/deleteCityId::{cityId}. Admin and User:
router.delete("/deleteCityId::cityId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getCityById, deleteCityById, (req, res) => {
  if (!req.cityDeletion["CityDeleted"]) {
    res.status(200).json(req.cityDeletion);
  } else {
    res.status(204).send("");
  };
  delete req.cityById["CityFound"];
  delete req.cityDeletion["CityDeleted"];
});


// Exports:
module.exports = router;