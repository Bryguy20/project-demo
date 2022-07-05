const text = document.querySelector(".text-input")
const submit = document.querySelector('.button')
const toDoItems = document.querySelector('#to-do-items')
const placeholder = document.querySelector('.placeholder')

text.textContent = "Hello"
let inputValue = []

let data = JSON.parse(localStorage.getItem("tasks"))

submit.onclick = function(event){
    event.preventDefault();


    inputValue.push(text.value);
    
// Gives error if no text
    if(text.value.length == 0){
        alert("Please Enter a Task")
    }
// Adds Item 
    else{
        toDoItems.innerHTML += 
        `<div class="task">
            <label class="delete1">
                <input type="checkbox" id="contactChoice1">
            </label>
            <li id="taskname">${text.value}</li>
        </div>`;

        text.value = ""
        text.placeholder = "Add to do"

// Deletes task
        var current_tasks = document.querySelectorAll(".delete1");
        for(var i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.remove();
            }
        }
        data.push(inputValue)
        localStorage.setItem('tasks', JSON.stringify(data))
    }

    
    
    
}




window.onload = loadTasks

let tasks = JSON.parse(localStorage.getItem('tasks'))

NumOfTasks = tasks.length

function loadTasks(){
    for (let i = 0; i < NumOfTasks; i++) {
        toDoItems.innerHTML += 
        `<div class="task">
            <label class="delete1">
                <input type="checkbox" id="contactChoice1">
            </label>
            <li id="taskname">${tasks[i]}</li>
        </div>`;
    }
}

