// import mysql2
const mysql = require('mysql2');
// imports connection.js from db directory
const db = require('./db/connection');
//import Inquirer
const inquirer = require('inquirer');
// import console table
const cTable = require('console.table');


require('dotenv').config()

const prompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'Please choose from list.',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Quit'
            ]
        }
    ]).then((answers) => {

        const { choices } = answers;

        if (choices === "View all departments") {
            showAllDepartments();
        }

        if (choices === "View all roles") {
            showAllRoles();
        }

        if (choices === "View all employees") {
            showAllEmployees();
        }

        if (choices === "Add a department") {
            addDepartment();
        }

        if (choices === "Add a roll") {
            addRole();
        }

        if (choices === "Add an employee") {
            addEmployee();
        }

        if (choices === "Quit") {
            db.end;
        }
    })
};

// shows all departments 
showAllDepartments = () => {
    console.log("All Departments");

    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        prompt();
    })

};

// Shows all roles 
showAllRoles = () => {
    console.log("All roles");

    const sql = `SELECT * FROM role`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        prompt();
    });
};

// Shows all employees
showAllEmployees = () => {
    console.log("All employees");

    const sql = `SELECT 
    employee.id,
    employee.first_name,
    employee.last_name,
    department.name AS department,
    role.salary AS salary,
    manager.first_name AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
    `;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        prompt();
    });
};

// adds department to database
addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter new department.',
            validate: name => {
                if (name) {
                    return true;
                } else {
                    console.log('Please enter a department name');
                    return false;
                }
            }

        }
    ]) .then(answer => {
        const sql = `INSERT INTO department (name) VALUES ?`;

        db.query(sql, answer.name, (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log(answer.name + ' added to department database.');
        })
    })
};

// Adds role to database
addRole = () => {

    inquirer.prompt([
        {
        type: 'input',
        name: 'roleName',
        message: 'Enter the role you wish to add.',
        validate: roleName => {
            if (roleName) {
                return true;
            } else {
                console.log('Please enter new role');
                return false;
            }

        }

    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the role salary?',
        validate: salary => {
            // checks if given input is a number 
            if (isNAN(salary)) {
                return true;
            } else {
                console.log('Please enter a salary');
                return false;
            }
        }
    }
]).then()

};

// Adds employees to database
addEmployee = () => {

    // access role table to pull options 
    db.query(`SELECT * FROM role`, (err, res) => {
        if(err) throw err;

        inquirer.prompt([
            {
            type: 'input',
            name: 'firstName',
            message: 'Enter employees first name.',
            validate: firstName => {
               if (firstName) {
                   return true;
               } else {
                   console.log('Please enter a first name');
                   return false;
               }
            }
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'Enter employees last name.',
          validate: lastName => {
              if(lastName) {
                  return true;
              } else {
                  console.log('Please enter employees last name');
                  return false;
              }
          }  
        },
        {
            name: 'role',
            type: 'list',
            message: 'Select employee role.',
            choices: () => {
                const roles = [];
                for (let i = 0; i < res.length; i++) {
                    roles.push(res[i].title);
                }
                return roles;
            },

        }
      ]).then(response => {
          const params = [response.firstName, response.lastName]
      })

    });
    
};

prompt();

