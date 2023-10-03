require('dotenv').config();
// sequelize...

const express = require('express');
const router = express.Router();
const mysql = require('mysql');

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


// Get a single expiry record
router.get('/:id', (req, res) => {
    try{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: process.env.PORT,
            database: 'quality'
        });
        connection.connect(function(err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }
        console.log('Connected to DB 64');

        const query = `SELECT * from EXPIRATION where EXPIRATION_ID = "${req.params.id}"`;

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
        console.log('Error connecting to Db 80');
        return;
    }

});

// Get all expiry records
router.get('/', (req, res) => {
    try {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: process.env.PORT,
            database: 'quality'
        });
        connection.connect(function(err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }
        // console.log('Connected to DB 60');

        const query = `SELECT EXPIRATION_ID
        , PRODUCT_ID
        , EXPIRY_DATE
        , LOT
        , DISPOSITION 
        FROM EXPIRATION e 
        where (DISPOSITION != "D" or DISPOSITION is null) ORDER BY EXPIRATION_ID DESC`;

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
        console.log('Error connecting to Db 49');
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
        console.log('Connected to DB 150');

        // const query = 'INSERT INTO EXPIRATION (EXPIRATION_ID, PRODUCT_ID, EXPIRY_DATE, LOT, DISPOSITION, COMMENT) VALUES ("' + expiry.expiration_id + '", "' + expiry.product_id + '", "' + expiry.expiration_date + '", "' + expiry.lotno + '", "' + expiry.disposition + '", "' + expiry.comments + '")';
        const query = 'INSERT INTO EXPIRATION (EXPIRATION_ID, PRODUCT_ID, EXPIRY_DATE, LOT, CREATE_BY, CREATE_DATE) VALUES ("' + expiry.expiration_id + '", "' + expiry.product_id + '", "' + expiry.expiration_date + '", "' + expiry.lotno + '", "' + req.body.CREATE_BY + '", "' + req.body.CREATE_DATE + '")';
        connection.query(query, (err, rows, fields) => {
            if (err) {
                console.log('Failed to query for insert expiry: ' + err);
                res.sendStatus(500);

                return;
            }
            res.json(rows);
        
        });

        const updateQuery = 'UPDATE SYSTEM_IDS SET CURRENT_ID = "' + expiry.expiration_id + '" WHERE TABLE_NAME = "EXPIRATION"';
        connection.query(updateQuery, (err, rows, fields) => {
            if (err) {
                console.log('Failed to query for insert system ids: ' + err);
                res.sendStatus(500);
                return;
            }
        });
        
        connection.end();
        });
    } catch (err) {
        console.log('Error connecting to Db 136');
        return;
    }
    // document.getElementById("expiryForm").reset();
});

// Update an expiry record
router.put('/:id', (req, res) => {
    // console.log(req.body);
    disposition = req.body['disposition'];
    // console.log(disposition);
    expiry_id = req.body['id'];
    // console.log(expiry_id);

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

        const query = 'UPDATE EXPIRATION SET DISPOSITION = "' + disposition + '" WHERE EXPIRATION_ID = "' + expiry_id + '"';
        // const query = 'UPDATE EXPIRATION SET PRODUCT_ID = "' + expiry.product_id + '", EXPIRY = "' + expiry.expiration_date + '", LOT = "' + expiry.lotno + '", DISPOSITION = "' + expiry.disposition + '", COMMENT = "' + expiry.comments + '" WHERE EXPIRATION_ID = "' + expiry.expiry_id + '"';
        connection.query(query, (err, rows, fields) => {
            if (err) {
                console.log('Failed to update for expiry: ' + err);
                res.sendStatus(500);
                return;
            }
            // res.json(rows);
        });

        connection.end();
        });
    } catch (err) {
        console.log('Error connecting to Db 142');
        return;
    }
});


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


module.exports = router;