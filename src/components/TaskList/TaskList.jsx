import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

function TaskList() {
    const [taskName, setTaskName] = useState('');
    const [date, setDate] = useState('');
    const [completionStatus, setCompletionStatus] = useState('');
    const [listOfTasks, setListOfTasks] = useState([]);
    const fetchTaskList = () => {
   
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

const submitForm = (e) => {
    e.preventDefault();
    axios.post('/todolist', {
        taskname: taskName,
        date: date,
        completionstatus: completionStatus,
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
    return ( 

        <> 
            <h3>Enter Task for To Do List:</h3>
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
                Completion Status: <input type="text"
                    value={completionStatus}
                    onChange={(e) => setCompletionStatus(e.target.value)}

                />
            <input type="submit" />
        </form>
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