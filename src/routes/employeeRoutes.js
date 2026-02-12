// Import Express framework
const express = require("express");
// Create a new router instance
const router = express.Router();

// Import employee controller functions
const employeeController = require("../controllers/employeeController");


// Employee Routes

//  Create Employee
// Endpoint: POST /api/employees,Creates a new employee record
router.post("/", employeeController.createEmployee);

//  Get All Employees
// Endpoint: GET /api/employees, Fetches all employees with department and manager details
router.get("/", employeeController.getEmployees);

//  Get Employee By ID
// Endpoint: GET /api/employees/:id,Fetches a single employee by ID with department and manager details
router.get("/:id", employeeController.getEmployeeById);

// ✏️ Update Employee
// Endpoint: PUT /api/employees/:id
// Updates employee details by ID
router.put("/:id", employeeController.updateEmployee);

//  Delete Employee
// Endpoint: DELETE /api/employees/:id
// Deletes an employee by ID
router.delete("/:id", employeeController.deleteEmployee);


// Export router to be used in server.js
module.exports = router;
