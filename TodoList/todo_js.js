//class representing each individual task in todolist
class Task {
    constructor(date, task, completed, additional) {
        this.date = date; 
        this.task = task; 
        this.completed = completed; 
        this.additional = additional; 
    }

    static addToList(array, {date, task, completed, additional}) {
        array.push(new Task(date, task, completed, additional)); 
    }
}

//Array that keeps track of all tasks in form of Task[] 
var tasks = []; 

// Main stuff that happens when user opens website: 
var dragging = undefined; 
readFile(); 



// TODO: Make this with MongoDB

async function readFile() {

    await axios.get("http://localhost:8080")
        .then((res) => {

            let lines = res.data.split("\n");
            

            for(let line of lines) { 

                let task = JSON.parse(line); 

                addToTable(task); 
            }
        })
        .catch(err=> console.log(err)); 
}

async function save() {

    
    // works properly
    await axios.post("http://localhost:8080"); 


    //Fix this: 
    for(let task of tasks) {

        // Acquired from Postman Snippet
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/new',
            headers: { 
            'Content-Type': 'application/json'
            },
            data : JSON.stringify(task)
        };
        await axios(config).then().catch(err=>console.log(err)); 
    }

    alert("Succesfully saved!"); 
}

//Adds a task when add_button clicked
function addTask() {

    //defines individual task object
    let taskInput = {date: " ", task: " ", completed: "No", additional: "No"}; 
    // Starts getting user input for task

    /*
    while(taskInput.task == undefined) {
        taskInput.task = prompt("What do you need to do? ");
    }
    while(taskInput.date == undefined ) {
        taskInput.date = prompt("When's the deadline?"); 
    }
    taskInput.completed = false; 
    taskInput.additional = prompt("Anything else I need to know?"); 

    */
    // Finished getting user input 

    addToTable(taskInput); 
    
}

function addToTable(taskInput) {
    const taskTable = document.getElementById('task_table');

     //Adds new row to table
     var newRow = taskTable.insertRow(); 

     //sets individual cells to inputted data
     let cell1 = newRow.insertCell(); 
     cell1.innerHTML = taskInput.date; 
     newRow.insertCell().innerHTML = taskInput.task;  
     newRow.insertCell().innerHTML = taskInput.completed; 
     newRow.insertCell().innerHTML = taskInput.additional; 
 
     newRow.draggable = true; 
     newRow.contentEditable = true;     
 
     addDragging(newRow); 

     //Will keep track of if an individual cell is edited, change the task[] so the edit can be saved. 
     for(let cell of newRow.children) {

        cell.addEventListener("click", (event) => {
            console.log("THIS BETTER WORK"); 
            let index = getIndex(cell.parentElement) - 1; 

            let col = getCol(cell.parentElement, cell); 

            if(col == 0) tasks[index].date = cell.innerHTML; 
            if(col == 1) tasks[index].task = cell.innerHTML; 
            if(col == 2) tasks[index].completed = cell.innerHTML; 
            if(col == 3) tasks[index].additional = cell.innerHTML; 
        }); 
     }
 
     //Replace with proper constructor and OOP after learning
     Task.addToList(tasks, taskInput); 

}

function addDragging(newRow) {
    const taskTable = document.getElementById('task_table'); 
    const taskTableBody = taskTable.children[0];

    newRow.addEventListener('dragstart', (event) => {

        //TODO: Make placeholder div that keeps track of row as its dragged, 
        // and remove from the original table, so you u have better formatting
        

        
        let dragged = event.target; 

        dragged.classList.add('dragging');

        //TODO: Figure out how to hide the row when dragging in the table, without hiding the 
        //row being dragged


        let index = getIndex(dragged); 

        dragging = dragged; 

        if(index == -1) alert("Error Occurred in dragging row"); 

    }); 

    newRow.addEventListener('dragend', (event) => {

       //event.target.classList.remove('dragging'); 

    });  

    newRow.addEventListener('dragenter', (event) => {
        if(getIndex(event.target.parentElement) != 0) {
            event.target.parentElement.classList.add('dropzone'); 
        }

    }); 
    newRow.addEventListener('dragleave', (event) => {
        event.target.parentElement.classList.remove('dropzone'); 

    }); 

    //Need to prevent default for dragover for drop event to fire

    newRow.addEventListener('dragover', (event) => {
        event.preventDefault(); 
    }); 

    newRow.addEventListener('drop', (event) => {
        event.preventDefault(); 

        let dropzone = event.target; 

        dropzone.parentElement.classList.remove('dropzone'); 

        dragging.classList.remove('dragging'); 

        //TODO: Figure out how to remove original version of row, and insert it back 
        // in new position

        if(dragging == undefined) alert("Error Occurred in dropping row");

        //Saves row indices of dragging + dropzone rows
        let dragIndex = getIndex(dragging); 
        let dropIndex = getIndex(dropzone.parentElement); 
        
        if(dragIndex != dropIndex) {

            
            // TODO: This is wrong, fix it
            let temp = tasks[dragIndex]; 
            tasks[dragIndex] = tasks[dropIndex]; 
            tasks[dropIndex] = temp; 

            //removeTaskIndex(getIndex(dragging)); Wasn't working for some reason

            dropzone.parentElement.insertAdjacentElement('beforebegin', dragging); 

            
        }

        dragging = undefined; 

    });


}

function getIndex(row) { 
    const taskTable = document.getElementById('task_table'); 
    const taskTableBody = taskTable.children[0]; 

    let index = -1; 

    for(let i = 0; i < taskTableBody.children.length; i++) {
        if(row === taskTableBody.children[i]) index = i; 
    }

    return index; 
}

function getCol(row, cell) {
    for(let i = 0; i < row.children.length; i++) {
        if(row.children[i] == cell) return i; 
    }

    return -1; 
}


function removeTask() {



    let deletion = NaN; 

    // Gets input from user of which task should be removed + 
    // makes sure the input is a number so index can be removed
    while(isNaN(deletion) || deletion == 0) {
        deletion = prompt("Which task do you want removed(index)");
        
        deletion = Number(deletion); 
     
        if(isNaN(deletion) || deletion === 0) {
            alert("Input a natural number or I'll insult the mac and cheese recipe of a Hwale" +
                "and por favor no spaces"); 
        }
    }

    removeTaskIndex(deletion); 


}  

function removeTaskIndex(index) {
    //Removes row within table 
    const taskTable = document.getElementById('task_table');
    const taskTableBody = taskTable.children[0]; 
    let rowDelete = taskTableBody.children[index]; 
    rowDelete.parentElement.removeChild(rowDelete);
    
    tasks.splice(index - 1, 1); 

}




//TODO: Some kind of calendar system

//TODO: Add Checkboxes





