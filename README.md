 Employee Management Backend API

A RESTful Employee Management Backend built using Node.js, Express, PostgreSQL, and Sequelize ORM.  
This project manages employees, departments, and reporting managers with proper relational integrity and middleware logging.

---
Tech Stack::

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Middleware Logging
- RESTful API Architecture

 Features

- Employee CRUD operations
- Department CRUD operations
- Self-referencing manager relationship
- Foreign key constraints
- Business rule validations
- Global request–response logging middleware
- Proper HTTP status codes
- Clean modular structure

---

Database Schema

Employee
- id (Primary Key)
- first_name
- last_name
- email (Unique)
- department_id (Foreign Key → Department.id)
- manager_id (Foreign Key → Employee.id, Nullable)
- createdAt
- updatedAt

Department
- id (Primary Key)
- name (Unique)

---

 API Endpoints

 Employee APIs

| Method | Endpoint | Description |

| POST | /api/employees | Create employee |
| GET | /api/employees | Get all employees with department & manager |
| GET | /api/employees/:id | Get employee by ID |
| PUT | /api/employees/:id | Update employee |
| DELETE | /api/employees/:id | Delete employee (reassigns subordinates) |

 Department APIs

| Method | Endpoint | Description |

| POST | /api/departments | Create department |
| GET | /api/departments | Get all departments |
| DELETE | /api/departments/:id | Delete department (blocked if employees exist) |

 Business Rules Implemented

- Fetch employee details with department name and manager name using JOINs.
- Deleting a manager sets manager_id = NULL for subordinates.
- Deleting a department is blocked if employees are mapped.
- Unique email constraint enforced.
- Foreign key integrity maintained.

 Middleware

Global request–response logging middleware logs:

- HTTP Method
- Endpoint
- Status Code
- Response Time

Project Objective::


Backend API development

Relational database modeling

Sequelize ORM usage

Middleware implementation

Business rule enforcement

Clean project architecture
