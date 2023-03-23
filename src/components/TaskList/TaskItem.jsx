import axios from 'axios'

function TaskItem({ task }) {

    const changeTextColor = () => {
        if (task.completionStatus === 'yes'){
            return 'dark-red'
        } else {
            return 'none'
        };
    };//end getDecoration function

    //!Need to get this working, need to call this function within the <li>
    // const changeBackgroundColor = () => {
    //     if( task.completionStatus === 'yes'){
    //         return 'red'
    //     } else {
    //         return 'none';
    //     };
    // };

    const removeTask = (e) => {
        console.log(`removeTask ${ task.id }`);
    }


    return (

        <>
            <li style= {{ color: changeTextColor()}}>
                Task: {task.taskName} Date: {task.date} Status: {task.completionStatus}
                <button onClick= {(e) => removeTask(e)}> Delete </button>
            </li>
        </>

    )
}//end function

export default TaskItem;