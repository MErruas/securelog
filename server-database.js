const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const CONFIG_FILE = path.join(__dirname, '.db_config');

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt user for input
function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

// Function to read saved config
function readConfig() {
    try {
        if (fs.existsSync(CONFIG_FILE)) {
            const data = fs.readFileSync(CONFIG_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('Error reading config:', err.message);
    }
    return null;
}

// Function to save config
function saveConfig(password, port) {
    try {
        fs.writeFileSync(CONFIG_FILE, JSON.stringify({ password, port }), 'utf8');
        fs.chmodSync(CONFIG_FILE, 0o600); // Make it readable only by owner
    } catch (err) {
        console.error('Error saving config:', err.message);
    }
}

// Main initialization function
async function init() {
    try {
        let password, mysqlPort;

        // Check if config exists
        const savedConfig = readConfig();

        if (savedConfig) {
            console.log('Using saved MySQL credentials...');
            password = savedConfig.password;
            mysqlPort = savedConfig.port;
        } else {
            // Ask for MySQL password
            password = await question('Enter your MySQL root password: ');

            // Ask for MySQL port (default 3306)
            const portInput = await question('Enter MySQL port (default 3306): ');
            mysqlPort = portInput.trim() || '3306';

            // Save config for next time
            saveConfig(password, mysqlPort);
            console.log('Credentials saved for future use.');
            console.log('To reset, delete the .db_config file.\n');
        }

        rl.close();

        // Create MySQL connection pool
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: password,
            port: mysqlPort,
            database: 'project',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        // Test connection
        pool.query('SELECT 1', (err) => {
            if (err) {
                console.error('Error connecting to MySQL database:', err.message);
                console.error('Please check your credentials and make sure MySQL is running.');
                console.error('If credentials are wrong, delete .db_config file and try again.');
                process.exit(1);
            }
            console.log('Connected to MySQL database successfully.');
        });

        // API Routes

        // View all incidents
        app.get('/api/incidents', (req, res) => {
            pool.query(
                `SELECT 
                    IncidentID as id,
                    Date as date,
                    ThreatType as type,
                    SeverityLevel as severity,
                    Company as org,
                    Country as country,
                    Latitude as lat,
                    Longitude as lng,
                    ResponseTime as responseTime,
                    DataBreached as dataBreached,
                    MitigationStrategy as mitigationStrategy,
                    AffectedIndustry as affectedIndustry,
                    FinancialImpact as financialImpact
                FROM INCIDENT
                ORDER BY Date DESC`,
                (err, results) => {
                    if (err) {
                        console.error('Database query error:', err.message);
                        return res.status(500).json({ error: err.message });
                    }
                    console.log(`Returned ${results.length} incidents`);
                    res.json(results);
                }
            );
        });

        // Add a new incident
        app.post('/api/incidents', (req, res) => {
            const { date, type, severity, org, country, lat, lng, responseTime, dataBreached, mitigationStrategy, affectedIndustry, financialImpact } = req.body;

            pool.query(
                `INSERT INTO INCIDENT 
                (Date, ThreatType, SeverityLevel, Company, Country, Latitude, Longitude, ResponseTime, DataBreached, MitigationStrategy, AffectedIndustry, FinancialImpact) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [date, type, severity, org, country, lat, lng, responseTime, dataBreached, mitigationStrategy, affectedIndustry, financialImpact],
                (err, results) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.status(201).json({
                        id: results.insertId,
                        date,
                        type,
                        severity,
                        org,
                        country,
                        lat,
                        lng,
                        responseTime,
                        dataBreached,
                        mitigationStrategy,
                        affectedIndustry,
                        financialImpact
                    });
                }
            );
        });

        // Update an incident
        app.put('/api/incidents/:id', (req, res) => {
            const { id } = req.params;
            const { date, type, severity, org, country, lat, lng, responseTime, dataBreached, mitigationStrategy, affectedIndustry, financialImpact } = req.body;

            pool.query(
                `UPDATE INCIDENT 
                SET Date = ?, ThreatType = ?, SeverityLevel = ?, Company = ?, Country = ?, Latitude = ?, Longitude = ?, 
                ResponseTime = ?, DataBreached = ?, MitigationStrategy = ?, AffectedIndustry = ?, FinancialImpact = ? 
                WHERE IncidentID = ?`,
                [date, type, severity, org, country, lat, lng, responseTime, dataBreached, mitigationStrategy, affectedIndustry, financialImpact, id],
                (err, results) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    if (results.affectedRows === 0) {
                        return res.status(404).json({ error: 'Incident not found' });
                    }
                    res.json({ id, date, type, severity, org, country, lat, lng, responseTime, dataBreached, mitigationStrategy, affectedIndustry, financialImpact });
                }
            );
        });

        // Delete an incident
        app.delete('/api/incidents/:id', (req, res) => {
            const { id } = req.params;
            pool.query('DELETE FROM INCIDENT WHERE IncidentID = ?', [id], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({ error: 'Incident not found' });
                }
                res.status(204).end();
            });
        });

        // Close the pool on server shutdown
        process.on('SIGINT', () => {
            pool.end(err => {
                if (err) {
                    console.error('Error closing the database connection:', err.message);
                } else {
                    console.log('Database connection closed.');
                }
                process.exit(err ? 1 : 0);
            });
        });

        // Start server on port 3000
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`\nServer running on \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
            console.log('Press Ctrl+C to stop the server.');
        });

    } catch (error) {
        console.error('Initialization error:', error);
        process.exit(1);
    }
}

// Start the application
init();