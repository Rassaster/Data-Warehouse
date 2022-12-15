const router = require("express").Router();
// Requiring JSON schemas:
const { channelSchema } = require("../../schema/schemas");
// ******************** MIDDLEWARES ******************** //
// Schema middlewares:
const { validateJSONSchema } = require("../../middlewares/JSONvalidation");
// JWT middlewares:
const { jwtokenExtraction, jwtokenVerification } = require("../../middlewares/jwtoken");
// Security/Credentials middlewares:
const { checkUserPermissions, justAdminGate } = require("../../middlewares/users-midwares");
// CRUD middlewares:
const { createNewChannel, getChannelById, getAllChannels, getChannelsByContactId, updateChannelById, deleteChannelById } = require("../../middlewares/channels-midwares");
// ******************** ENDPOINTS ******************** //
// -> /dataWarehouse/channels/create Create new channel. Just Admin:
router.post("/create", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, validateJSONSchema(channelSchema), createNewChannel, (req, res) => {
  if (req.channelCreation["Status"] === 201) {
    res.status(201).json(req.channelCreation)
  };
});
// -> /dataWarehouse/channels/channelId:{channelId}. Admin and User:
router.get("/channelId::channelId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getChannelById, (req, res) =>{
  res.status(200).json(req.channelById);
  delete req.channelById["ChannelFound"];
});
// -> /dataWarehouse/channels. For both Admins and Users.
router.get("/listAll", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getAllChannels, (req, res) => {
  res.status(200).json(req.getAllChannels);
});
// -> /dataWarehouse/channels/contactId:{contactId}. Admin and User:
router.get("/contactId::contactId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getChannelsByContactId, (req, res) =>{
  res.status(200).json(req.channelsByContactId);
  delete req.channelsByContactId["ChannelsFound"];
});
// Update channel by Id:
// -> /dataWarehouse/channels/updateChannelId::{channelId}. Admin and User:
router.put("/updateChannelId::channelId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getChannelById, validateJSONSchema(channelSchema), updateChannelById, (req, res) => {
  if (!req.updateChannelByID["ChannelFound"]) {
    res.status(200).json(req.updateChannelByID);
  } else if (!req.updateChannelByID["ChannelUpdated"]) {
    res.status(409).json(req.updateChannelByID);
  } else if (req.updateChannelByID["ChannelUpdated"]) {
    res.status(204).json(req.updateChannelByID);
  };
  delete req.channelById["ChannelFound"];
  delete req.updateChannelByID["ChannelUpdated"];
});
// -> /dataWarehouse/channels/deleteChannelId::{channelId}. Admin and User:
router.delete("/deleteChannelId::channelId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getChannelById, deleteChannelById, (req, res) => {
  if (!req.channelDeletion["ChannelDeleted"]) {
    res.status(200).json(req.channelDeletion);
  } else {
    res.status(204).send("");
  };
  delete req.channelById["ChannelFound"];
  delete req.channelDeletion["ChannelDeleted"];
});


// Exports:
module.exports = router;