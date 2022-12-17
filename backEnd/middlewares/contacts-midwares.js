const moment = require("moment");
// Import Server Responses:
const {  okReponse200, createdResponse201, conflictResponse409, internalServerError500 } = require("../serverResponses")
// Import MYSQL Queries functions:
const { newContact, selectFromTableWhereFieldIsValue, selectAllFromTable, selectAllContactsJoinedCompanyLocations, selectContactsFilter, selectContactJoinedChannels, selectContactsFromCompanyId, updateTableRegisterWhereIdIsValue, deleteTableRegisterWhereIdIsValue } = require("../sql/queries"); 
// ***************************************** MIDDLEWARES *********************************************
// -createNewContact;
// Register a new contact:
const createNewContact = async (req,res, next) => {
  try {
    let date = moment().format('YYYY-MM-DD HH:mm:ss');
    const {name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact} = req.body;
    const newRegister = await newContact(date, name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact);
    const createdContact = {
      name_contact: req.body.name_contact,
      lastName_contact: req.body.lastName_contact,
      profile_contact: req.body.profile_contact,
      email_contact: req.body.email_contact,
      id_company: req.body.id_company,
      interest_contact: req.body.interest_contact,
      contact_id: newRegister[0]
    };
    createdResponse201["Message"] = "Contact created successfully.";
    createdResponse201["Result"] = createdContact;
    req.contactCreation = createdResponse201;
    return next();
  } catch (error) {
    internalServerError500["Message"] = error.parent.sqlMessage;
    internalServerError500["Description"] = "Please review the API Documentation in relation to the JSON format expected.";
    internalServerError500["ReceivedQueryJSON"] = req.body;
    res.status(500).send(internalServerError500);
    delete internalServerError500["Description"];
    delete internalServerError500["ReceivedQueryJSON"];
    return;
  };
};
// -getContactById:
const getContactById = async (req, res, next) => {
  try {
    const contact = await selectFromTableWhereFieldIsValue("contacts", "id_contact", req.params.contactId)
    if (contact.length === 0) {
      okReponse200["Message"] = "Contact not found.";
      okReponse200["Result"] = `The Contact with id ${req.params.contactId} doesn't exist.`;
      okReponse200["ContactFound"] = false;
      req.contactById = okReponse200;
    } 
    else {
      req.contactFound = contact;
      okReponse200["Message"] = "Contact found.";
      okReponse200["Result"] = contact[0];
      okReponse200["ContactFound"] = true;
      req.contactById = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the city by ID.";
    return res.status(500).send(internalServerError500)
  };
};
// -getContactByName:
const getContactByName = async (req, res, next) => {
  try {
    const contact = await selectFromTableWhereFieldIsValue("contacts", "name_contact", req.params.contactName);
    if (contact.length === 0) {
      okReponse200["Message"] = "Contact not found.";
      okReponse200["Result"] = `The contact '${req.params.contactName}' doesn't exist.`;
      okReponse200["ContactFound"] = false;
      req.contactByName = okReponse200;
    } else {
      req.contactFound = contact;
      okReponse200["Message"] = "Contact found.";
      okReponse200["Result"] = req.contactFound;
      okReponse200["ContactFound"] = true;
      req.contactByName = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the product by it's name.";
    return res.status(500).send(internalServerError500)
  };
};
// -getAllContacts:
const getAllContacts = async (req, res, next) => {
  try {
    const contactsList = await selectAllContactsJoinedCompanyLocations();
    okReponse200["Message"] = "List of all registered contacts obtained.";
    okReponse200["Result"] = contactsList;
    req.getAllContacts = okReponse200
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while obtaining all the registered cities.";
    return res.status(500).send(internalServerError500);
  };
};
// -getContactsFilter:
const getContactsFilter = async (req, res, next) => {
  try {
    const contactsFilter = await selectContactsFilter(req.params.filterParams);
    console.log("RASSSAA", req.params.filterParams)
    okReponse200["Message"] = "List of filtered contacts obtained.";
    okReponse200["Result"] = contactsFilter;
    req.getContactsFilter = okReponse200
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while obtaining the filtered query.";
    return res.status(500).send(internalServerError500);
  };
};
// -getAllContactsChannels:
const getAllContactsChannels = async (req, res, next) => {
  try {
    const contactsChannelsList = await selectContactJoinedChannels();
    okReponse200["Message"] = "List of all registered contacts with its channels obtained.";
    okReponse200["Result"] = contactsChannelsList;
    req.getAllContactsChannels = okReponse200
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while obtaining all the registered cities.";
    return res.status(500).send(internalServerError500);
  };
};
// -getContactsByCompanyId:
const getContactsByCompanyId = async (req, res, next) => {
  try {
    const listOfContacts = await selectContactsFromCompanyId(req.params.companyId)
    if (listOfContacts.length === 0) {
      okReponse200["Message"] = "Empty response: Either the companyId doesn't exist, or the companyId doesn't have any contact related.";
      okReponse200["Result"] = `No contacts were found related to the companyId '${req.params.companyId}'.`;
      okReponse200["ListOfContacts"] = false;
      req.contactsByCompanyId = okReponse200;
    } 
    else {
      req.CompanyFound = listOfContacts;
      // delete req.countryFound[0];
      okReponse200["Message"] = "City with related contacts found.";
      okReponse200["Result"] = listOfContacts;
      okReponse200["CompanyFound"] = true;
      req.contactsByCompanyId = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the country by ID.";
    return res.status(500).send(internalServerError500)
  };
};
// -updateContactById
const updateContactById = async (req, res, next) => {
  try {
    // If contact is NOT found, doesn't exist, the operation is stoped:
    if (!req.contactById["ContactFound"]) {
      okReponse200["Message"] = "Contact not found.";
      okReponse200["Result"] = `The contact with id ${req.params.contactId} doesn't exist, therefore,there is no information to be updated. Please proceed to the city creation endopoint.`;
      okReponse200["ContactFound"] = false;
      req.updateContactByID = okReponse200;
    };
    // If the contact IS found, the UPDATE query is executed:
    if (req.contactById["ContactFound"]) {
      // The UPDATE query returns an array. 
      const contact = await updateTableRegisterWhereIdIsValue("contacts", req.body, "id_contact", req.params.contactId);
      // // If array[1] === 0 -> No information was updated.
      if (contact[1] === 0) {
        conflictResponse409["Message"] = "No information was updated.";
        conflictResponse409["Result"] = `The information of the contact with id ${req.params.contactId} did not suffer any changes. The data that was sent matches exactly with the one already registered.`;
        conflictResponse409["ContactUpdated"] = false;
        req.updateContactByID = conflictResponse409;
        // // If array[1] === 1 -> Changes have been received and updated.
      } else if (contact[1] === 1) {
        okReponse200["Message"] = "contact information updated succesfully.";
        okReponse200["Result"] = req.body;
        okReponse200["ContactUpdated"] = true;
        req.updateContactByID = okReponse200;
      };
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while updating the contact's information by id.";
    return res.status(500).send(internalServerError500);
  };
};
// -deleteContactById
const deleteContactById = (req, res, next) => {
  try {
    if (!req.contactById["ContactFound"]) {
      okReponse200["Message"] = "Contact not found.";
      okReponse200["Result"] = `The contact with id ${req.params.contactId} doesn't exist, therefore no deletion can be done.`;
      okReponse200["ContactDeleted"] = false;
      req.contactDeletion = okReponse200;
    } else if (req.contactById["ContactFound"]) {
      const deleteContact = deleteTableRegisterWhereIdIsValue("contacts", "id_contact", req.params.contactId);
      okReponse200["ContactDeleted"] = true;
      req.contactDeletion = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while deleting the product by id.";
    return res.status(500).send(internalServerError500);
  };
};
// Exports:
module.exports = {
  createNewContact,
  getContactById,
  getContactByName,
  getAllContacts,
  getContactsFilter,
  getAllContactsChannels,
  getContactsByCompanyId,
  updateContactById,
  deleteContactById
};