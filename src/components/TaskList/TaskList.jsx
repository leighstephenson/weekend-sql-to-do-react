import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

function TaskList() {
    const [taskName, setTaskName] = useState('');
    const [date, setDate] = useState('');
    const [listOfTasks, setListOfTasks] = useState([]);
    const [completionStatus, setCompletionStatus]= useState('');
    const fetchTaskList = () => {

//! GET request
     axios.get('/todolist').then((response) => {
        //update the array
        setListOfTasks(response.data);
    }).catch((error) => {
        console.log(`Error in GET ${error}`);
        alert('Something is wrong.');
    });
}

useEffect(() => {
    fetchTaskList();
}, []);

//! POST request
const submitForm = (e) => {
    e.preventDefault();
    axios.post('/todolist', {
        taskname: taskName,
        date: date,
        completionstatus: false,
    }).then((response) => {
        setTaskName('');
        setDate(''); //These clear the input fields
        setCompletionStatus('');
    fetchTaskList(); //calls the object
    }).catch((error) => {
        console.log(`Error in POST on TaskList: ${error}`);
        alert('Something wrong in POST on TaskList');
    })
};

//! Form to enter task and date, displays on the DOM
    return ( 

        <> 
            <h3>Enter Task for To Do List:</h3>
    <div className="form-style">
        <form onSubmit={submitForm}>
                Task: <input type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
            <br/>
                Date: <input type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}

                />
            <br/>
            <input className="submitButton" type="submit" />
        </form>
    </div>
        <ul>
            {
                listOfTasks.map((task) => (
                    <TaskItem 
                    key={task.id}
                    task={task}
                    fetchTaskList={fetchTaskList}
                    />
                ))
            }
            
        </ul>
        </>
        
    );
}//End TaskList function



export default TaskList; 