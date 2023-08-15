require('dotenv').config();
// sequelize...

const express = require('express');
const router = express.Router();
const mysql = require('mysql');


// Get all corrective actions
router.get('/', (req, res) => {
    try {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: 3306,
            database: 'quality'
        });
        connection.connect(function(err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }
        console.log('Connected to DB');

        const query = 'SELECT c.*, ct.NC_TREND FROM CORRECTIVE c left join CORRECTIVE_TREND ct on c.CORRECTIVE_ID = ct.CORRECTIVE_ID where CLOSED = "N" ORDER BY c.CORRECTIVE_ID DESC';
        // const query = 'SELECT c.*, ct.NC_TREND FROM CORRECTIVE c left join CORRECTIVE_TREND ct on c.CORRECTIVE_ID = ct.CORRECTIVE_ID where CLOSED = "N" ORDER BY c.CORRECTIVE_ID DESC';
        connection.query(query, (err, rows, fields) => {
            if (err) {
                console.log('Failed to query for corrective actions: ' + err);
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });

        connection.end();
        });
    

    // res.send('Hello Corrective!');
    } catch (err) {
        console.log('Error connecting to Db');
        return;
    }

});

// Flip the closed status of a corrective action
router.post('/:id/flip', (req, res) => {
    const correctiveId = req.params.id;

    try {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: 3306,
            database: 'quality'
        });
        connection.connect(function(err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }
        console.log('Connected to DB');

        const query = 'select CLOSED from CORRECTIVE where CORRECTIVE_ID = ' + correctiveId;
        connection.query(query, (err, rows, fields) => {
            if (err) {
                console.log('Failed to query for corrective actions: ' + err);
                res.sendStatus(500);
                return;
            }
            const currentClosed = rows[0].CLOSED;
            const newClosed = currentClosed === 'Y' ? '' : 'Y';
            const updateQuery = 'UPDATE CORRECTIVE SET CLOSED = "' + newClosed + '" WHERE CORRECTIVE_ID = ' + correctiveId;
            connection.query(updateQuery, (err, rows, fields) => {
                if (err) {
                    console.log('Failed to query for corrective actions: ' + err);
                    res.sendStatus(500);
                    return;
                }
                res.redirect(303, '/');
                connection.end();
            });
        });
        
        });
    

    // res.send('Hello Corrective!');
    } catch (err) {
        console.log('Error connecting to Db');
        return;
    }
});



module.exports = router;