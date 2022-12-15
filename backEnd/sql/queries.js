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
const newContact =  (last_update, name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact) => {
  return sequelize.query("INSERT INTO contacts(last_update, name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact) VALUES(?, ?, ?, ?, ?, ?, ?)", {
    replacements: [last_update, name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact],
    type: sequelize.QueryTypes.INSERT
  });
};
const newChannel =  (type_channel, account_channel, preference_channel, id_contact) => {
  return sequelize.query("INSERT INTO channels(type_channel, account_channel, preference_channel, id_contact) VALUES(?, ?, ?, ?)", {
    replacements: [type_channel, account_channel, preference_channel, id_contact],
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

// SELECT comp.*, ci.name_city, co.name_country, re.name_region FROM Companies AS comp JOIN Cities as ci ON comp.id_city = ci.id_city JOIN Countries as co ON ci.id_country=co.id_country JOIN Regions as re ON co.id_region=re.id_region;
const selectAllCompaniesWithLocations = () => {
  return sequelize.query("SELECT comp.*, ci.name_city, co.name_country, re.name_region FROM Companies AS comp JOIN Cities as ci ON comp.id_city = ci.id_city JOIN Countries as co ON ci.id_country=co.id_country JOIN Regions as re ON co.id_region=re.id_region;", {
    type: sequelize.QueryTypes.SELECT
  })
};


// SELECT contacts.*, companies.name_company, cities.name_city, countries.name_country, regions.name_region FROM Contacts as contacts JOIN Companies as companies ON contacts.id_company=companies.id_company JOIN Cities as cities ON companies.id_city=cities.id_city JOIN Countries as countries ON cities.id_country=countries.id_country JOIN Regions as regions ON countries.id_region=regions.id_region;
const selectAllContactsJoinedCompanyLocations = () => {
  return sequelize.query("SELECT contacts.*, companies.name_company, cities.name_city, countries.name_country, regions.name_region FROM Contacts as contacts JOIN Companies as companies ON contacts.id_company=companies.id_company JOIN Cities as cities ON companies.id_city=cities.id_city JOIN Countries as countries ON cities.id_country=countries.id_country JOIN Regions as regions ON countries.id_region=regions.id_region;", {
    type: sequelize.QueryTypes.SELECT
  })
}
// SELECT contacts.id_contact, contacts.name_contact, contacts.lastName_contact, channels.type_channel, channels.account_channel, channels.preference_channel FROM Contacts as contacts JOIN Channels as channels ON contacts.id_contact=channels.id_contact;
const selectContactJoinedChannels = () => {
  return sequelize.query("SELECT contacts.id_contact, contacts.name_contact, contacts.lastName_contact, channels.type_channel, channels.account_channel, channels.preference_channel FROM Contacts as contacts JOIN Channels as channels ON contacts.id_contact=channels.id_contact;", {
    type: sequelize.QueryTypes.SELECT
  })
};
// SELECT ch.*, con.name_contact, con.lastName_contact, con.id_contact FROM Channels AS ch JOIN Contacts as con ON ch.id_contact = con.id_contact;
const selectChannelsFromContactId = () => {
  return sequelize.query("SELECT ch.*, con.name_contact, con.lastName_contact, con.id_contact FROM Channels AS ch JOIN Contacts as con ON ch.id_contact = con.id_contact;", {
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
  newChannel,
  // 
  selectFromTableWhereFieldIsValue,
  selectAllFromTable,
  selectRegionsTree,
  selectCountriesFromRegionId,
  selectCitiesFromCountryId,
  selectAllCompaniesWithLocations,
  selectCompaniesFromCityId,
  selectContactsFromCompanyId,
  selectChannelsFromContactId,
  selectAllContactsJoinedCompanyLocations,
  selectContactJoinedChannels,
  // 
  updateTableRegisterWhereIdIsValue,
  deleteTableRegisterWhereIdIsValue
}