const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');


//DB connection
let taskArray = [];

//! GET request
taskRouter.get('/', (req, res) => {
    console.log('GET request');
    let queryText = 'SELECT * FROM "tasklist" ORDER BY "id" DESC;'; //sends back list of to do tasks
    pool.query(queryText).then((result) => {
        res.send(result.rows); //result.rows is the array of data from our database
    }).catch((error) => {
        console.log(`Error in GET: ${error}`);
        res.sendStatus(500);
    });
});

//! POST request to add task to "tasklist" table on database
taskRouter.post('/', (req, res) => {
    console.log('POST request');
    console.log(req.body);
    let taskToAdd = req.body;
    let queryText = `INSERT INTO "tasklist" (taskname, date, completionstatus)
                VALUES ($1, $2, $3);`;
    let values = [taskToAdd.taskname, taskToAdd.date, taskToAdd.completionstatus]
    pool.query(queryText, values).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error in POST: ${error}`);
        res.sendStatus(500);
    })
});



//! PUT request to update "tasklist" with new task
taskRouter.put('/:id', (req, res) => {
    console.log('In PUT request');

    let taskId = req.params.id;
    let taskToEdit = req.params.body;
    let queryText = 'UPDATE "tasklist" SET "taskname" = $1, "date" = $2, "completionstatus = $3';
    pool.query(queryText, [taskToEdit.taskname, taskToEdit.date, taskToEdit.completionstatus]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in PUT: ${error} `);
        res.sendStatus(500);
    })
});

//! PUT request to update the database with completion status when marked complete
taskRouter.put('/completedstatus/:id', (req, res) => {
    let taskToEdit = req.body;
    let completionstatus;
    if (taskToEdit.completionstatus === false) {
        completionstatus = true        //this conditional toggles completion status
    } else if (taskToEdit.completionstatus === true) {
        completionstatus = false
    }
    let queryText = 'UPDATE "tasklist" SET "completionstatus" = $1 WHERE "id" = $2';
    pool.query(queryText, [completionstatus, taskToEdit.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in PUT on router: ${error} `);
        res.sendStatus(500);
    })
});



//! DELETE request
taskRouter.delete('/:id', (req, res) => {
    console.log('this is the deleted id:', req.params.id)
    const deleteIndex = Number(req.params.id);
    let queryText = `DELETE FROM "tasklist" WHERE "id" = $1`;
    pool.query(queryText, [deleteIndex]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in DELETE: ${error}`)
        res.sendStatus(500);
    })
});


module.exports = taskRouter;
