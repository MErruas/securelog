import mysql from 'mysql2'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: ' ',
    database: 'project'
})

// connect
app.listen(3000, () => console.log('Server running on port 3000'))

// view all incidents
app.get('/incidents', (req, res) => {
    pool.query('SELECT * FROM incident', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.json(results)
    })
})

// add a new incident
app.post('/incidents', (req, res) => {
    const { title, description, date } = req.body
    pool.query(
        'INSERT INTO incident (title, description, date) VALUES (?, ?, ?)',
        [title, description, date],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message })
            }
            res.status(201).json({ id: results.insertId, title, description, date })
        }
    )
})

// update an incident
app.put('/incidents/:id', (req, res) => {
    const { id } = req.params
    const { title, description, date } = req.body
    pool.query(
        'UPDATE incident SET title = ?, description = ?, date = ? WHERE id = ?',
        [title, description, date, id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message })
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Incident not found' })
            }
            res.json({ id, title, description, date })
        }
    )
})

// delete an incident
app.delete('/incidents/:id', (req, res) => {
    const { id } = req.params
    pool.query('DELETE FROM incident WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Incident not found' })
        }
        res.status(204).end()
    })
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