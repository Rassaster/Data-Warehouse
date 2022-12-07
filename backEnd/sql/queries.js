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
const newRegion =  (acronym, name) => {
  return sequelize.query("INSERT INTO regions(acronym, name) VALUES(?, ?)", {
    replacements: [acronym, name],
    type: sequelize.QueryTypes.INSERT
  });
};
// INSERT create new country in Countries:
const newCountry =  (acronym, name, id_region) => {
  return sequelize.query("INSERT INTO countries(acronym, name, id_region) VALUES(?, ?, ?)", {
    replacements: [acronym, name, id_region],
    type: sequelize.QueryTypes.INSERT
  });
};
// INSERT create new city in Cities:
const newCity =  (acronym, name, id_country) => {
  return sequelize.query("INSERT INTO cities(acronym, name, id_country) VALUES(?, ?, ?)", {
    replacements: [acronym, name, id_country],
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
// SELECT p.id_product, p.product_name, pc.category_name, p.product_price FROM Products AS p JOIN Products_Categories as pc ON p.id_product_category=pc.id_product_categoryORDER BY p.id_product;
const selectRegionsTree = () => {
  return sequelize.query("SELECT r.name, co.name FROM Regions AS r JOIN Countries as co ON r.id_region=co.id_region;", {
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
  // newRequiredProduct,
  selectFromTableWhereFieldIsValue,
  selectAllFromTable,
  selectRegionsTree,
  // selectAllOrdersJoined,
  // selectAllOrdersJoinedByUserId,
  updateTableRegisterWhereIdIsValue,
  deleteTableRegisterWhereIdIsValue
}