// Import Sequelize DataTypes for defining model fields
const { DataTypes } = require("sequelize");
//Import the Sequelize instance (database connection)
const sequelize = require("../config/db");
//Import Department model for foreign key reference
const Department = require("./Department");

// Define Employee model
const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,      // Integer type
      primaryKey: true,             // Primary key
      autoIncrement: true,          // Auto-increment value
    },
    first_name: {
      type: DataTypes.STRING,      
      allowNull: false,           
    },
    last_name: {
      type: DataTypes.STRING,      
      allowNull: false,             // Cannot be null
    },
    email: {
      type: DataTypes.STRING,       // Employee's email
      allowNull: false,             // Cannot be null
      unique: true,                 // Must be unique
    },
    department_id: {
      type: DataTypes.INTEGER,      // Foreign key to Department
      allowNull: false,
      references: {
        model: Department,          // Reference Department model
        key: "id",
      },
    },
    manager_id: {
      type: DataTypes.INTEGER,      // Self-referencing foreign key
      allowNull: true,              // Can be null (no manager)
      references: {
        model: "employees",         // Reference Employee table itself
        key: "id",
      },
    },
  },
  {
    tableName: "employees",         // Explicit table name in DB
    timestamps: true,               // Enable createdAt & updatedAt
  }
);

// Export Employee model for use in controllers and associations
module.exports = Employee;


// Associations

// Employee belongs to Department (many employees in one department)
Employee.belongsTo(Department, {
  foreignKey: "department_id",
  as: "department",
});

// Department has many Employees (one department →many employees)
Department.hasMany(Employee, {
  foreignKey: "department_id",
  as: "employees",
});

// Self reference: Employee belongs to Manager (one employee → one manager)
Employee.belongsTo(Employee, {
  foreignKey: "manager_id",
  as: "manager",
});

// Self reference: Manager has many subordinates (one manager → many employees)
Employee.hasMany(Employee, {
  foreignKey: "manager_id",
  as: "subordinates",
});
