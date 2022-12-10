// Requiring Data Base connection's module from dbConnect.js:
const sequelize = require("../dataBase/dbConnect");
// ***** SQL INSERT QUERIES *****
// INSERT create new user in Users:
const newUser =  (last_update, name, last_name, email, profile, is_admin, user_password, salt) => {
  return sequelize.query("INSERT INTO users(last_update, name, last_name, email, profile, is_admin, user_password, salt) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", {
    replacements: [last_update, name, last_name, email, profile, is_admin, user_password, salt],
    type: sequelize.QueryTypes.INSERT
  });
};
// INSERT create new region in Regions:
const newRegion =  (acronym_region, name_region) => {
  return sequelize.query("INSERT INTO regions(acronym_region, name_region) VALUES(?, ?)", {
    replacements: [acronym_region, name_region],
    type: sequelize.QueryTypes.INSERT
  });
};
// INSERT create new country in Countries:
const newCountry =  (acronym_country, name_country, id_region) => {
  return sequelize.query("INSERT INTO countries(acronym_country, name_country, id_region) VALUES(?, ?, ?)", {
    replacements: [acronym_country, name_country, id_region],
    type: sequelize.QueryTypes.INSERT
  });
};
// INSERT create new city in Cities:
const newCity =  (acronym_city, name_city, id_country) => {
  return sequelize.query("INSERT INTO cities(acronym_city, name_city, id_country) VALUES(?, ?, ?)", {
    replacements: [acronym_city, name_city, id_country],
    type: sequelize.QueryTypes.INSERT
  });
};
// INSERT create new company in Companies:
const newCompany =  (last_update, name_company, address_company, email_company, phone_company, id_city) => {
  return sequelize.query("INSERT INTO companies(last_update, name_company, address_company, email_company, phone_company, id_city) VALUES(?, ?, ?, ?, ?, ?)", {
    replacements: [last_update, name_company, address_company, email_company, phone_company, id_city],
    type: sequelize.QueryTypes.INSERT
  });
};
const newContact =  (last_update, name_contact, lastName_contact, email_contact, address_contact, channels_contact, id_company) => {
  return sequelize.query("INSERT INTO contacts(last_update, name_contact, lastName_contact, email_contact, address_contact, channels_contact, id_company) VALUES(?, ?, ?, ?, ?, ?, ?)", {
    replacements: [last_update, name_contact, lastName_contact, email_contact, address_contact, channels_contact, id_company],
    type: sequelize.QueryTypes.INSERT
  });
};
// INSERT create register in required_products:
const newRequiredProduct =  (id_order, id_product, product_quantity) => {
  return sequelize.query("INSERT INTO required_products(id_order, id_product, product_quantity) VALUES(?, ?, ?)", {
    replacements: [id_order, id_product, product_quantity],
    type: sequelize.QueryTypes.INSERT
  });
};
// ***** SQL SELECT QUERIES *****
// SELECT * FROM ("table");
const selectAllFromTable = (table) => {
  return sequelize.query(`SELECT * FROM ${table}`, {
    type: sequelize.QueryTypes.SELECT
  });
}
// SELECT * FROM ("table") WHERE ("field") = ?;
const selectFromTableWhereFieldIsValue = (table, field, value) => {
  return sequelize.query(`SELECT * FROM ${table} WHERE ${field} = ?`, {
    replacements: [value],
    type: sequelize.QueryTypes.SELECT
  });
};
// SELECT r.name_region, co.name_country, ci.name_city FROM Regions AS r JOIN Countries as co ON r.id_region=co.id_region JOIN Cities as ci ON co.id_country=ci.id_country;;
const selectRegionsTree = () => {
  return sequelize.query("SELECT r.name_region, co.name_country, ci.name_city FROM Regions AS r JOIN Countries as co ON r.id_region=co.id_region JOIN Cities as ci ON co.id_country=ci.id_country;", {
    type: sequelize.QueryTypes.SELECT
  });
};

