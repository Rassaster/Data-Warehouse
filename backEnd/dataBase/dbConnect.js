// Requiring NPM Libraries:
const Sequelize = require("sequelize");
const mysql = require("mysql2");
// Requiring Environment Variables from congif.js:
const {DIALECT_DB, USER_DB, PASS_DB, PORT_DB, HOST_DB, NAME_DB} = require("../config");


// Creating the link to the Data Base based on the Environment Variables:
const sequelize = new Sequelize(`${DIALECT_DB}://${USER_DB}:${PASS_DB}@${HOST_DB}:${PORT_DB}/${NAME_DB}`);
// Connecting to the Data Base and logging in console the success/failure of the process:
sequelize.authenticate()
  .then(()=>{
    console.log(`You have connected to the Data Base: ${NAME_DB}.`);
  })
  .catch(err => {
    console.log("An error has occurred in the attemp to connect to the Data Base:", err);
  })
// Exports:
module.exports = sequelize;

const initData = () => {
  const createTableUsers =  () => {
    return sequelize.query("CREATE TABLE Users(id_user integer NOT NULL AUTO_INCREMENT, name varchar(30)NOT NULL, last_name varchar(60) NOT NULL, profile varchar(30) NOT NULL, email varchar(60) NOT NULL, is_admin enum('T', 'F') NOT NULL, user_password varchar(100) NOT NULL, salt varchar(100) NOT NULL, last_update datetime NOT NULL, PRIMARY KEY (id_user))", {
      type: sequelize.QueryTypes.CREATE
    });
  };
  const createTableRegions =  () => {
    return sequelize.query("CREATE TABLE Regions (id_region integer NOT NULL AUTO_INCREMENT,acronym_region varchar(5) NOT NULL, name_region varchar(60) NOT NULL, PRIMARY KEY (id_region))", {
      type: sequelize.QueryTypes.CREATE
    });
  };
  const createTableCountries =  () => {
    return sequelize.query("CREATE TABLE Countries (id_country integer NOT NULL AUTO_INCREMENT,acronym_country varchar(5) NOT NULL, name_country varchar(60) NOT NULL, id_region varchar(5) NOT NULL,PRIMARY KEY (id_country))", {
      type: sequelize.QueryTypes.CREATE
    });
  };
  const createTableCities =  () => {
    return sequelize.query("CREATE TABLE Cities (id_city integer NOT NULL AUTO_INCREMENT, acronym_city varchar(5) NOT NULL, name_city varchar(60) NOT NULL, id_country varchar(5) NOT NULL, PRIMARY KEY (id_city))", {
      type: sequelize.QueryTypes.CREATE
    });
  };
  const createTableCompanies =  () => {
    return sequelize.query("CREATE TABLE Companies (id_company integer NOT NULL AUTO_INCREMENT,name_company varchar(50) NOT NULL, address_company varchar(100) NOT NULL, email_company varchar(30) NOT NULL, phone_company varchar(20) NOT NULL, id_city varchar(5) NOT NULL, last_update datetime NOT NULL, PRIMARY KEY (id_company))", {
      type: sequelize.QueryTypes.CREATE
    });
  };
  const createTableContacts =  () => {
    return sequelize.query("CREATE TABLE Contacts (id_contact integer NOT NULL AUTO_INCREMENT, name_contact varchar(30) NOT NULL, lastName_contact varchar(60) NOT NULL, profile_contact varchar(60) NOT NULL, email_contact varchar(60) NOT NULL, id_company varchar(5) NOT NULL, interest_contact varchar(60) NOT NULL, last_update datetime NOT NULL, PRIMARY KEY (id_contact))", {
      type: sequelize.QueryTypes.CREATE
    });
  };
  const createTableChannels =  () => {
    return sequelize.query("CREATE TABLE Channels (id_channel integer NOT NULL AUTO_INCREMENT, type_channel varchar(60) NOT NULL, account_channel varchar(60) NOT NULL, preference_channel varchar(60) NOT NULL,id_contact varchar(5) NOT NULL, PRIMARY KEY (id_channel))", {
      type: sequelize.QueryTypes.CREATE
    });
  };
  createTableUsers()
  createTableRegions()
  createTableCountries()
  createTableCities()
  createTableCompanies()
  createTableContacts()
  createTableChannels()
  
  
  const truncateUsers =  () => {
    return sequelize.query("TRUNCATE TABLE users", {
      type: sequelize.QueryTypes.TRUNCATE
    });
  };
  const truncateRegions =  () => {
    return sequelize.query("TRUNCATE TABLE regions", {
      type: sequelize.QueryTypes.TRUNCATE
    });
  };
  const truncateCountries =  () => {
    return sequelize.query("TRUNCATE TABLE countries", {
      type: sequelize.QueryTypes.TRUNCATE
    });
  };
  const truncateCities =  () => {
    return sequelize.query("TRUNCATE TABLE cities", {
      type: sequelize.QueryTypes.TRUNCATE
    });
  };
  const truncateCompanies =  () => {
    return sequelize.query("TRUNCATE TABLE companies", {
      type: sequelize.QueryTypes.TRUNCATE
    });
  };
  const truncateContacts =  () => {
    return sequelize.query("TRUNCATE TABLE contacts", {
      type: sequelize.QueryTypes.TRUNCATE
    });
  };
  const truncateChannels =  () => {
    return sequelize.query("TRUNCATE TABLE channels", {
      type: sequelize.QueryTypes.TRUNCATE
    });
  };
  
  truncateUsers()
  truncateRegions()
  truncateCountries()
  truncateCities()
  truncateCompanies()
  truncateContacts()
  truncateChannels()
  
  // Password = User1#
  const createAdmin =  () => {
    return sequelize.query("INSERT INTO users(last_update, name, last_name, email, profile, is_admin, user_password, salt) VALUES('2022-11-26 17:48:28', 'Admin', 'Admin', 'admin@gmail.com', 'Admin', 'T', '977b34441dc1c0f70cab6aa5d774c7daa1161c9109c585c6306729f96d871bc7', '3a8634e6-bddc-48fb-88c5-41d267adf235')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  // Password = User1#
  const createBasicUser =  () => {
    return sequelize.query("INSERT INTO users(last_update, name, last_name, email, profile, is_admin, user_password, salt) VALUES('2022-11-26 17:48:28', 'User', 'User', 'user@gmail.com', 'User', 'F', '977b34441dc1c0f70cab6aa5d774c7daa1161c9109c585c6306729f96d871bc7', '3a8634e6-bddc-48fb-88c5-41d267adf235')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createRegion1 =  () => {
    return sequelize.query("INSERT INTO Regions(acronym_region, name_region) VALUES('AS', 'America del Sur')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createRegion2 =  () => {
    return sequelize.query("INSERT INTO Regions(acronym_region, name_region) VALUES('AN', 'America del Norte')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createRegion3 =  () => {
    return sequelize.query("INSERT INTO Regions(acronym_region, name_region) VALUES('AC', 'America Central')", {
      type: sequelize.QueryTypes.INSERT
    });
  };


  const createCountry1 =  () => {
    return sequelize.query("INSERT INTO countries(acronym_country, name_country, id_region) VALUES('COL', 'Colombia', 1)", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCountry2 =  () => {
    return sequelize.query("INSERT INTO countries(acronym_country, name_country, id_region) VALUES('EEUU', 'Estados Unidos', 2)", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCountry3 =  () => {
    return sequelize.query("INSERT INTO countries(acronym_country, name_country, id_region) VALUES('CR', 'Costa Rica', 3)", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCountry4 =  () => {
    return sequelize.query("INSERT INTO countries(acronym_country, name_country, id_region) VALUES('ARG', 'Argentina', 1)", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCountry5 =  () => {
    return sequelize.query("INSERT INTO countries(acronym_country, name_country, id_region) VALUES('MEX', 'Mexico', 2)", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  
  
  const createCity1 =  () => {
    return sequelize.query("INSERT INTO cities(acronym_city, name_city, id_country) VALUES('BOG', 'Bogota', '1')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCity2 =  () => {
    return sequelize.query("INSERT INTO cities(acronym_city, name_city, id_country) VALUES('NY', 'New York', '2')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCity3 =  () => {
    return sequelize.query("INSERT INTO cities(acronym_city, name_city, id_country) VALUES('MED', 'Medellin', '1')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCity4 =  () => {
    return sequelize.query("INSERT INTO cities(acronym_city, name_city, id_country) VALUES('LA', 'Los Angeles', '2')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCity5 =  () => {
    return sequelize.query("INSERT INTO cities(acronym_city, name_city, id_country) VALUES('RO', 'Rosario', '4')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCity6 =  () => {
    return sequelize.query("INSERT INTO cities(acronym_city, name_city, id_country) VALUES('SJE', 'San Jose', '3')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCity7 =  () => {
    return sequelize.query("INSERT INTO cities(acronym_city, name_city, id_country) VALUES('BAI', 'Buenos Aires', '4')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCity8 =  () => {
    return sequelize.query("INSERT INTO cities(acronym_city, name_city, id_country) VALUES('CDMX', 'Ciudad de Mexico', '5')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCity9 =  () => {
    return sequelize.query("INSERT INTO cities(acronym_city, name_city, id_country) VALUES('CAN', 'Cancun', '5')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  
  const createCompany1 =  () => {
    return sequelize.query("INSERT INTO companies(name_company, address_company, email_company, phone_company, id_city, last_update) VALUES('Tita Media', 'Carrera 16 # 93-23', 'titamedia@gmail.com', '3131324212', 1, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCompany2 =  () => {
    return sequelize.query("INSERT INTO companies(name_company, address_company, email_company, phone_company, id_city, last_update) VALUES('Codecademy', 'Street 4', 'codecademy@gmail.com', '313132433212', 2, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCompany3 =  () => {
    return sequelize.query("INSERT INTO companies(name_company, address_company, email_company, phone_company, id_city, last_update) VALUES('Microsoft', 'Street 24', 'microsoft@gmail.com', '313132433212', 2, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCompany4 =  () => {
    return sequelize.query("INSERT INTO companies(name_company, address_company, email_company, phone_company, id_city, last_update) VALUES('Bancolombia', 'Street 24', 'bancolombia@gmail.com', '313132433212', 1, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCompany5 =  () => {
    return sequelize.query("INSERT INTO companies(name_company, address_company, email_company, phone_company, id_city, last_update) VALUES('Haceb', 'Carrera 24', 'haceb@gmail.com', '313132433212', 3, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCompany6 =  () => {
    return sequelize.query("INSERT INTO companies(name_company, address_company, email_company, phone_company, id_city, last_update) VALUES('Estra', 'Calle 24', 'estra@gmail.com', '313132433212', 3, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCompany7 =  () => {
    return sequelize.query("INSERT INTO companies(name_company, address_company, email_company, phone_company, id_city, last_update) VALUES('Movistar', 'Calle 24', 'movistar@gmail.com', '313132433212', 5, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCompany8 =  () => {
    return sequelize.query("INSERT INTO companies(name_company, address_company, email_company, phone_company, id_city, last_update) VALUES('Mercado Libre', 'Calle 24', 'mercadolibre@gmail.com', '313132433212', 7, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCompany9 =  () => {
    return sequelize.query("INSERT INTO companies(name_company, address_company, email_company, phone_company, id_city, last_update) VALUES('Campeon2022', 'Calle 24', 'campeon2022@gmail.com', '313132433212', 7, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCompany10 =  () => {
    return sequelize.query("INSERT INTO companies(name_company, address_company, email_company, phone_company, id_city, last_update) VALUES('Toyota', 'Calle 24', 'toyota@gmail.com', '313132433212', 6, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCompany11 =  () => {
    return sequelize.query("INSERT INTO companies(name_company, address_company, email_company, phone_company, id_city, last_update) VALUES('Aztec', 'Calle 24', 'aztec@gmail.com', '313132433212', 8, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createCompany12 =  () => {
    return sequelize.query("INSERT INTO companies(name_company, address_company, email_company, phone_company, id_city, last_update) VALUES('AlAmar', 'Calle 24', 'alamar@gmail.com', '313132433212', 9, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  
  
  const createContact1 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Juan', 'Rassa', 'FrontEnd', 'jrassa@titamedia.com', 1, 100, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact2 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('James', 'Pinilla', 'BackEnd', 'jpinilla@codecademy.com', 2, 50, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact3 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Andres', 'Pelijo', 'FrontEnd', 'ap@gmail.com', 1, 100, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact4 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Andrea', 'Valencia', 'FrontEnd', 'av@gmail.com', 1, 50, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact5 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Jimena', 'Real', 'FrontEnd', 'ajr@gmail.com', 1, 25, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact6 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Sebastian', 'Cas', 'UX/UI', 'sc@gmail.com', 1, 25, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact7 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Camilo', 'Saldes', 'Manager', 'cm@gmail.com', 1, 100, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact8 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Jhon', 'Matt', 'BackEnd', 'jmat@codecademy.com', 2, 100, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact9 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Diane', 'Sel', 'BackEnd', 'dm@codecademy.com', 2, 25, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact10 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Jorge', 'Les', 'UX/UI', 'jl@gmail.com', 3, 25, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact21 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Luz', 'Grasa', 'UX/UI', 'lg@gmail.com', 3, 50, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact11 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Camilo', 'Gres', 'UX/UI', 'cg@gmail.com', 3, 75, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact12 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Juan', 'Sleo', 'Sales', 'js@gmail.com', 4, 75, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact13 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Ana', 'Campos', 'Sales', 'ac@gmail.com', 4, 50, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact14 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Sofia', 'Est', 'Sales', 'se@gmail.com', 4, 100, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact15 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Ana', 'Opre', 'FrontEnd', 'ao@gmail.com', 5, 100, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact16 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Camilo', 'Rey', 'FrontEnd', 'cr@gmail.com', 5, 50, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact17 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Jorge', 'Cediel', 'Manager', 'jc@gmail.com', 5, 75, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact18 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Valeria', 'Siche', 'Sales', 'vs@gmail.com', 6, 100, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact19 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Juan', 'Urrutia', 'Backend', 'ju@gmail.com', 6, 25, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createContact20 =  () => {
    return sequelize.query("INSERT INTO contacts(name_contact, lastName_contact, profile_contact, email_contact, id_company, interest_contact, last_update) VALUES('Andres', 'Cabezas', 'Frontend', 'acc@gmail.com', 6, 75, '2022-11-26 17:48:28')", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  
  
  const createChannel1 =  () => {
    return sequelize.query("INSERT INTO channels(type_channel, account_channel, preference_channel, id_contact) VALUES('Facebook', '@jmrs', 'Favorite', 1)", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  const createChannel2 =  () => {
    return sequelize.query("INSERT INTO channels(type_channel, account_channel, preference_channel, id_contact) VALUES('Instagram', '@jpss', 'Favorite', 2)", {
      type: sequelize.QueryTypes.INSERT
    });
  };
  
  
  createAdmin()
  createBasicUser()

  createRegion1()
  createRegion2()
  createRegion3()
  
  createCountry1()
  createCountry2()
  createCountry3()
  createCountry4()
  createCountry5()


  createCity1()
  createCity2()
  createCity3()
  createCity4()
  createCity5()
  createCity6()
  createCity7()
  createCity8()
  createCity9()


  createCompany1()
  createCompany2()
  createCompany3()
  createCompany4()
  createCompany5()
  createCompany6()
  createCompany7()
  createCompany8()
  createCompany9()
  createCompany10()
  createCompany11()
  createCompany12()


  createContact1()
  createContact2()
  createContact3()
  createContact4()
  createContact5()
  createContact6()
  createContact7()
  createContact8()
  createContact9()
  createContact10()
  createContact12()
  createContact13()
  createContact14()
  createContact15()
  createContact16()
  createContact17()
  createContact18()
  createContact19()
  createContact20()
  createContact21()


  createChannel1()
  createChannel2()
}

initData();