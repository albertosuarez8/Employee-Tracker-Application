INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 4),
       ("Salesperson", 80000, 4),
       ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000, 1),
       ("Account Manager", 160000, 2),
       ("Accountant", 125000, 2),
       ("Legal Team Lead", 250000, 3),
       ("Lawyer", 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alberto", "Suarez", 1, NULL),
       ("John", "Doe", 2, 1),
       ("Tim", "Henson", 3, NULL),
       ("Bradley", "Adams", 4, 3),
       ("Bob", "Smith", 5, NULL),
       ("David", "Henry", 6, 5),
       ("George", "Wilson", 7, NULL),
       ("Charles", "Miller", 8, 7);