// SELECT name_country FROM Countries WHERE id_region= ?id_region;
const selectCountriesFromRegionId = (regionId) => {
  return sequelize.query("SELECT name_country FROM Countries WHERE id_region = ?;", {
    replacements: [ regionId ],
    type: sequelize.QueryTypes.SELECT
  });
};
// SELECT name_city FROM Cities WHERE id_country= ?id_country;
const selectCitiesFromCountryId = (countryId) => {
  return sequelize.query("SELECT name_city FROM Cities WHERE id_country = ?;", {
    replacements: [ countryId ],
    type: sequelize.QueryTypes.SELECT
  });
};
// SELECT name_company FROM Companies WHERE id_city= ?id_city;
const selectCompaniesFromCityId = (cityId) => {
  return sequelize.query("SELECT name_company FROM Companies WHERE id_city = ?;", {
    replacements: [ cityId ],
    type: sequelize.QueryTypes.SELECT
  });
};

// SELECT name_contact, lastName_contact FROM Companies WHERE id_company= ?id_company;
const selectContactsFromCompanyId = (companyId) => {
  return sequelize.query("SELECT * FROM Contacts WHERE id_company= ?", {
    replacements: [ companyId ],
    type: sequelize.QueryTypes.SELECT
  });
};

const selectAllOrdersJoined = () => {
  return sequelize.query("SELECT o.id_order, u.username, o.last_update_date, os.status_description, o.products, pm.method_description, o.total_cost FROM Orders as o JOIN Users as u ON o.id_user = u.id_user JOIN Orders_Status as os ON o.id_order_status = os.id_order_status JOIN Paying_Methods as pm ON o.id_paying_method = pm.id_paying_method ORDER BY o.id_order;", {type: sequelize.QueryTypes.SELECT})
};
const selectAllOrdersJoinedByUserId = (userId) => {
  return sequelize.query("SELECT o.id_order, u.username, o.last_update_date, os.status_description, o.products, pm.method_description, o.total_cost FROM Orders as o JOIN Users as u ON o.id_user = u.id_user JOIN Orders_Status as os ON o.id_order_status = os.id_order_status JOIN Paying_Methods as pm ON o.id_paying_method = pm.id_paying_method WHERE o.id_user = ? ORDER BY o.id_order;", {
    replacements: [ userId ],
    type: sequelize.QueryTypes.SELECT
  })
};
// ***** SQL UPDATE QUERIES ***** 
const updateTableRegisterWhereIdIsValue = (table, updatedJsonData, field, value) => {
  let obj = updatedJsonData;
  let tempArray = [];
  for (let key in obj) {
    tempArray.push(`${key} = '${obj[key]}'`);
  } 
  let sqlSetStatement =tempArray.join(", ")
  return sequelize.query(`UPDATE ${table} SET ${sqlSetStatement} WHERE ${field} = ?`, {
    replacements: [value],
    type: sequelize.QueryTypes.UPDATE
  })
}
// ***** SQL DELETE QUERIES ***** 
const deleteTableRegisterWhereIdIsValue = (table, field, value) => {
  return sequelize.query(`DELETE FROM ${table} WHERE ${field} = ?`, {
    replacements : [value],
    type: sequelize.QueryTypes.DELETE
  })
}
// Exports:
module.exports = {
  newUser,
  newRegion,
  newCountry,
  newCity,
  newCompany,
  newContact,
  // newRequiredProduct,
  selectFromTableWhereFieldIsValue,
  selectAllFromTable,
  selectRegionsTree,
  selectCountriesFromRegionId,
  selectCitiesFromCountryId,
  selectCompaniesFromCityId,
  selectContactsFromCompanyId,
  // selectAllOrdersJoined,
  // selectAllOrdersJoinedByUserId,
  updateTableRegisterWhereIdIsValue,
  deleteTableRegisterWhereIdIsValue
}