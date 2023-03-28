import axios from 'axios'
import './TaskItem.css'
import {useState} from 'react'

function TaskItem({ task, fetchTaskList }) {
    const [completed, setCompleted] = useState("No")

//! PUT request
    const markComplete = (e) => {
        console.log(task.id)
        axios.put(`/todolist/completedstatus/${task.id}`, task).then(response => {
            fetchTaskList();
        }).catch((error) => {
            console.log(`Error in markComplete ${error}`);
            alert('Something is wrong in markComplete.');
        })


    }// end markComplete function

//! DELETE request
    const removeTask = (e) => {
        
        axios.delete(`/todolist/${task.id}`).then((response) => {
            fetchTaskList();
        }).catch((error) => {
            console.log(`Error in removeItem ${error}`);
            alert('Something is wrong in delete.');
        })
    };// end removeTask function

//! Sets completionstatus to correspond with that status on the database
    let completionstatus;
    if (task.completionstatus === true) {
        completionstatus = "Yes"
    } else if (task.completionstatus === false) {
        completionstatus = "No"
    }; 

//! This will change the background color of the <li> depending on completion status
const changeColor = () => {
    if (completionstatus === "Yes") {
        return 'green'
    } else {
        return '#FFB3A2'
    };
} //end changeColor()

//!What will display on the DOM, changeColor() will set the background color based on value of completionstatus variable
    return (

        <>
            <li style={{backgroundColor: changeColor()}} className='listItem'>
                Task: {task.taskname} <br/> Date: {task.date} <br/> Completed: {completionstatus} <br/>
                <button className='complete-button' onClick={(e) => markComplete(e)} > Mark Complete</button>
                <button className='delete-button' onClick= {(e) => removeTask(e)}> Delete </button>
                
            </li>
        </>

    )//end return
}//end TaskItem()

export default TaskItem;