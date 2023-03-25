import axios from 'axios'
import './TaskItem.css'
import {useState} from 'react'

function TaskItem({ task, fetchTaskList }) {
    const [completed, setCompleted] = useState("No")

    const markComplete = (e) => {
        console.log(task.id)
        axios.put(`/todolist/completedstatus/${task.id}`, task).then(response => {
            fetchTaskList();
        }).catch((error) => {
            console.log(`Error in markComplete ${error}`);
            alert('Something is wrong in markComplete.');
        })


    }// end markComplete function

    const removeTask = (e) => {
        
        axios.delete(`/todolist/${task.id}`).then((response) => {
            fetchTaskList();
        }).catch((error) => {
            console.log(`Error in removeItem ${error}`);
            alert('Something is wrong in delete.');
        })
    };// end removeTask function

    let completionstatus;
    if (task.completionstatus === true) {
        completionstatus = "Yes"
    } else if (task.completionstatus === false) {
        completionstatus = "No"
    }; 

//! Need to move this color changing functionality into a conditional and get rid of this
    event.target.parentElement.style.backgroundColor='green'; //changes background color of parent 
    event.target.parentElement.style.color='lightGreen'; //changes text color of parent 
    
    //TODO conditional will go here to change color
    //if (task.completionstatus === true) {
       //todo finish setting background/text color
    //}else {

    //}

    return (

        <>
            <li className='listItem'>
                Task- {task.taskname}. <br/> Date- {task.date}. <br/> Completion Status- {completionstatus}
                <button className='complete-button' onClick={(e) => markComplete(e)}> Mark Complete</button>
                <button className='delete-button' onClick= {(e) => removeTask(e)}> Delete </button>
                
            </li>
        </>

    )
}//end function

export default TaskItem;