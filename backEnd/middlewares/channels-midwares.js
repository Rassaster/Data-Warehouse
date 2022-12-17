// Import Server Responses:
const {  okReponse200, createdResponse201, conflictResponse409, internalServerError500 } = require("../serverResponses")
// Import MYSQL Queries functions:
const { newChannel, selectFromTableWhereFieldIsValue, selectAllFromTable, selectChannelsFromContactId, updateTableRegisterWhereIdIsValue, deleteTableRegisterWhereIdIsValue } = require("../sql/queries"); 
// ***************************************** MIDDLEWARES *********************************************
// -createNewChannel;
const createNewChannel = async (req, res, next) => {
  try {
    const { type_channel, account_channel, preference_channel, id_contact } = req.body;
    const createdChannel = await newChannel(type_channel, account_channel, preference_channel, id_contact); 
    createdResponse201["Message"] = "Channel created successfully.";
    const newCreatedChannel = {
      id_channel: createdChannel[0],
      type_channel: req.body.type_channel,
      account_channel: req.body.account_channel,
      preference_channel: req.body.preference_channel,
      id_contact: req.body.id_contact
    };
    createdResponse201["Result"] = newCreatedChannel;
    req.channelCreation = createdResponse201;
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
// -getChannelById:
const getChannelById = async (req, res, next) => {
  try {
    const channel = await selectFromTableWhereFieldIsValue("channels", "id_channel", req.params.channelId)
    if (channel.length === 0) {
      okReponse200["Message"] = "Channel not found.";
      okReponse200["Result"] = `The channel with id ${req.params.channelId} doesn't exist.`;
      okReponse200["ChannelFound"] = false;
      req.channelById = okReponse200;
    } 
    else {
      req.channelFound = channel;
      // delete req.channelFound[0];
      okReponse200["Message"] = "Channel found.";
      okReponse200["Result"] = channel[0];
      okReponse200["ChannelFound"] = true;
      req.channelById = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the channel by ID.";
    return res.status(500).send(internalServerError500)
  };
};

// -getAllChannels:
const getAllChannels = async (req, res, next) => {
  try {
    const channelsList = await selectAllFromTable("channels");
    okReponse200["Message"] = "List of all registered channels obtained.";
    okReponse200["Result"] = channelsList;
    req.getAllChannels = okReponse200
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while obtaining all the registered channels.";
    return res.status(500).send(internalServerError500);
  };
};
// -getChannelsByContactId:
const getChannelsByContactId = async (req, res, next) => {
  try {
    const listOfChannels = await selectChannelsFromContactId(req.params.contactId)
    if (listOfChannels.length === 0) {
      okReponse200["Message"] = "Empty response: Either the contactId doesn't exists, or the contactId doesn't have any channel related.";
      okReponse200["Result"] = [{}];
      okReponse200["ListOfChannels"] = false;
      req.channelsByContactId = okReponse200;
    } 
    else {
      req.contactFound = listOfChannels;
      // delete req.contactFound[0];
      okReponse200["Message"] = "Contact with related channels found.";
      okReponse200["Result"] = listOfChannels;
      okReponse200["ContactFound"] = true;
      okReponse200["contactId"] = req.params.contactId
      req.channelsByContactId = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the contact by ID.";
    return res.status(500).send(internalServerError500)
  };
};
// -updateChannelById
const updateChannelById = async (req, res, next) => {
  try {
    // If channel is NOT found, doesn't exist, the operation is stoped:
    if (!req.channelById["ChannelFound"]) {
      okReponse200["Message"] = "Channel not found.";
      okReponse200["Result"] = `The channel with id ${req.params.channelId} doesn't exist, therefore,there is no information to be updated. Please proceed to the channel creation endopoint.`;
      okReponse200["ChannelFound"] = false;
      req.updateChannelByID = okReponse200;
    };
    // If the channel IS found, the UPDATE query is executed:
    if (req.channelById["ChannelFound"]) {
      // The UPDATE query returns an array. 
      const channel = await updateTableRegisterWhereIdIsValue("channels", req.body, "id_channel", req.params.channelId);
      // // If array[1] === 0 -> No information was updated.
      if (channel[1] === 0) {
        conflictResponse409["Message"] = "No information was updated.";
        conflictResponse409["Result"] = `The information of the channel with id ${req.params.channelId} did not suffer any changes. The data that was sent matches exactly with the one already registered.`;
        conflictResponse409["ChannelUpdated"] = false;
        req.updateChannelByID = conflictResponse409;
        // // If array[1] === 1 -> Changes have been received and updated.
      } else if (channel[1] === 1) {
        okReponse200["Message"] = "Channel information updated succesfully.";
        okReponse200["Result"] = req.body;
        okReponse200["ChannelUpdated"] = true;
        req.updateChannelByID = okReponse200;
      };
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while updating the channel's information by id.";
    return res.status(500).send(internalServerError500);
  };
};
// -deleteChannelById
const deleteChannelById = (req, res, next) => {
  try {
    if (!req.channelById["ChannelFound"]) {
      okReponse200["Message"] = "Channel not found.";
      okReponse200["Result"] = `The channel with id ${req.params.channelId} doesn't exist, therefore no deletion can be done.`;
      okReponse200["ChannelDeleted"] = false;
      req.channelDeletion = okReponse200;
    } else if (req.channelById["ChannelFound"]) {
      const deleteChannel = deleteTableRegisterWhereIdIsValue("channels", "id_channel", req.params.channelId);
      okReponse200["ChannelDeleted"] = true;
      req.channelDeletion = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while deleting the product by id.";
    return res.status(500).send(internalServerError500);
  };
};
// Exports:
module.exports = {
  createNewChannel,
  getChannelById,
  getChannelsByContactId,
  getAllChannels,
  getChannelsByContactId,
  updateChannelById,
  deleteChannelById
};