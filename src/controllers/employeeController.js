// Import Employee and Department models
const Employee = require("../models/Employee");
const Department = require("../models/Department");


//  Create Employee
exports.createEmployee = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      department_id,
      manager_id,
    } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !department_id) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    // Validate department
    const department = await Department.findByPk(department_id);
    if (!department) {
      return res.status(400).json({
        message: "Invalid department_id",
      });
    }

    // Validate manager if provided
    if (manager_id) {
      const manager = await Employee.findByPk(manager_id);
      if (!manager) {
        return res.status(400).json({
          message: "Invalid manager_id",
        });
      }
    }

    // Create new employee record
    const employee = await Employee.create({
      first_name,
      last_name,
      email,
      department_id,
      manager_id: manager_id || null,
    });

    return res.status(201).json({
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    // Handle duplicate email error
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Handle unexpected errors
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


//  Get All Employees (with Department & Manager)
exports.getEmployees = async (req, res) => {
  try {
    // Fetch all employees with department and manager details
    const employees = await Employee.findAll({
      include: [
        {
          model: Department,
          as: "department",
          attributes: ["id", "name"],
        },
        {
          model: Employee,
          as: "manager",
          attributes: ["id", "first_name", "last_name"],
        },
      ]
    });

    return res.status(200).json({
      message: "Employees fetched successfully",
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


//  Get Employee By ID
exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch employee by primary key with department and manager details
    const employee = await Employee.findByPk(id, {
      include: [
        {
          model: Department,
          as: "department",
          attributes: ["id", "name"],
        },
        {
          model: Employee,
          as: "manager",
          attributes: ["id", "first_name", "last_name"],
        },
      ],
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      message: "Employee fetched successfully",
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


//  Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      first_name,
      last_name,
      email,
      department_id,
      manager_id,
    } = req.body;

    // Find employee by ID
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    // Prevent employee from being their own manager
    if (manager_id && manager_id == id) {
      return res.status(400).json({
        message: "Employee cannot be their own manager",
      });
    }

    // Validate department if provided
    if (department_id) {
      const department = await Department.findByPk(department_id);
      if (!department) {
        return res.status(400).json({
          message: "Invalid department_id",
        });
      }
    }

    // Validate manager if provided
    if (manager_id) {
      const manager = await Employee.findByPk(manager_id);
      if (!manager) {
        return res.status(400).json({
          message: "Invalid manager_id",
        });
      }
    }

    // Update employee record with new values (fallback to old values if not provided)
    await employee.update({
      first_name: first_name ?? employee.first_name,
      last_name: last_name ?? employee.last_name,
      email: email ?? employee.email,
      department_id: department_id ?? employee.department_id,
      manager_id: manager_id ?? employee.manager_id,
    });

    return res.status(200).json({
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    // Handle duplicate email error
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Handle unexpected errors
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Find employee by ID
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    // Set subordinates' manager_id to null before deleting manager
    await Employee.update(
      { manager_id: null },
      { where: { manager_id: id } }
    );

    // Delete employee record
    await employee.destroy();

    return res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
