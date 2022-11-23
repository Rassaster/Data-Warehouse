// *************************************** RESPONSE MESSAGES ******************************************
const okReponse200 = {
  Status: 200,
  Message: "",
  Result: []
};
const createdResponse201 = {
  Status: 201,
  Message: "User created successfully.",
  Result : []
};
const badRequesResponse400 = {
  Status: 400,
  Message: "",
  Result: ""
};
const unauthorizedResponse401 = {
  Status: 401,
  Message: "The user's cretendials doesn't allow them to complete this request. Only an Administrator has the authorization.",
  Result: "Unauthorized."
};
const forbiddenResponse403 = {
  Status: 403,
  Message: "",
  Result: "Forbidden access."
};
const conflictResponse409 = {
  Status: 409,
  Message: " ",
  Result: "Conflict."
};
const internalServerError500 = {
  Satus: 500,
  Message: " ",
  Restult: "Internal Server Error."
};
// Exports:
module.exports = {
  okReponse200,
  createdResponse201,
  unauthorizedResponse401,
  badRequesResponse400,
  forbiddenResponse403,
  conflictResponse409,
  internalServerError500
};