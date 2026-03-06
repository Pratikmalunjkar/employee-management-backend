// Importing  Sequelize ORM
const { Sequelize } = require("sequelize");

// Load environment variables from .env file
require("dotenv").config();

// Create a new Sequelize instance ( https://github.com/Pratikmalunjkar/employee-management-backendits database connection)
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
   process.env.DB_USER,      
  process.env.DB_PASSWORD,   
  {
    host: process.env.DB_HOST,  
    port: process.env.DB_PORT,   // Database port 
    dialect: "postgres",         // Database type (PostgreSQL)
  }
);

// Export the sequelize instance so it can be used in models and server.js
module.exports = sequelize;
