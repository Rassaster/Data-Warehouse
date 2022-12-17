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
  createCountry1()
  createCountry2()
  createCity1()
  createCity2()
  createCompany1()
  createCompany2()
  createContact1()
  createContact2()
  createChannel1()
  createChannel2()
}

export default initData