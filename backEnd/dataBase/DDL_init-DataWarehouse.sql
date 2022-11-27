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
  is_admin enum("T", "F")
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
  acronym varchar(5)
    NOT NULL,
  name varchar(60)
    NOT NULL,
  PRIMARY KEY (id_region)
);
-- *********************************************************
-- Countries:
CREATE TABLE Countries (
  id_country integer
    NOT NULL
    AUTO_INCREMENT,
  name varchar(60)
    NOT NULL,
  id_region varchar(5)
    NOT NULL,
  PRIMARY KEY (id_country)
);
-- *********************************************************
-- Cities:
-- *********************************************************
-- Companies:
-- *********************************************************
-- Clients:
-- *********************************************************
-- Clients_contacts:
-- *********************************************************
-- Contacs_channels:
-- *********************************************************