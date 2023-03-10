console.log ('JS working')

function addItem(event) {
    event.preventDefault ();
    console.log('In addItem function')

    let taskName = //TODO list HTML link here;
    let date = //TODO list HTML link here;
    let completionStatus = //TODO list HTML link here


let itemToAdd = {

    taskName: taskName,
    date: date,
    completionStatus: completionStatus,
}; //ends object

axios.post ('/todolist', itemToAdd).then((response)=> {
    console.log('POST response', response);
getTasks();
}).catch((error) => {
    console.log('Error in POST!!', error);
    alert('Something wrong here..');
})
}; //ends addItem function

function getTasks(){
    console.log('In getTasks');
    axios.get('/todolist').then((response) => {
        console.log('Response in GET', response);

        let taskArray = response.data;
        let divNameHere = document.querySelector('#putIdHere') //TODO link html here
        divNameHere.innerHTML = '';

    for (let task of taskArray){
        divNameHere.innerHTML += `
        <tr>
        <td> ${task.taskName} </td>
        <td> ${task.date} </td>
        <td> ${task.completionStatus} </td>
        <td> <button onclick="markComplete(event)"> Mark complete </button> </td>
        <td> <button onclick="deleteTask(event)"> Delete </button> </td>
        </tr> `; //^Appends the DOM, need to link these buttons when we get to react
    }
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong.');
 });
}// ends getTasks function

getTasks();

function deleteTask(index){
    console.log('In delete function');
axios.delete(`/todolist/${index}`).then((response) => {
    console.log (response);
    getTasks();
}).catch((error) => {
    console.log(error);
    alert ('Something went wrong.'); 
    })
};