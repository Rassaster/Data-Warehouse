const router = require("express").Router();
// Requiring JSON schemas:
const { contactSchema } = require("../../schema/schemas");
// ******************** MIDDLEWARES ******************** //
// Schema middlewares:
const { validateJSONSchema } = require("../../middlewares/JSONvalidation");
// JWT middlewares:
const { jwtokenExtraction, jwtokenVerification } = require("../../middlewares/jwtoken");
// Security/Credentials middlewares:
const { checkUserPermissions, justAdminGate } = require("../../middlewares/users-midwares");
// CRUD middlewares:
const { createNewContact, getContactById, getContactByName, getAllContacts, getContactsByCompanyId, updateContactById, deleteContactById } = require("../../middlewares/contacts-midwares");
// ******************** ENDPOINTS ******************** //
// -> /dataWarehouse/contacts/create Create new company. Just Admin:
router.post("/create", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, validateJSONSchema(contactSchema), createNewContact, (req, res) => {
  if (req.contactCreation["Status"] === 201) {
    res.status(201).json(req.contactCreation)
  };
});


// -> /dataWarehouse/contacts/companyId:{companyId}. Admin and User:
// router.get("/companyId::companyId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getContactById, (req, res) =>{
//   res.status(200).json(req.companyById);
//   delete req.companyById["CompanyFound"];
// });


// -> /dataWarehouse/contacts/companyName:{companyName}. Admin and User:
// router.get("/companyName::companyName", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getContactByName, (req, res) => {
//   res.status(200).json(req.companyByName);
//   delete req.companyByName["CompanyFound"];
// });


// -> /dataWarehouse/contacts. For both Admins and Users.
// router.get("/listAll", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getAllContacts, (req, res) => {
//   res.status(200).json(req.getAllContacts);
// });



// // -> /dataWarehouse/companies/cityId:{cityId}. Admin and User:
// router.get("/cityId::cityId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getContactsByCompanyId, (req, res) =>{
//   res.status(200).json(req.companiesByCityId);
//   delete req.companiesByCityId["CompaniesFound"];
// });



// Update company by Id:
// -> /dataWarehouse/companies/updateCompanyId::{companyId}. Admin and User:
// router.put("/updateCompanyId::companyId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getContactById, validateJSONSchema(companySchema), updateContactById, (req, res) => {
//   if (!req.updateContactByID["CompanyFound"]) {
//     res.status(200).json(req.updateContactByID);
//   } else if (!req.updateContactByID["CompanyUpdated"]) {
//     res.status(409).json(req.updateContactByID);
//   } else if (req.updateContactByID["CompanyUpdated"]) {
//     res.status(204).json(req.updateContactByID);
//   };
//   delete req.companyById["CompanyFound"];
//   delete req.updateContactByID["CompanyUpdated"];
// });


// -> /dataWarehouse/contacts/deleteCompanyId::{companyId}. Admin and User:
// router.delete("/deleteCompanyId::companyId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getContactById, deleteContactById, (req, res) => {
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