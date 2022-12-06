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
  required: ["upd_name", "upd_last_name", "upd_email", "upd_profile", "upd_is_admin", "upd_user_password", "upd_user_password_confirmation"],
  properties: {
    upd_name: { type: "string"},
    upd_last_name: { type: "string"},
    upd_email: { type: "string", pattern: "^[A-Za-z0-9._-]*@[a-z]*[.]com$"},
    upd_profile: { type: "string"},
    upd_is_admin: { type: "string"},
    upd_user_password: { type: "string", pattern: "^[A-Za-z0-9.!#$%&‘*+=?^_`{|}~-]{6,}$"},
    upd_user_password_confirmation: { type: "string", pattern: "^[A-Za-z0-9.!#$%&‘*+=?^_`{|}~-]{6,}$"},
  }
};
const regionSchema = {
  type: "object",
  required: ["acronym", "name"],
  properties: {
    acronym: {type: "string"},
    name: {type: "string"},
  }
};
const countrySchema = {
  type: "object",
  required: ["acronym", "name", "id_region"],
  properties: {
    acronym: {type: "string"},
    name: {type: "string"},
    id_region: { type: "number", minimum: 1, maximum: 6}
  }
};
const citySchema = {
  type: "object",
  required: ["acronym", "name", "id_country"],
  properties: {
    acronym: {type: "string"},
    name: {type: "string"},
    id_country: { type: "number", minimum: 1, maximum: 6}
  }
};
const orderSchema = {
  type: "object",
  required: ["id_paying_method","products"],
  properties: {
    id_paying_method: {type: "number", minimum: 1, maximum: 4},
    products: {type: "array"}
  }
};
const updateOrderStatusSchema = {
  type: "object",
  required: ["id_order_status"],
  properties: {
    id_order_status: { type: "number", minimum: 1, maximum: 6}
  }
};
// Exports:
module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
  regionSchema,
  countrySchema,
  citySchema
  // updateOrderStatusSchema
};