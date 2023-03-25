const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');


//DB connection
let taskArray = [];

// GET
taskRouter.get('/', (req, res) => {
    console.log ('GET request');
    let queryText = 'SELECT * FROM "tasklist";'; //sends back list of to do tasks
    pool.query(queryText).then((result) => {
        res.send(result.rows); //result.rows is the array of data from our database
    }).catch ((error) => {
        console.log (`Error in GET: ${error}`);
        res.sendStatus(500);
    });
});

// POST
taskRouter.post('/', (req, res) => {
    console.log('POST request');
    console.log(req.body);
let taskToAdd = req.body;
let queryText = `INSERT INTO "tasklist" (taskname, date, completionstatus)
                VALUES ($1, $2, $3);`;
let values = [taskToAdd.taskname, taskToAdd.date, taskToAdd.completionstatus ]
pool.query(queryText, values).then((result) => {
    res.sendStatus(201);
}).catch((error) => {
    console.log(`Error in POST: ${error}`);
    res.sendStatus(500);
})
});



// PUT
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

// PUT
taskRouter.put('/completedstatus/:id', (req, res) => {
    console.log('In mark PUT request');
    console.log("this is the task you sent through to update:", req.body)
    console.log("completion status to be changed", req.body.completionstatus)
let taskToEdit = req.body;
let completionstatus;
if (taskToEdit.completionstatus === false) {
    completionstatus = true
} else if (taskToEdit.completionstatus === true) {
    completionstatus = false
}
console.log('new completion status', completionstatus)
// UPDATE "tasklist" and change completionstatus column to opposite of what it is currently WHERE the id is taskToEdit.id"
let queryText = 'UPDATE "tasklist" SET "completionstatus" = $1 WHERE "id" = $2'; //TODO set in desc order
pool.query(queryText, [completionstatus, taskToEdit.id]).then((result) => {
    res.sendStatus(200);
}).catch((error) => {
    console.log(`Error in PUT: ${error} `);
    res.sendStatus(500);
})
});



// DELETE
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
