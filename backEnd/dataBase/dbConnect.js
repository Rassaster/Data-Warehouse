// Requiring NPM Libraries:
const Sequelize = require("sequelize");
const mysql = require("mysql2");
// Requiring Environment Variables from congif.js:
const {DIALECT_DB, USER_DB, PASS_DB, PORT_DB, HOST_DB, NAME_DB} = require("../config");
// Creating the link to the Data Base based on the Environment Variables:
const sequelize = new Sequelize(`${DIALECT_DB}://${USER_DB}:${PASS_DB}@${HOST_DB}:${PORT_DB}/${NAME_DB}`);
// Connecting to the Data Base and logging in console the success/failure of the process:
sequelize.authenticate()
  .then(()=>{
    console.log(`You have connected to the Data Base: ${NAME_DB}.`);
  })
  .catch(err => {
    console.log("An error has occurred in the attemp to connect to the Data Base:", err);
  })
// Exports:
module.exports = sequelize;