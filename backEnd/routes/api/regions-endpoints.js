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
const { createNewRegion, getRegionById, getRegionByName, getAllRegions, updateProductById, deleteProductById } = require("../../middlewares/regions-midwares");
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







// Update product by Id:
// -> /dataWarehouse/products/updateProductId::productId. Just Admin:
/*
router.put("/updateProductId::productId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getProductById, validateJSONSchema(productSchema), updateProductById, (req, res) => {
  if (!req.updateProductByID["ProductFound"]) {
    res.status(200).json(req.updateProductByID);
  } else if (!req.updateProductByID["ProductUpdated"]) {
    res.status(409).json(req.updateProductByID);
  } else if (req.updateProductByID["ProductUpdated"]) {
    res.status(204).json(req.updateProductByID);
  };
  delete req.productById["ProductFound"];
  delete req.updateProductByID["ProductUpdated"];
});
*/






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