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

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Alberto", "Suarez", 1),
       ("John", "Doe", 2),
       ("Tim", "Henson", 3),
       ("Bradley", "Adams", 4),
       ("Bob", "Smith", 5),
       ("David", "Henry", 6),
       ("George", "Wilson", 7),
       ("Charles", "Miller", 8);