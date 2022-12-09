const router = require("express").Router();
// Requiring JSON schemas:
const { companySchema } = require("../../schema/schemas");
// ******************** MIDDLEWARES ******************** //
// Schema middlewares:
const { validateJSONSchema } = require("../../middlewares/JSONvalidation");
// JWT middlewares:
const { jwtokenExtraction, jwtokenVerification } = require("../../middlewares/jwtoken");
// Security/Credentials middlewares:
const { checkUserPermissions, justAdminGate } = require("../../middlewares/users-midwares");
// CRUD middlewares:
const { createNewCompany, getCompanyById, getCompanyByName, getAllCompanies, getCompaniesByCountryId, updateCompanyById, deleteCompanyById } = require("../../middlewares/companies-midwares");
// ******************** ENDPOINTS ******************** //
// -> /dataWarehouse/companies/create Create new company. Just Admin:
router.post("/create", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, validateJSONSchema(companySchema), createNewCompany, (req, res) => {
  if (req.companyCreation["Status"] === 201) {
    res.status(201).json(req.companyCreation)
  };
});
// -> /dataWarehouse/companies/companyId:{companyId}. Admin and User:
router.get("/companyId::companyId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getCompanyById, (req, res) =>{
  res.status(200).json(req.companyById);
  delete req.companyById["CompanyFound"];
});
// -> /dataWarehouse/companies/companyName:{companyName}. Admin and User:
router.get("/companyName::companyName", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getCompanyByName, (req, res) => {
  res.status(200).json(req.companyByName);
  delete req.companyByName["CompanyFound"];
});
// -> /dataWarehouse/companies. For both Admins and Users.
router.get("/listAll", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getAllCompanies, (req, res) => {
  res.status(200).json(req.getAllCompanies);
});


// -> /dataWarehouse/companies/cityId:{cityId}. Admin and User:
// router.get("/cityId::cityId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getCompaniesByCityId, (req, res) =>{
//   res.status(200).json(req.companiesByCityId);
//   delete req.companiesByCityId["CompaniesFound"];
// });


// Update company by Id:
// -> /dataWarehouse/companies/updateCompanyId::{companyId}. Admin and User:
// router.put("/updateCompanyId::companyId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getCompanyById, validateJSONSchema(companySchema), updateCompanyById, (req, res) => {
//   if (!req.updateCompanyByID["CompanyFound"]) {
//     res.status(200).json(req.updateCompanyByID);
//   } else if (!req.updateCompanyByID["CompanyUpdated"]) {
//     res.status(409).json(req.updateCompanyByID);
//   } else if (req.updateCompanyByID["CompanyUpdated"]) {
//     res.status(204).json(req.updateCompanyByID);
//   };
//   delete req.companyById["CompanyFound"];
//   delete req.updateCompanyByID["CompanyUpdated"];
// });


// -> /dataWarehouse/companies/deleteCompanyId::{companyId}. Admin and User:
// router.delete("/deleteCompanyId::companyId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getCompanyById, deleteCompanyById, (req, res) => {
//   if (!req.companyDeletion["CompanyDeleted"]) {
//     res.status(200).json(req.companyDeletion);
//   } else {
//     res.status(204).send("");
//   };
//   delete req.companyById["CompanyFound"];
//   delete req.companyDeletion["CompanyDeleted"];
// });


// Exports:
module.exports = router;