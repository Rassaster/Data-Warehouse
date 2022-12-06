const router = require("express").Router();
// Requiring JSON schemas:
const { regionSchema } = require("../../schema/schemas");
// ******************** MIDDLEWARES ******************** //
// Schema middlewares:
const { validateJSONSchema } = require("../../middlewares/JSONvalidation");
// JWT middlewares:
const { jwtokenExtraction, jwtokenVerification } = require("../../middlewares/jwtoken");
// Security/Credentials middlewares:
const { checkUserPermissions, justAdminGate } = require("../../middlewares/users-midwares");
// CRUD middlewares:
const { createNewRegion, getRegionById, getRegionByName, getAllRegions, updateRegionById, deleteProductById } = require("../../middlewares/regions-midwares");
// ******************** ENDPOINTS ******************** //
// -> /dataWarehouse/regions/create Create new product. Admin and User:
router.post("/create", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, validateJSONSchema(regionSchema), createNewRegion, (req, res) => {
  if (req.regionCreation["Status"] === 201) {
    res.status(201).json(req.regionCreation)
  };
});
// -> /dataWarehouse/regions/regionsId:{regionsId}. Admin and User:
router.get("/regionId::regionId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getRegionById, (req, res) =>{
  res.status(200).json(req.regionById);
  delete req.regionById["RegionFound"];
});
// -> /dataWarehouse/regions/regionName:{regionName}. Admin and User:
router.get("/regionName::regionName", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getRegionByName, (req, res) => {
  res.status(200).json(req.regionByName);
  delete req.regionByName["RegionFound"];
});
// -> /dataWarehouse/regions. For both Admins and Users.
router.get("/listAll", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getAllRegions, (req, res) => {
  res.status(200).json(req.getAllRegions);
});



// Update region by Id:
// -> /dataWarehouse/regions/updateRegionId::{regionId}. Admin and User:
router.put("/updateRegionId::regionId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getRegionById, validateJSONSchema(regionSchema), updateRegionById, (req, res) => {
  if (!req.updateRegionByID["RegionFound"]) {
    res.status(200).json(req.updateRegionByID);
  } else if (!req.updateRegionByID["RegionUpdated"]) {
    res.status(409).json(req.updateRegionByID);
  } else if (req.updateRegionByID["RegionUpdated"]) {
    res.status(204).json(req.updateRegionByID);
  };
  delete req.regionById["RegionFound"];
  delete req.updateRegionByID["RegionUpdated"];
});






// -> /dataWarehouse/products/deleteProductId::productId. Just Admin:
/*
router.delete("/deleteProductId::productId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getProductById, deleteProductById, (req, res) => {
  if (!req.productDeletion["ProductDeleted"]) {
    res.status(200).json(req.productDeletion);
  } else {
    res.status(204).send("");
  };
  delete req.productById["ProductFound"];
  delete req.productDeletion["ProductDeleted"];
});
*/

// Exports:
module.exports = router;