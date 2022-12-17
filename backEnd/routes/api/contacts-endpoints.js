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
const { createNewContact, getContactById, getContactByName, getAllContacts, getAllContactsChannels,getContactsByCompanyId, getContactsFilter, updateContactById, deleteContactById } = require("../../middlewares/contacts-midwares");
// ******************** ENDPOINTS ******************** //
// -> /dataWarehouse/contacts/create Create new company. Just Admin:
router.post("/create", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, validateJSONSchema(contactSchema), createNewContact, (req, res) => {
  if (req.contactCreation["Status"] === 201) {
    res.status(201).json(req.contactCreation)
  };
});
// -> /dataWarehouse/contacts/contactId:{contactId}. Admin and User:
router.get("/contactId::contactId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getContactById, (req, res) =>{
  res.status(200).json(req.contactById);
  delete req.contactById["ContactFound"];
});
// -> /dataWarehouse/contacts/contactName:{contactName}. Admin and User:
router.get("/contactName::contactName", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getContactByName, (req, res) => {
  res.status(200).json(req.contactByName);
  delete req.contactByName["ContactFound"];
});
// -> /dataWarehouse/contacts. For both Admins and Users.
router.get("/listAll", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getAllContacts, (req, res) => {
  res.status(200).json(req.getAllContacts);
});
// -> /dataWarehouse/contacts. For both Admins and Users.
router.get("/filter::filterParams", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getContactsFilter, (req, res) => {
  res.status(200).json(req.getContactsFilter);
});
// -> /dataWarehouse/contacts. For both Admins and Users.
router.get("/listAllChannels", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getAllContactsChannels, (req, res) => {
  res.status(200).json(req.getAllContactsChannels);
});
// // -> /dataWarehouse/contacts/companyId:{companyId}. Admin and User:
router.get("/companyId::companyId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getContactsByCompanyId, (req, res) =>{
  res.status(200).json(req.contactsByCompanyId);
  delete req.contactsByCompanyId["ContactsFound"];
});
// Update contact by Id:
// -> /dataWarehouse/contacts/updateContactId::{contactId}. Admin and User:
router.put("/updateContactId::contactId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getContactById, validateJSONSchema(contactSchema), updateContactById, (req, res) => {
  if (!req.updateContactByID["ContactFound"]) {
    res.status(200).json(req.updateContactByID);
  } else if (!req.updateContactByID["ContactUpdated"]) {
    res.status(409).json(req.updateContactByID);
  } else if (req.updateContactByID["ContactUpdated"]) {
    res.status(204).json(req.updateContactByID);
  };
  delete req.contactById["ContactFound"];
  delete req.updateContactByID["ContactUpdated"];
});
// -> /dataWarehouse/contacts/deleteContactyId::{contactId}. Admin and User:
router.delete("/deleteContactId::contactId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getContactById, deleteContactById, (req, res) => {
  if (!req.contactDeletion["ContactDeleted"]) {
    res.status(200).json(req.contactDeletion);
  } else {
    res.status(204).send("");
  };
  delete req.contactById["ContactFound"];
  delete req.contactDeletion["ContactDeleted"];
});


// Exports:
module.exports = router;