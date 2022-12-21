const inquirer = require('inquirer');
require('dotenv').config();
const fetch = require('node-fetch');
const cTable = require('console.table')

const getEmployees = () => fetch('http://localhost:3301/api/employees', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}).then(async x => {
    let result = await x.json();
    console.table(result);
});

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

                    init();
                    return;
                case "View All Roles":
                    
                    init();
                    return;
                case "View All Employees":
                    getEmployees();
                    init();
                    return;
                case "Add Department":
                    
                    init();
                    return;
                case "Add Role":

                    init();
                    return;
                case "Add Employee":
                    
                    init();
                    return;
                case "Update Employee Role":
                    
                    init();
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