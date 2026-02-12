//Import Express framework
const express = require("express");
//Create a new router instance
const router = express.Router();
 // Import department controller functions
const departmentController = require("../controllers/departmentController");


//  Department Routes

// Create Department
//Endpoint: POST /api/departments
// Creates a new department record
router.post("/departments", departmentController.createDepartment);

// Get All Departments
// Endpoint: GET /api/departments
// Fetches all departments from the database
router.get("/departments", departmentController.getDepartments);

//  Delete Department
// Endpoint: DELETE /api/departments/:id
// Deletes a department by ID (blocked if employees exist in it)
router.delete("/departments/:id", departmentController.deleteDepartment);


//Export router to be used in server.js
module.exports = router;
