const express = require("express");
const serverFront = express();
const cors = require("cors");
const routes = require("./routes/routes.js");

// Allow Cross-origin resource sharing (cors);
serverFront.use(cors());
// Configure Views with EJS:
serverFront.set('view engine', 'ejs');
// Public managament of static files:
serverFront.use(express.static('public'));
// Routes management::
serverFront.use("/dataWarehouse", routes);


// Lifting up the server:
serverFront.listen(8000, () => {
  console.log("Welcome to the Data Warehouse's FRONT END! Port:", 8000);
});