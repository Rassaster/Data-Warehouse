// Import Server Responses:
const {  okReponse200, createdResponse201, conflictResponse409, internalServerError500 } = require("../serverResponses")
// Import MYSQL Queries functions:
const { newRegion, selectFromTableWhereFieldIsValue, selectAllFromTable, selectRegionsTree, updateTableRegisterWhereIdIsValue, deleteTableRegisterWhereIdIsValue } = require("../sql/queries"); 
// ***************************************** MIDDLEWARES *********************************************
// -createNewRegion:
const createNewRegion = async (req, res, next) => {
  try {
    const { acronym, name } = req.body;
    const createdRegion = await newRegion(acronym, name); 
    createdResponse201["Message"] = "Region created successfully.";
    const newCreatedRegion = {
      id_region: createdRegion[0],
      acronym: req.body.acronym,
      name: req.body.name
    };
    createdResponse201["Result"] = newCreatedRegion;
    req.regionCreation = createdResponse201;
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
// -getRegionById:
const getRegionById = async (req, res, next) => {
  try {
    const region = await selectFromTableWhereFieldIsValue("regions", "id_region", req.params.regionId)
    if (region.length === 0) {
      okReponse200["Message"] = "Region not found.";
      okReponse200["Result"] = `The region with id ${req.params.regionId} doesn't exist.`;
      okReponse200["RegionFound"] = false;
      req.regionById = okReponse200;
    } 
    else {
      req.regionFound = region;
      // delete req.regionFound[0];
      okReponse200["Message"] = "Region found.";
      okReponse200["Result"] = region[0];
      okReponse200["RegionFound"] = true;
      req.regionById = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the region by ID.";
    return res.status(500).send(internalServerError500)
  };
};
// -getRegionByName:
const getRegionByName = async (req, res, next) => {
  try {
    const region = await selectFromTableWhereFieldIsValue("regions", "name", req.params.regionName);
    if (region.length === 0) {
      okReponse200["Message"] = "Region not found.";
      okReponse200["Result"] = `The region '${req.params.regionName}' doesn't exist.`;
      okReponse200["RegionFound"] = false;
      req.regionByName = okReponse200;
    } else {
      req.regionFound = region;
      okReponse200["Message"] = "Region found.";
      okReponse200["Result"] = req.regionFound;
      okReponse200["RegionFound"] = true;
      req.regionByName = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the product by it's name.";
    return res.status(500).send(internalServerError500)
  };
};
// -getAllRegions:
const getAllRegions = async (req, res, next) => {
  try {
    const regionsList = await selectAllFromTable("regions");
    okReponse200["Message"] = "List of all registered regions obtained.";
    okReponse200["Result"] = regionsList;
    req.getAllRegions = okReponse200
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while obtaining all the registered regions.";
    return res.status(500).send(internalServerError500);
  };
};
// -getRegionsTree:
const getRegionsTree = async (req, res, next) => {
  try {
    const regionsTree = await selectRegionsTree();
    okReponse200["Message"] = "List of all registered regions related to countries and cities obtained.";
    okReponse200["Result"] = regionsTree;
    req.getRegionsTree = okReponse200
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while obtaining all the registered regions.";
    return res.status(500).send(internalServerError500);
  };
};
// -updateRegionById
const updateRegionById = async (req, res, next) => {
  try {
    // If region is NOT found, doesn't exist, the operation is stoped:
    if (!req.regionById["RegionFound"]) {
      okReponse200["Message"] = "Region not found.";
      okReponse200["Result"] = `The region with id ${req.params.regionId} doesn't exist, therefore,there is no information to be updated. Please proceed to the region creation endopoint.`;
      okReponse200["RegionFound"] = false;
      req.updateRegionByID = okReponse200;
    };
    // If the region IS found, the UPDATE query is executed:
    if (req.regionById["RegionFound"]) {
      // The UPDATE query returns an array. 
      const region = await updateTableRegisterWhereIdIsValue("regions", req.body, "id_region", req.params.regionId);
      // // If array[1] === 0 -> No information was updated.
      if (region[1] === 0) {
        conflictResponse409["Message"] = "No information was updated.";
        conflictResponse409["Result"] = `The information of the region with id ${req.params.regionId} did not suffer any changes. The data that was sent matches exactly with the one already registered.`;
        conflictResponse409["RegionUpdated"] = false;
        req.updateRegionByID = conflictResponse409;
        // // If array[1] === 1 -> Changes have been received and updated.
      } else if (region[1] === 1) {
        okReponse200["Message"] = "Reguib information updated succesfully.";
        okReponse200["Result"] = req.body;
        okReponse200["RegionUpdated"] = true;
        req.updateRegionByID = okReponse200;
      };
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while updating the region's information by id.";
    return res.status(500).send(internalServerError500);
  };
};
// -deleteRegionById
const deleteRegionById = (req, res, next) => {
  try {
    if (!req.regionById["RegionFound"]) {
      okReponse200["Message"] = "Region not found.";
      okReponse200["Result"] = `The region with id ${req.params.regionId} doesn't exist, therefore no deletion can be done.`;
      okReponse200["RegionDeleted"] = false;
      req.regionDeletion = okReponse200;
    } else if (req.regionById["RegionFound"]) {
      const deleteRegion = deleteTableRegisterWhereIdIsValue("regions", "id_region", req.params.regionId);
      okReponse200["RegionDeleted"] = true;
      req.regionDeletion = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while deleting the product by id.";
    return res.status(500).send(internalServerError500);
  };
};
// Exports:
module.exports = {
  createNewRegion,
  getRegionById,
  getRegionByName,
  getAllRegions,
  getRegionsTree,
  updateRegionById,
  deleteRegionById
};