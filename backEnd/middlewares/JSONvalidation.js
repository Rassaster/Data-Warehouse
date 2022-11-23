const Ajv = require("ajv");
const ajv = new Ajv({allErrors: true});
const { badRequesResponse400 } = require("../serverResponses");
// Check and validate the incoming JSON format:
const validateJSONSchema = schema => {
  return function (req, res, next) {
    const validate = ajv.compile(schema);
    const incomingData = req.body;
    const valid = validate(incomingData);
    if (valid){
      return next();
    };
    if (!valid) {
      // Temporal storage variables:
      let missingPropertiesArr = [];
      let requiredPropertiesStr = "";
      let unmatchedPatternArr = [];
      let unmatchedPatternStr = "";
      let unmatchedPatternArrForm = [];

      // Updating the Message and Result in the badRequesResponse400{}:
      badRequesResponse400["Message"] = "The request body information is not in the propper format. Please review the API Documentation in relation to the JSON format expected.";
      badRequesResponse400["Result"] = "The request could not be completed. No data was registered nor updated.";

      // validate.errors is the array of errors that Ajv manages.
      // With a For Loop, the length of the array is checked.
      // Two types of errors are meant to be found: "missingProperty" and/or "instancePath".
      // If found, the important data of each one is pushed to their correspondant array.
      for (i = 0; i < (validate.errors).length; i++) {
        if (validate.errors[i]["params"]["missingProperty"]) {
          missingPropertiesArr.push(`'${validate.errors[i]["params"]["missingProperty"]}'`);
        };
        if (validate.errors[i]["instancePath"] !== "") {
          unmatchedPatternArr.push(`${validate.errors[i]["instancePath"]} ${validate.errors[i]["message"]}`);
        };
      };
      // If the array "missingPropertiesArr" is not empty, it will be converted to a string, and a new propertie ("MissingProperties") will be created in the badRequesResponse400{} with a formated string.
      if (missingPropertiesArr.length !== 0) {
        requiredPropertiesStr = missingPropertiesArr.toString(" ");
        badRequesResponse400["MissingProperties"] = "The following properties are missing and are required: " + requiredPropertiesStr.slice(0);
      };
      // If the array "unmatchedPatternArr" is not empty, it will be converted to a string, and a new propertie ("MissingProperties") will be created in the badRequesResponse400{} with a formated string.
      if (unmatchedPatternArr.length != 0) {
        unmatchedPatternArrForm = unmatchedPatternArr.map(i => i.concat("  &&  "));
        unmatchedPatternStr = unmatchedPatternArrForm.toString("");
        badRequesResponse400["UnmatchedPatterns"] = "The following properties must match the pattern of characters as shown: " + unmatchedPatternStr.slice(0, -6);
      };
      res.status(400).send(badRequesResponse400);
      // The "MissingProperties" and "UnmatchedPatterns" properties are deleted from the badRequesResponse400{} before ending this command.
      delete badRequesResponse400["MissingProperties"];
      delete badRequesResponse400["UnmatchedPatterns"];
      return;
    };
  };
};
// Module Exports:
module.exports = {
  validateJSONSchema
};