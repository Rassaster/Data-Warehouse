const registerSchema = {
  type: "object",
  required: ["name", "last_name", "email", "profile", "is_admin", "user_password"],
  properties: {
    name: { type: "string"},
    last_name: { type: "string"},
    email: { type: "string", pattern: "^[A-Za-z0-9._-]*@[a-z]*[.]com$"},
    profile: { type: "string"},
    is_admin: { type: "string"},
    user_password: { type: "string", pattern: "^[A-Za-z0-9.!#$%&‘*+=?^_`{|}~-]{6,}$"},
  }
};
const loginSchema = {
  type: "object",
  required: ["email", "user_password"],
  properties: {
    email: { type: "string", pattern: "^[A-Za-z0-9._-]*@[a-z]*[.]com$"},
    user_password: { type: "string", pattern: "^[A-Za-z0-9.!#$%&‘*+=?^_`{|}~-]{4,}$"}
  }
};
const updateUserSchema = {
  type: "object",
  required: ["name", "last_name", "email", "profile", "is_admin", "user_password"],
  properties: {
    name: { type: "string"},
    last_name: { type: "string"},
    email: { type: "string", pattern: "^[A-Za-z0-9._-]*@[a-z]*[.]com$"},
    profile: { type: "string"},
    is_admin: { type: "string"},
    user_password: { type: "string", pattern: "^[A-Za-z0-9.!#$%&‘*+=?^_`{|}~-]{6,}$"},
  }
};
const regionSchema = {
  type: "object",
  required: ["acronym_region", "name_region"],
  properties: {
    acronym_region: {type: "string"},
    name_region: {type: "string"},
  }
};
const countrySchema = {
  type: "object",
  required: ["acronym_country", "name_country", "id_region"],
  properties: {
    acronym_country: {type: "string"},
    name_country: {type: "string"},
    id_region: { type: "number", minimum: 1, maximum: 100}
  }
};
const citySchema = {
  type: "object",
  required: ["acronym_city", "name_city", "id_country"],
  properties: {
    acronym_city: {type: "string"},
    name_city: {type: "string"},
    id_country: { type: "number", minimum: 1, maximum: 400}
  }
};
const companySchema = {
  type: "object",
  required: ["name_company", "address_company", "email_company", "phone_company", "id_city"],
  properties: {
    name_company: {type: "string"},
    address_company: {type: "string"},
    email_company: { type: "string", pattern: "^[A-Za-z0-9._-]*@[a-z]*[.]com$"},
    phone_company: {type: "string"},
    id_city: {type: "number"},
    
  }
};
const contactSchema = {
  type: "object",
  required: ["name_contact", "lastName_contact", "profile_contact", "email_contact", "id_company"],
  properties: {
    name_contact: {type: "string"},
    lastName_contact: {type: "string"},
    profile_contact: {type: "string"},
    email_contact: { type: "string", pattern: "^[A-Za-z0-9._-]*@[a-z]*[.]com$"},
    id_company: {type: "number"},
    interest_contact: {type: "string"}
  }
};
const channelSchema = {
  type: "object",
  required: ["type_channel", "account_channel", "preference_channel", "id_contact"],
  properties: {
    type_channel: {type: "string"},
    account_channel: {type: "string"},
    preference_channel: {type: "string"},
    id_contact: {type: "number"}
  }
};
// Exports:
module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
  regionSchema,
  countrySchema,
  citySchema,
  companySchema,
  contactSchema,
  channelSchema
  // updateOrderStatusSchema
};