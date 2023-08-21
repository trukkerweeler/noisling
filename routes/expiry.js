require('dotenv').config();
// sequelize...

const express = require('express');
const router = express.Router();
const mysql = require('mysql');


// Get all expiry records
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

        const query = 'SELECT * FROM EXPIRATION e where DISPOSITION != "D" ORDER BY EXPIRATION_ID DESC';
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

// Insert a new expiry record
router.post('/', (req, res) => {
    const expiry = req.body;
    console.log(expiry);

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

        const query = 'INSERT INTO EXPIRATION (EXPIRATION_ID, PRODUCT_ID, EXPIRY, LOT, DISPOSITION, COMMENT) VALUES ("0000004", "' + expiry.product_id + '", "' + expiry.expiration_date + '", "' + expiry.lotno + '", "' + expiry.disposition + '", "' + expiry.comments + '")';
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
    } catch (err) {
        console.log('Error connecting to Db');
        return;
    }
    document.getElementById("expiryForm").reset();
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