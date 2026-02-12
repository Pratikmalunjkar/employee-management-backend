// Import global request–response logger middleware
const logger = require("./src/middleware/logger");

// Import employee routes
const employeeRoutes = require("./src/routes/employeeRoutes");

// Import Express framework
const express = require("express");
// Load environment variables from .env file
require("dotenv").config();

// Import Sequelize instance (database connection)
const sequelize = require("./src/config/db");

// Import models so Sequelize knows about them
require("./src/models/Department");
require("./src/models/Employee");

// Import department routes
const departmentRoutes = require("./src/routes/departmentRoutes"); //register routes

// Initialize Express app
const app = express();

// Use global logger middleware for all requests
app.use(logger);

// Parse incoming JSON requests
app.use(express.json());

// Register employee routes under /api/employees
app.use("/api/employees", employeeRoutes);

// Register department routes under /api
app.use("/api", departmentRoutes);  // use routes

// Define server port (from .env or default 5000)
const PORT = process.env.PORT || 5000;

// Connect to database and sync models
sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully...!");
    return sequelize.sync(); // Sync models with database
  })
  .then(() => {
    console.log(" Tables synced!");
    // Start Express server
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Database connection failed:", err);
  });
