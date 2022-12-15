const moment = require("moment");
// Import Server Responses:
const {  okReponse200, createdResponse201, conflictResponse409, internalServerError500 } = require("../serverResponses")
// Import MYSQL Queries functions:
const { newCompany, selectFromTableWhereFieldIsValue, selectAllFromTable, selectAllCompaniesWithLocations, selectCompaniesFromCityId, updateTableRegisterWhereIdIsValue, deleteTableRegisterWhereIdIsValue } = require("../sql/queries"); 
// ***************************************** MIDDLEWARES *********************************************
// -createNewCompany;
// Register a new company:
const createNewCompany = async (req,res, next) => {
  try {
    let date = moment().format('YYYY-MM-DD HH:mm:ss');
    const {name_company, address_company, email_company, phone_company, id_city} = req.body;
    const newRegister = await newCompany(date, name_company, address_company, email_company, phone_company, id_city);
    const createdCompany = {
      name_company: req.body.name_company,
      address_company: req.body.address_company,
      email_company: req.body.email_company,
      phone_company: req.body.phone_company,
      id_city: req.body.id_city,
      company_id: newRegister[0]
    };
    createdResponse201["Message"] = "Company created successfully.";
    createdResponse201["Result"] = createdCompany;
    req.companyCreation = createdResponse201;
    return next();
  } catch (error) {
    internalServerError500["Message"] = error.sqlMessage;
    internalServerError500["Description"] = "Please review the API Documentation in relation to the JSON format expected.";
    internalServerError500["ReceivedQueryJSON"] = req.body;
    res.status(500).send(internalServerError500);
    delete internalServerError500["Description"];
    delete internalServerError500["ReceivedQueryJSON"];
    return;
  };
};
// -getCompanyById:
const getCompanyById = async (req, res, next) => {
  try {
    const company = await selectFromTableWhereFieldIsValue("companies", "id_company", req.params.companyId)
    if (company.length === 0) {
      okReponse200["Message"] = "Company not found.";
      okReponse200["Result"] = `The company with id ${req.params.companyId} doesn't exist.`;
      okReponse200["CompanyFound"] = false;
      req.companyById = okReponse200;
    } 
    else {
      req.companyFound = company;
      okReponse200["Message"] = "Company found.";
      okReponse200["Result"] = company[0];
      okReponse200["CompanyFound"] = true;
      req.companyById = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the city by ID.";
    return res.status(500).send(internalServerError500)
  };
};
// -getCompanyByName:
const getCompanyByName = async (req, res, next) => {
  try {
    const company = await selectFromTableWhereFieldIsValue("companies", "name_company", req.params.companyName);
    if (company.length === 0) {
      okReponse200["Message"] = "Company not found.";
      okReponse200["Result"] = `The company '${req.params.companyName}' doesn't exist.`;
      okReponse200["CompanyFound"] = false;
      req.companyByName = okReponse200;
    } else {
      req.companyFound = company;
      okReponse200["Message"] = "Company found.";
      okReponse200["Result"] = req.companyFound;
      okReponse200["CompanyFound"] = true;
      req.companyByName = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the product by it's name.";
    return res.status(500).send(internalServerError500)
  };
};
// -getAllCompanies:
const getAllCompanies = async (req, res, next) => {
  try {
    const companiesList = await selectAllCompaniesWithLocations();
    okReponse200["Message"] = "List of all registered companies obtained.";
    okReponse200["Result"] = companiesList;
    req.getAllCompanies = okReponse200
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while obtaining all the registered cities.";
    return res.status(500).send(internalServerError500);
  };
};
// -getCompaniesByCityId:
const getCompaniesByCityId = async (req, res, next) => {
  try {
    const listOfCompanies = await selectCompaniesFromCityId(req.params.cityId)
    if (listOfCompanies.length === 0) {
      okReponse200["Message"] = "Empty response: Either the cityId doesn't exist, or the cityId doesn't have any company related.";
      okReponse200["Result"] = `No companies were found related to the cityId '${req.params.cityId}'.`;
      okReponse200["ListOfCompanies"] = false;
      req.companiesByCityId = okReponse200;
    } 
    else {
      req.CompanyFound = listOfCompanies;
      // delete req.countryFound[0];
      okReponse200["Message"] = "City with related companies found.";
      okReponse200["Result"] = listOfCompanies;
      okReponse200["CompanyFound"] = true;
      req.companiesByCityId = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the country by ID.";
    return res.status(500).send(internalServerError500)
  };
};
// -updateCompanyById
const updateCompanyById = async (req, res, next) => {
  try {
    // If company is NOT found, doesn't exist, the operation is stoped:
    if (!req.companyById["CompanyFound"]) {
      okReponse200["Message"] = "Company not found.";
      okReponse200["Result"] = `The company with id ${req.params.companyId} doesn't exist, therefore,there is no information to be updated. Please proceed to the city creation endopoint.`;
      okReponse200["CompanyFound"] = false;
      req.updateCompanyByID = okReponse200;
    };
    // If the company IS found, the UPDATE query is executed:
    if (req.companyById["CompanyFound"]) {
      // The UPDATE query returns an array. 
      const company = await updateTableRegisterWhereIdIsValue("companies", req.body, "id_company", req.params.companyId);
      // // If array[1] === 0 -> No information was updated.
      if (company[1] === 0) {
        conflictResponse409["Message"] = "No information was updated.";
        conflictResponse409["Result"] = `The information of the company with id ${req.params.companyId} did not suffer any changes. The data that was sent matches exactly with the one already registered.`;
        conflictResponse409["CompanyUpdated"] = false;
        req.updateCompanyByID = conflictResponse409;
        // // If array[1] === 1 -> Changes have been received and updated.
      } else if (company[1] === 1) {
        okReponse200["Message"] = "Company information updated succesfully.";
        okReponse200["Result"] = req.body;
        okReponse200["CompanyUpdated"] = true;
        req.updateCompanyByID = okReponse200;
      };
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while updating the company's information by id.";
    return res.status(500).send(internalServerError500);
  };
};
// -deleteCompanyById
const deleteCompanyById = (req, res, next) => {
  try {
    if (!req.companyById["CompanyFound"]) {
      okReponse200["Message"] = "Company not found.";
      okReponse200["Result"] = `The company with id ${req.params.companyId} doesn't exist, therefore no deletion can be done.`;
      okReponse200["CompanyDeleted"] = false;
      req.companyDeletion = okReponse200;
    } else if (req.companyById["CompanyFound"]) {
      const deleteCompany = deleteTableRegisterWhereIdIsValue("companies", "id_company", req.params.companyId);
      okReponse200["CompanyDeleted"] = true;
      req.companyDeletion = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while deleting the product by id.";
    return res.status(500).send(internalServerError500);
  };
};
// Exports:
module.exports = {
  createNewCompany,
  getCompanyById,
  getCompanyByName,
  getAllCompanies,
  getCompaniesByCityId,
  updateCompanyById,
  deleteCompanyById
};