// Requiring NPM libraries:
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require('cors');
const rateLimit = require("express-rate-limit");

// Requiring Data Base connection's module from dbConnect.js:
require("./dataBase/dbConnect")

// Requiring Environment Variables from config.js: 
const { PORT_SERVER } = require("./config");
// Base Router: Requiring apiRouter from routes.js.
const apiRouter = require("./routes/apiRoutes");

// Defining the requests limit per IP:
const requestLimit = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 mins
  max: 25
});

// Global Middlewares:
app.use(cors()); //Enable CORS Origin *
app.use(helmet());
app.use(requestLimit);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Opening main API route:
app.use("/dataWarehouse", apiRouter);

// Lifting up the Server:
app.listen(PORT_SERVER, () => {
  console.log("Your are located in the server that host's Data Warehouse. Port:", PORT_SERVER);
});