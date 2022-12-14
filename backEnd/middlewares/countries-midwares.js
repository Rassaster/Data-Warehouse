// Import Server Responses:
const {  okReponse200, createdResponse201, conflictResponse409, internalServerError500 } = require("../serverResponses")
// Import MYSQL Queries functions:
const { newCountry, selectFromTableWhereFieldIsValue, selectAllFromTable, selectCountriesFromRegionId, selectProductsJoinCategories, updateTableRegisterWhereIdIsValue, deleteTableRegisterWhereIdIsValue } = require("../sql/queries"); 
// ***************************************** MIDDLEWARES *********************************************
// -createNewCountry;
const createNewCountry = async (req, res, next) => {
  try {
    const { acronym_country, name_country, id_region } = req.body;
    const createdCountry = await newCountry(acronym_country, name_country, id_region); 
    createdResponse201["Message"] = "Country created successfully.";
    const newCreatedCountry = {
      id_country: createdCountry[0],
      acronym_country: req.body.acronym_country,
      name_country: req.body.name_country,
      id_region: req.body.id_region
    };
    createdResponse201["Result"] = newCreatedCountry;
    req.countryCreation = createdResponse201;
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
// -getCountryById:
const getCountryById = async (req, res, next) => {
  try {
    const country = await selectFromTableWhereFieldIsValue("countries", "id_country", req.params.countryId)
    if (country.length === 0) {
      okReponse200["Message"] = "Country not found.";
      okReponse200["Result"] = `The country with id ${req.params.countryId} doesn't exist.`;
      okReponse200["CountryFound"] = false;
      req.countryById = okReponse200;
    } 
    else {
      req.countryFound = country;
      // delete req.countryFound[0];
      okReponse200["Message"] = "Country found.";
      okReponse200["Result"] = country[0];
      okReponse200["CountryFound"] = true;
      req.countryById = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the country by ID.";
    return res.status(500).send(internalServerError500)
  };
};
// -getCountryByName:
const getCountryByName = async (req, res, next) => {
  try {
    const country = await selectFromTableWhereFieldIsValue("countries", "name_country", req.params.countryName);
    if (country.length === 0) {
      okReponse200["Message"] = "Country not found.";
      okReponse200["Result"] = `The country '${req.params.countryName}' doesn't exist.`;
      okReponse200["CountryFound"] = false;
      req.countryByName = okReponse200;
    } else {
      req.countryFound = country;
      okReponse200["Message"] = "Country found.";
      okReponse200["Result"] = req.countryFound;
      okReponse200["CountryFound"] = true;
      req.countryByName = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the product by it's name.";
    return res.status(500).send(internalServerError500)
  };
};
// -getAllCountries:
const getAllCountries = async (req, res, next) => {
  try {
    const countriesList = await selectAllFromTable("countries");
    okReponse200["Message"] = "List of all registered countries obtained.";
    okReponse200["Result"] = countriesList;
    req.getAllCountries = okReponse200
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while obtaining all the registered countries.";
    return res.status(500).send(internalServerError500);
  };
};
// -getCountriesByRegionId:
const getCountriesByRegionId = async (req, res, next) => {
  try {
    const listOfCountries = await selectCountriesFromRegionId(req.params.regionId)
    if (listOfCountries.length === 0) {
      okReponse200["Message"] = "Empty response: Either the regionId doesn't exists, or the regionId doesn't have any country related.";
      okReponse200["Result"] = `The region with id ${req.params.regionId} doesn't exist.`;
      okReponse200["ListOfCountries"] = false;
      req.countriesByRegionId = okReponse200;
    } 
    else {
      req.regionFound = listOfCountries;
      // delete req.countryFound[0];
      okReponse200["Message"] = "Region with related countries found.";
      okReponse200["Result"] = listOfCountries;
      okReponse200["RegionFound"] = true;
      okReponse200["RegionId"] = req.params.regionId;
      req.countriesByRegionId = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the country by ID.";
    return res.status(500).send(internalServerError500)
  };
};
// -updateCountryById
const updateCountryById = async (req, res, next) => {
  try {
    // If country is NOT found, doesn't exist, the operation is stoped:
    if (!req.countryById["CountryFound"]) {
      okReponse200["Message"] = "Country not found.";
      okReponse200["Result"] = `The country with id ${req.params.countryId} doesn't exist, therefore,there is no information to be updated. Please proceed to the country creation endopoint.`;
      okReponse200["CountryFound"] = false;
      req.updateCountryByID = okReponse200;
    };
    // If the country IS found, the UPDATE query is executed:
    if (req.countryById["CountryFound"]) {
      // The UPDATE query returns an array. 
      const country = await updateTableRegisterWhereIdIsValue("countries", req.body, "id_country", req.params.countryId);
      // // If array[1] === 0 -> No information was updated.
      if (country[1] === 0) {
        conflictResponse409["Message"] = "No information was updated.";
        conflictResponse409["Result"] = `The information of the country with id ${req.params.countryId} did not suffer any changes. The data that was sent matches exactly with the one already registered.`;
        conflictResponse409["CountryUpdated"] = false;
        req.updateCountryByID = conflictResponse409;
        // // If array[1] === 1 -> Changes have been received and updated.
      } else if (country[1] === 1) {
        okReponse200["Message"] = "Country information updated succesfully.";
        okReponse200["Result"] = req.body;
        okReponse200["CountryUpdated"] = true;
        req.updateCountryByID = okReponse200;
      };
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while updating the country's information by id.";
    return res.status(500).send(internalServerError500);
  };
};
// -deleteCountryById
const deleteCountryById = (req, res, next) => {
  try {
    if (!req.countryById["CountryFound"]) {
      okReponse200["Message"] = "Country not found.";
      okReponse200["Result"] = `The country with id ${req.params.countryId} doesn't exist, therefore no deletion can be done.`;
      okReponse200["CountryDeleted"] = false;
      req.countryDeletion = okReponse200;
    } else if (req.countryById["CountryFound"]) {
      const deleteCountry = deleteTableRegisterWhereIdIsValue("countries", "id_country", req.params.countryId);
      okReponse200["CountryDeleted"] = true;
      req.countryDeletion = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while deleting the product by id.";
    return res.status(500).send(internalServerError500);
  };
};
// Exports:
module.exports = {
  createNewCountry,
  getCountryById,
  getCountryByName,
  getAllCountries,
  getCountriesByRegionId,
  updateCountryById,
  deleteCountryById
};