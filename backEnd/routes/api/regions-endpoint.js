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
const { createNewProduct, getProductById, getProductByName, getAllProducts, updateProductById, deleteProductById } = require("../../middlewares/regions-midwares");
// ******************** ENDPOINTS ******************** //
// -> /dataWarehouse/regions/create | Create new region. Admin + User:
router.post("/create", jwtokenExtraction, jwtokenVerification, checkUserPermissions, validateJSONSchema(regionSchema), createNewProduct, (req, res) => {
  if (req.productCreation["Status"] === 201) {
    res.status(201).json(req.productCreation)
  };
});
// -> /dataWarehouse/regions/regionId:{regionId} | Admin + User:
router.get("/productId::productId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getProductById, (req, res) =>{
  res.status(200).json(req.productById);
  delete req.productById["ProductFound"];
});
// -> /dataWarehouse/regions/regionName:{regionName} | Admin + User:
router.get("/productName::productName", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getProductByName, (req, res) => {
  res.status(200).json(req.productByName);
  delete req.productById["ProductFound"];
});
// -> /dataWarehouse/regions/allRegions | Admin + User:
router.get("/allProducts", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getAllProducts, (req, res) => {
  res.status(200).json(req.getAllProducts);
});

// -> /dataWarehouse/regions/updateProductId::productId | Update region by Id. Admin + User:
router.put("/updateProductId::productId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getProductById, validateJSONSchema(regionSchema), updateProductById, (req, res) => {
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
// -> /dataWarehouse/regions/deleteProductId::productId. Just Admin:
router.delete("/deleteProductId::productId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getProductById, deleteProductById, (req, res) => {
  if (!req.productDeletion["ProductDeleted"]) {
    res.status(200).json(req.productDeletion);
  } else {
    res.status(204).send("");
  };
  delete req.productById["ProductFound"];
  delete req.productDeletion["ProductDeleted"];
});