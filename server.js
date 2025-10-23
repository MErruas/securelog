

const express = require("express");
const mysql = require("mysql2")
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


// MySQL connection
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '.....',
	database: 'project'
	});

// Connect to MySQL
db.connect(err => {
	if (err){ throw err;}
	console.log('Connected to MySQL database.');
	});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
