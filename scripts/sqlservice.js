const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.port || 3301;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    // Information has been hidden with .env file, please input your information here for the application to work 
    host: process.env.HOST_ENV,
    // MySQL Username
    user: process.env.USER_ENV,
    password: process.env.PASSWORD_ENV,
    database: process.env.DB_ENV
  },
  console.log(`Connected to the database.`)
);

app.get('/api/departments', (req, res) => {
  db.query('SELECT * FROM department', function (err, results) {
    res.json(results);
    });
})

app.get('/api/roles', (req, res) => {
  db.query('SELECT * FROM role', function (err, results) {
    res.json(results);
    });
})

app.get('/api/employees', (req, res) => {
  db.query('SELECT * FROM employee', function (err, results) {
    res.json(results);
    });
})

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});