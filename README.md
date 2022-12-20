# DATA WAREHOUSE
### <Full Stack project for [Acamica](https://www.acamica.com) academy. />
This app was built using NodeJs with Express, MySQL and Sequelize, as well as React-StyledComponents.

## Backend - Server and DB setup instructions:
Please follow the next steps for setting up the server and database prior to testing the API:
1. Clone the repository.
2. Initialize the database by accessing the directory that holds the DDL and DML files:
    1. In your CM Terminal, locate in the "dataBase" directory: `delilahResto/backend/dataBase`
    2. Create the database: enter the command `mysql -u <you_database_user> -p DDL_init-Delilah.sql`. Then, enter your password.
    3. If the previous step does not work, simply start the mysql server and create the data base with the following command: `CREATE DATABASE DataWarehouse;` followed by `USE DataWarehouse;`,
    4. The dataBase is now ready to be filled with data. This will occur automatically when the server is started. 
3. Setup the environment variables by changing the name of `deploySample.env` to `.env`. Then, assign the correspondant information for each variable (replace only the information between the <> and enclose it between quotes ("") instead). Example:
    - USER_DB = "root"
    - PASS_DB = "myPassword"
    - HOST_DB = "localhost"
    - PORT_DB = "3306"
4. Install all the dependencies: in the CM Terminal, locate in the directory that contains the "package.json" file (`/backend`). Once in there, excute the command `npm init`.
5. Initialize the server: in the location `/backend`, execute the command `npx nodemon app.js`. The server is now running and connected to the database. Everytime the server starts, a basic amount of data will be inserted to the database for you to play with it.

## FrontEnd - User Interface Access: 
IMPORTANT: First lift up the server and database before accessing the UI.
The page can be found in the following link: [Data Warehouse Front](https://rassaster.github.io/Data-Warehouse/#/login) https://rassaster.github.io/Data-Warehouse/#/login.

You can find the OAP3 [documentation here](https://app.swaggerhub.com/apis/Rassaster/data-warehouse/1.0.0#/Z-Wave/setDimmer).

##  - Users' Credential Access: 
### As Admin:
Email: admin@gmail.com
Password: User1#

### As User:
Email: user@gmail.com
Password: User1#
