import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'project'
}).promise()

// connect
app.listen(3000, () => console.log('Server running on port 3000'))

// view all incidents
app.get('/incidents', async (req, res) => {
    const sql = `
        SELECT 
            IncidentID AS id,
            Year AS date,
            ThreatType AS type,
            SeverityLevel AS severity,
            Company AS org,
            Country AS country,
            ResponseTime AS responseTime,
            DataBreached AS dataBreached,
            MitigationStrategy AS mitigationStrategy,
            AffectedIndustry AS affectedIndustry,
            FinancialImpact AS financialImpact,
            Lat AS lat,
            Lng AS lng
        FROM INCIDENT
    `
    try {
        const [results] = await pool.query(sql);
        res.json(results);
    } catch (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: err.message });
    }
})

// add a new incident
app.post('/incidents', async (req, res) => {
    const { IncidentID, CompanyID, Country, Year, ThreatType,
        AffectedIndustry, DataBreached, FinancialImpact,
        SeverityLevel, ResponseTime, MitigationStrategy, Company, Lat, Lng } = req.body
        
    try {
        const [results] = await pool.query(
            `INSERT INTO INCIDENT (
                IncidentID, CompanyID, Country, Year, ThreatType,
                AffectedIndustry, DataBreached, FinancialImpact,
                SeverityLevel, ResponseTime, MitigationStrategy, Company, Lat, Lng
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             `,
            [IncidentID, CompanyID, Country, Year, ThreatType,
                AffectedIndustry, DataBreached, FinancialImpact,
                SeverityLevel, ResponseTime, MitigationStrategy, Company, Lat, Lng]
        );
        res.status(201).json({ id: results.insertId, IncidentID, CompanyID, Country, Year, ThreatType,
            AffectedIndustry, DataBreached, FinancialImpact,
            SeverityLevel, ResponseTime, MitigationStrategy, Company, Lat, Lng })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

// update an incident
app.put('/incidents/:id', async (req, res) => {
    const { id } = req.params
    const { IncidentID, CompanyID, Country, Year, ThreatType,
        AffectedIndustry, DataBreached, FinancialImpact,
        SeverityLevel, ResponseTime, MitigationStrategy, Company, Lat, Lng } = req.body
    try {
        const [results] = await pool.query(
            'UPDATE incident SET IncidentID = ?, CompanyID = ?, Country = ?, Year = ?, ThreatType = ?, AffectedIndustry = ?, DataBreached = ?, FinancialImpact = ?, SeverityLevel = ?, ResponseTime = ?, MitigationStrategy = ?, Company = ? WHERE IncidentID = ?',
            [IncidentID, CompanyID, Country, Year, ThreatType,
                AffectedIndustry, DataBreached, FinancialImpact,
                SeverityLevel, ResponseTime, MitigationStrategy, Company, id]
        );
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Incident not found' })
        }
        res.json({ id, IncidentID, CompanyID, Country, Year, ThreatType,
            AffectedIndustry, DataBreached, FinancialImpact,
            SeverityLevel, ResponseTime, MitigationStrategy, Company })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

// delete an incident
app.delete('/incidents/:id', async (req, res) => {
    const { id } = req.params
    try {
        const [results] = await pool.query('DELETE FROM incident WHERE IncidentID = ?', [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Incident not found' })
        }
        res.status(204).end()
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

// close the pool on server shutdown
process.on('SIGINT', () => {
    pool.end(err => {
        if (err) {
            console.error('Error closing the database connection:', err.message)
        } else {
            console.log('Database connection closed.')
        }
        process.exit(err ? 1 : 0)
    })
})

export default pool