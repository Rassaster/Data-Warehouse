/*Data Definition Language*/
-- Creating DB:
CREATE DATABASE DataWarehouse;
USE DataWarehouse;
-- Creating tables:
-- *********************************************************
-- *********************************************************
-- USERS RELATIONS
-- Users
CREATE TABLE Users (
  id_user integer
    NOT NULL
    AUTO_INCREMENT,
  name varchar(30)
    NOT NULL,
  last_name varchar(60)
    NOT NULL,
  profile varchar(30)
    NOT NULL,
  email varchar(60)
    NOT NULL,
  is_admin enum('T', 'F')
    NOT NULL,
  user_password varchar(100)
    NOT NULL,
  salt varchar(100)
    NOT NULL,
  last_update datetime
    NOT NULL,
  PRIMARY KEY (id_user)
);
-- *********************************************************
-- Regions:
CREATE TABLE Regions (
  id_region integer
    NOT NULL
    AUTO_INCREMENT,
  acronym_region varchar(5)
    NOT NULL,
  name_region varchar(60)
    NOT NULL,
  PRIMARY KEY (id_region)
);
-- *********************************************************
-- Countries:
CREATE TABLE Countries (
  id_country integer
    NOT NULL
    AUTO_INCREMENT,
  acronym_country varchar(5)
    NOT NULL,
  name_country varchar(60)
    NOT NULL,
  id_region varchar(5)
    NOT NULL,
  PRIMARY KEY (id_country)
);
-- *********************************************************
-- Cities:
CREATE TABLE Cities (
  id_city integer
    NOT NULL
    AUTO_INCREMENT,
  acronym_city varchar(5)
    NOT NULL,
  name_city varchar(60)
    NOT NULL,
  id_country varchar(5)
    NOT NULL,
  PRIMARY KEY (id_city)
);
-- *********************************************************
-- Companies:
CREATE TABLE Companies (
  id_company integer
    NOT NULL
    AUTO_INCREMENT,
  name_company varchar(50)
    NOT NULL,
  address_company varchar(100)
    NOT NULL,
  email_company varchar(30)
    NOT NULL,
  phone_company varchar(20)
    NOT NULL,
  id_city varchar(5)
    NOT NULL,
  last_update datetime
    NOT NULL,
  PRIMARY KEY (id_company)
);
-- *********************************************************
-- Contacts:
CREATE TABLE Contacts (
  id_contact integer
    NOT NULL
    AUTO_INCREMENT,
  name_contact varchar(30)
    NOT NULL,
  lastName_contact varchar(60)
    NOT NULL,
  profile_contact varchar(60)
    NOT NULL,
  email_contact varchar(60)
    NOT NULL,
  id_company varchar(5)
    NOT NULL,
  interest_contact varchar(60)
    NOT NULL,
  last_update datetime
    NOT NULL,
  PRIMARY KEY (id_contact)
);
-- *********************************************************
-- Channels:
CREATE TABLE Channels (
  id_channel integer
    NOT NULL
    AUTO_INCREMENT,
  type_channel varchar(60)
    NOT NULL,
  account_channel varchar(60)
    NOT NULL,
  preference_channel varchar(60)
    NOT NULL,
  id_contact varchar(5)
    NOT NULL,
  PRIMARY KEY (id_channel)
);

-- SELECT contacts.*, companies.name_company, cities.name_city, countries.name_country, regions.name_region FROM Contacts as contacts JOIN Companies as companies ON contacts.id_company=companies.id_company JOIN Cities as cities ON companies.id_city=cities.id_city JOIN Countries as countries ON cities.id_country=countries.id_country JOIN Regions as regions ON countries.id_region=regions.id_region WHERE companies.name_company = 'Aloe JBL';

-- SELECT contacts.*, companies.name_company, cities.name_city, countries.name_country, regions.name_region FROM Contacts as contacts JOIN Companies as companies ON contacts.id_company=companies.id_company JOIN Cities as cities ON companies.id_city=cities.id_city JOIN Countries as countries ON cities.id_country=countries.id_country JOIN Regions as regions ON countries.id_region=regions.id_region WHERE cities.name_city = 'Bogota' AND WHERE contacts.interest_contact = '25%';

-- SELECT contacts.*, companies.name_company, cities.name_city, countries.name_country, regions.name_region 
-- FROM Contacts as contacts 
-- JOIN Companies as companies 
-- ON contacts.id_company=companies.id_company 
-- JOIN Cities as cities 
-- ON companies.id_city=cities.id_city 
-- JOIN Countries as countries 
-- ON cities.id_country=countries.id_country 
-- JOIN Regions as regions ON countries.id_region=regions.id_region  
-- WHERE contacts.interest_contact = '25%' 
-- AND cities.name_city = 'Bogota';
