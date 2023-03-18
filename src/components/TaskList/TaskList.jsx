import { useState, useEffect } from 'react';
import axios from 'axios';

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
        taskName: taskName,
        date: date,
        completionStatus: completionStatus,
    }).then((response) => {
        setTaskName('');
        setDate(''); //These clear the input fields
        setCompletionStatus('');
    }).catch((error) => {
        console.log(`Error in POST on TaskList: ${error}`);
        alert('Something wrong in POST on TaskList');
    })
}
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
                    <li key={task.id}>
                        //! May need to edit these 
                       Task: {task.taskName} Date: {task.date} Status: {task.completionStatus}
                    </li>
                ))
            };
        </ul>
        </>


    );


}//End TaskInput function



export default TaskList; 