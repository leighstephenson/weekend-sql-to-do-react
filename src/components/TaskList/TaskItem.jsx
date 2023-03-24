import axios from 'axios'
import './TaskItem.css'

function TaskItem({ task, fetchTaskList }) {

    const changeTextColor = () => {
        if (task.completionstatus === 'Yes'){
            return 'white'
        } else {
            return 'none'
        };
    };//end getDecoration function

    //!Need to get this working, need to call this function within the <li>
    const changeBackgroundColor = () => {
        console.log(task.completionstatus);
        if( task.completionstatus === 'Yes'){
            return 'red'
        } else {
            return 'none';
        };
    };

    const markComplete = (e) => {
//! Need to finish making this to "complete" tasks rather than having users input a completion status


    }// end markComplete function

    const removeTask = (e) => {
        
        axios.delete(`/todolist/${task.id}`).then((response) => {
            fetchTaskList();
        }).catch((error) => {
            console.log(`Error in removeItem ${error}`);
            alert('Something is wrong in delete.');
        })
    };// end removeTask function
 
    return (

        <>
            <li className='listItem' style= {{ color: changeTextColor(), backgroundColor: changeBackgroundColor()}}>
                Task: {task.taskname} Date: {task.date} Status: {task.completionstatus}
                <button onClick={(e) => markComplete(e)}> Mark Complete</button>
                <button className='deleteButton' onClick= {(e) => removeTask(e)}> Delete </button>
                
            </li>
        </>

    )
}//end function

export default TaskItem;