require('dotenv').config();
// sequelize...

const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Update expiry record next ID
// Should this really call the existing value instead of the one passed in?
router.put('/increment', async (req, res) => {
    console.log(req.body);
    let newId = req.body['nextId'];
    // let newId = parseInt(lastid) + 1;
    // newId = newId.toString().padStart(7, '0');

    try {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: PORT,
            database: 'quality'
        });
        connection.connect(function(err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }
        console.log('Connected to DB 245');
        if (newId === '') {
        const query = 'UPDATE SYSTEM_IDS SET CURRENT_ID = "' + newId + '" WHERE TABLE_NAME = "EXPIRATION"';
        connection.query(query, (err, rows, fields) => {
            if (err) {
                console.log('Failed to update for expiry: ' + err);
                res.sendStatus(500);
                return;
            }
            res.status(204).send();
        });
        } else {
            res.status(204).send();
        }

        connection.end();
        });
    } catch (err) {
        console.log('Error connecting to Db 233');
        return;
    }
});

// Get the next ID for a new expiry record
router.get('/nextId', (req, res) => {
    // res.json('0000005');
    // console.log('nextId router');
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
        // console.log('Connected to DB');

        const query = 'SELECT CURRENT_ID FROM SYSTEM_IDS where TABLE_NAME = "EXPIRATION"';
        connection.query(query, (err, rows, fields) => {
            if (err) {
                console.log('Failed to query for corrective actions: ' + err);
                res.sendStatus(500);
                return;
            }
            const nextId = parseInt(rows[0].CURRENT_ID) + 1;
            let dbNextId = nextId.toString().padStart(7, '0');

            res.json(dbNextId);
        });    

        connection.end();
        });
    } catch (err) {
        console.log('Error connecting to Db 43');
        return;
    }
});


module.exports = router;