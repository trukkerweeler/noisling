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