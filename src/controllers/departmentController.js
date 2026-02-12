// Import Department and Employee models
const Department = require("../models/Department");
const Employee = require("../models/Employee");


//Create Department
exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate input:: department name must be provided
    if (!name) {
      return res.status(400).json({
        message: "Department name is required",
      });
    }

    // Create new department record
    const department = await Department.create({ name });

    return res.status(201).json({
      message: "Department created successfully..",
      data: department,
    });
  } catch (error) {
    // Handle duplicate department name error
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Department already exists",
      });
    }

    // Handle unexpected errors
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


// Get All Departments
exports.getDepartments = async (req, res) => {
  try {
    // Fetch all departments from database
    const departments = await Department.findAll();

    return res.status(200).json({
      message: "Departments fetched successfully",
      data: departments,
    });
  } catch (error) {
    // Handling unexpected errors
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


//  Delete Department
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if department exists
    const department = await Department.findByPk(id);

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    // Check if any employees are assigned to this department
    const employees = await Employee.findOne({
      where: { department_id: id },
    });

    if (employees) {
      return res.status(400).json({
        message: "Cannot delete department. Employees are assigned to it.",
      });
    }

    // Delete department if no employees are linked
    await department.destroy();

    return res.status(200).json({
      message: "Department deleted successfully",
    });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
