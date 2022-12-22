const inquirer = require('inquirer');
require('dotenv').config();
const fetch = require('node-fetch');
const cTable = require('console.table')

const getDepartments = () => fetch('http://localhost:3301/api/departments', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
});

const getDepartmentsForList = () => getDepartments()
.then(async x => {
    let result = await x.json();
    let listOfDepartment = result.map(x => {
        return {name: x['name'], value: x['id']};
    });
    return listOfDepartment;
});

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the department?',
            }
        ])
        .then((answers) => {
            fetch('http://localhost:3301/api/departments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: answers.departmentName })
            }).then(async x => {
                init();
            });
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

const getRoles = () => fetch('http://localhost:3301/api/roles', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
});

const getRolesForList = () => getRoles()
.then(async x => {
    let result = await x.json();
    let listOfRole = result.map(x => {
        return {name: x['title'], value: x['id']};
    });
    return listOfRole;
});

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which department does the role belong to?',
                choices: getDepartmentsForList,
                default: "None",
                loop: true
            }
        ])
        .then((answers) => {
            fetch('http://localhost:3301/api/roles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roleName: answers.roleName, roleSalary: answers.roleSalary, depId: answers.department })
            }).then(async x => {
                console.log("Successfully created new role");
                init();
            });
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

const getEmployees = () => fetch('http://localhost:3301/api/employees', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
});

const getEmployeesForList = () => getEmployees()
.then(async x => {
    let result = await x.json();
    let listOfEmployees = result.map(x => {
        return {name: x['first_name'] + ' ' + x['last_name'], value: x['id']};
    });
    return listOfEmployees;
});

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeFirstName',
                message: 'What is the employee\'s first name?',
            },
            {
                type: 'input',
                name: 'employeeLastName',
                message: 'What is the employee\'s last name?',
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the employee\'s role?',
                choices: getRolesForList,
                default: "None",
                loop: true
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is the employee\'s manager?',
                choices: getEmployeesForList,
                default: "None",
                loop: true
            }
        ])
        .then((answers) => {
            fetch('http://localhost:3301/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ employeeFirstName: answers.employeeFirstName, employeeLastName: answers.employeeLastName, roleId: answers.role, managerId: answers.manager })
            }).then(async x => {
                init();
            });
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
                    getDepartments().then(async x => {
                        let result = await x.json();
                        console.table(result);
                        init();
                    });
                    return;
                case "View All Roles":
                    getRoles().then(async x => {
                        let result = await x.json();
                        console.table(result);
                        init();
                    });
                    return;
                case "View All Employees":
                    getEmployees().then(async x => {
                        let result = await x.json();
                        console.table(result);
                        init();
                    });
                    return;
                case "Add Department":
                    addDepartment();
                    return;
                case "Add Role":
                    addRole();
                    return;
                case "Add Employee":
                    addEmployee();
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