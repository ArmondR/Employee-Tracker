// imports connection.js from db directory
const db = require('./db/connection');
//import Inquirer
const inquirer = require('inquirer');
// import console table
const cTable = require('console.table');


require('dotenv').config()

const prompt = () => {
    inquirer.prompt ([
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
                'Update an employee role'
            ]
        }
    ])
}

prompt();

