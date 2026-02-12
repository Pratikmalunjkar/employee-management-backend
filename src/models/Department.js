// Import Sequelize DataTypes for defining model fields
const { DataTypes } = require("sequelize");
// Import the Sequelize instance (database connection)
const sequelize = require("../config/db");

// Define Department model
const Department = sequelize.define(
  "Department",
  {
    id: {
      type: DataTypes.INTEGER,     // Integer type
      primaryKey: true,           // Primary key
      autoIncrement: true,      // Auto-increment value
    },
    name: {
      type: DataTypes.STRING,       
      unique: true,                 // Must be unique (no duplicate department names)
      allowNull: false,            
    },
  },
  {
    tableName: "departments",      // Explicit table name in DB
    timestamps: false,              // Disable createdAt/updatedAt fields
  }
);

//Export Department model for use in controllers and associations
module.exports = Department;
