// Requiring the base Environment Variables from .env file:
const dotenv = require("dotenv").config();
// Assigning the base Environment Variables to JS constants:
const JWT_SECRET = process.env.JWT_SECRET;
const PORT_SERVER = process.env.PORT_SERVER;
const PUERTO_DB = process.env.PUERTO;
const DIALECT_DB = process.env.DIALECT_DB;
const USER_DB = process.env.USER_DB;
const PASS_DB = process.env.PASS_DB;
const HOST_DB = process.env.HOST_DB;
const PORT_DB = process.env.PORT_DB;
const NAME_DB = process.env.NAME_DB;
// Exports:
module.exports = {
  JWT_SECRET,
  PORT_SERVER,
  PUERTO_DB,
  DIALECT_DB,
  USER_DB,
  PASS_DB,
  HOST_DB,
  PORT_DB,
  NAME_DB
}