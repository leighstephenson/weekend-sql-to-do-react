const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
//! Table name = list, need to build on postico
router.get('/', (req, res) => {
    console.log ('GET request');
    let queryText = 'SELECT * FROM "list";';
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch ((error) => {
        console.log (`Error in GET: ${error}`);
        res.sendStatus(500);
    });
});

// POST




// PUT

// DELETE

module.exports = router;
