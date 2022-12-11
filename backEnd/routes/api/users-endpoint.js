const router = require("express").Router();
// Requiring JSON schemas:
const {registerSchema, loginSchema, updateUserSchema} = require("../../schema/schemas");
// ******************** MIDDLEWARES ******************** //
// Schema middlewares:
const { validateJSONSchema } = require("../../middlewares/JSONvalidation");
// Security/Credentials middlewares:
const { hashPassword, verifyPassword, checkUserPermissions, justAdminGate, } = require("../../middlewares/users-midwares");
// Users validation middlewares:
const { checkEmailRegistration, userExistanceCheckByEmailLogin } = require("../../middlewares/users-midwares");
// JWT middlewares:
const { jwtokenGenerator, jwtokenExtraction, jwtokenVerification } = require("../../middlewares/jwtoken");
// CRUD middlewares:
const { createNewUser, getUserById, getAllUsers, getUserByUsername, getUserByEmail, updateUserById, deleteUserById } = require("../../middlewares/users-midwares");
// ******************** ENDPOINTS ******************** //
// -> /delilahResto/users/register (either as User or Admin):
router.post("/register", validateJSONSchema(registerSchema), checkEmailRegistration, hashPassword, createNewUser, (req, res) => {
  if (req.userCreation["Status"] === 201) {
    res.status(201).json(req.userCreation);
  };
});
// -> /delilahResto/users/login (either as User or Admin):
router.post("/login", validateJSONSchema(loginSchema), userExistanceCheckByEmailLogin, verifyPassword, jwtokenGenerator, (req, res) => {
  console.log(req.userInfo[0].is_admin)
  if (req.userAuthentication["Status"] === 200) {
    req.userAuthentication["IsAdmin"] = req.userInfo[0].is_admin;
    req.userAuthentication["Token"] = req.jwtoken;
    res.status(200).json(req.userAuthentication);
    delete req.userAuthentication["Token"];
  };
});
// -> /delilahResto/users/allRegistered -> Just Admin: Get the list of all of the registered users:
router.get("/allRegistered", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getAllUsers, (req, res) => {
  if (req.getAllUsers["Status"] === 401) {
    res.status(401).json(req.getAllUsers);
  } else if (req.getAllUsers["Status"] === 200) {
    res.status(200).json(req.getAllUsers);
  };
});




// Exports:
module.exports = router;