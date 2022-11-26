// Requiring "Router" object from "Express":
const router = require("express").Router();
const apiUsers = require("./api/users-endpoint");
const apiRegions = require("./api/regions-endpoints");
// const apiOrders = require("./api/orders-endpoint");

router.use("/users", apiUsers);
router.use("/regions", apiRegions);
// router.use("/orders", apiOrders);

// Exports:
module.exports = router;