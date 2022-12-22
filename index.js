const inquirer = require('inquirer');
require('dotenv').config();
const fetch = require('node-fetch');
const cTable = require('console.table')

const getDepartments = () => fetch('http://localhost:3301/api/departments', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}).then(async x => {
    let result = await x.json();
    console.table(result);
    init();
});

const getRoles = () => fetch('http://localhost:3301/api/roles', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}).then(async x => {
    let result = await x.json();
    console.table(result);
    init();
});

const getEmployees = () => fetch('http://localhost:3301/api/employees', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}).then(async x => {
    let result = await x.json();
    console.table(result);
    init();
});

// function addDepartment() {
//     inquirer
// }

const questions = [
    {
        type: 'list',
        name: 'tracker',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Quit',
        ],
        default: "View All Departments",
        loop: true
    }
];

function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            switch (answers.tracker) {
                case "View All Departments":
                    getDepartments();
                    return;
                case "View All Roles":
                    getRoles();
                    return;
                case "View All Employees":
                    getEmployees();
                    return;
                case "Add Department":
                    return;
                case "Add Role":
                    return;
                case "Add Employee":
                    return;
                case "Update Employee Role":
                    return;
                default:
                    return;
            }
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Could not be rendered in current environment")
            } else {
                console.log("Something went horribly wrong")
                console.log(error)
            }
        });
}

init();