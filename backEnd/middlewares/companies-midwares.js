const moment = require("moment");
// Import Server Responses:
const {  okReponse200, createdResponse201, conflictResponse409, internalServerError500 } = require("../serverResponses")
// Import MYSQL Queries functions:
const { newCompany, selectFromTableWhereFieldIsValue, selectAllFromTable, selectCompaniesFromCityId, selectProductsJoinCategories, updateTableRegisterWhereIdIsValue, deleteTableRegisterWhereIdIsValue } = require("../sql/queries"); 
// ***************************************** MIDDLEWARES *********************************************
// -createNewCompany;
// Register a new user:
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
// -getCityByName:
const getCityByName = async (req, res, next) => {
  try {
    const city = await selectFromTableWhereFieldIsValue("cities", "name", req.params.cityName);
    if (city.length === 0) {
      okReponse200["Message"] = "City not found.";
      okReponse200["Result"] = `The city '${req.params.cityName}' doesn't exist.`;
      okReponse200["CityFound"] = false;
      req.cityByName = okReponse200;
    } else {
      req.cityFound = city;
      okReponse200["Message"] = "City found.";
      okReponse200["Result"] = req.cityFound;
      okReponse200["CityFound"] = true;
      req.cityByName = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the product by it's name.";
    return res.status(500).send(internalServerError500)
  };
};
// -getAllCities:
const getAllCities = async (req, res, next) => {
  try {
    const citiesList = await selectAllFromTable("cities");
    okReponse200["Message"] = "List of all registered cities obtained.";
    okReponse200["Result"] = citiesList;
    req.getAllCities = okReponse200
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while obtaining all the registered cities.";
    return res.status(500).send(internalServerError500);
  };
};
// -getCitiesByCountryId:
const getCitiesByCountryId = async (req, res, next) => {
  try {
    const listOfCities = await selectCitiesFromCountryId(req.params.countryId)
    if (listOfCities.length === 0) {
      okReponse200["Message"] = "Empty response: Either the countryId doesn't exists, or the countryId doesn't have any city related.";
      okReponse200["Result"] = `The region with id ${req.params.countryId} doesn't exist.`;
      okReponse200["ListOfCities"] = false;
      req.citiesByCountryId = okReponse200;
    } 
    else {
      req.countryFound = listOfCities;
      // delete req.countryFound[0];
      okReponse200["Message"] = "Country with related cities found.";
      okReponse200["Result"] = listOfCities;
      okReponse200["RegionFound"] = true;
      req.citiesByCountryId = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the country by ID.";
    return res.status(500).send(internalServerError500)
  };
};
// -updateCityById
const updateCityById = async (req, res, next) => {
  try {
    // If city is NOT found, doesn't exist, the operation is stoped:
    if (!req.cityById["CityFound"]) {
      okReponse200["Message"] = "City not found.";
      okReponse200["Result"] = `The city with id ${req.params.cityId} doesn't exist, therefore,there is no information to be updated. Please proceed to the city creation endopoint.`;
      okReponse200["CityFound"] = false;
      req.updateCityByID = okReponse200;
    };
    // If the city IS found, the UPDATE query is executed:
    if (req.cityById["CityFound"]) {
      // The UPDATE query returns an array. 
      const city = await updateTableRegisterWhereIdIsValue("cities", req.body, "id_city", req.params.cityId);
      // // If array[1] === 0 -> No information was updated.
      if (city[1] === 0) {
        conflictResponse409["Message"] = "No information was updated.";
        conflictResponse409["Result"] = `The information of the city with id ${req.params.cityId} did not suffer any changes. The data that was sent matches exactly with the one already registered.`;
        conflictResponse409["CityUpdated"] = false;
        req.updateCityByID = conflictResponse409;
        // // If array[1] === 1 -> Changes have been received and updated.
      } else if (city[1] === 1) {
        okReponse200["Message"] = "Reguib information updated succesfully.";
        okReponse200["Result"] = req.body;
        okReponse200["CityUpdated"] = true;
        req.updateCityByID = okReponse200;
      };
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while updating the city's information by id.";
    return res.status(500).send(internalServerError500);
  };
};
// -deleteCityById
const deleteCityById = (req, res, next) => {
  try {
    if (!req.cityById["CityFound"]) {
      okReponse200["Message"] = "City not found.";
      okReponse200["Result"] = `The city with id ${req.params.cityId} doesn't exist, therefore no deletion can be done.`;
      okReponse200["CityDeleted"] = false;
      req.cityDeletion = okReponse200;
    } else if (req.cityById["CityFound"]) {
      const deleteCity = deleteTableRegisterWhereIdIsValue("cities", "id_city", req.params.cityId);
      okReponse200["CityDeleted"] = true;
      req.cityDeletion = okReponse200;
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
  getCityByName,
  getAllCities,
  getCitiesByCountryId,
  updateCityById,
  deleteCityById
};