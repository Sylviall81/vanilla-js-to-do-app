'use strict'

const tasksList = document.querySelector('#tasks-list'); //Atrapa en el DOM el elemento 'ol' o ''ul'
const addTaskButton = document.querySelector('#add-task-button'); //atrapa en el DOM el boton
const newTaskInput = document.querySelector('#new-task-input');//atrapa el iput text donde van las tareas o items de lista

const tasks = [];//array q almacena tareas ¿?

//objeto global app
const app = {
    tasks: tasks,
    tasksList: tasksList,
    newTaskInput: newTaskInput,
}

//persistencia de datos con LocalStorage (salva el array al local storage para q se mantenga cuando cierro el navegador)
function saveTasksToLocalStorage(tasks){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

window.onload = function(){
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    app.tasks = savedTasks.map((task) => {
        return createTask(task.title, task.isCompleted);
    })

    app.tasks.forEach((task) =>{
        return addTaskToList(task, app.tasksList);
    })
}

// //objeto global app
// const app = {
//     tasks: tasks,
//     tasksList: tasksList,
//     newTaskInput: newTaskInput,
// }


function createTask (title, isCompleted = false){
    return {
        id: Date.now(),
        title,
        isCompleted,
    }
};

function addTaskToList(task, tasksList){
    const taskElement = createTaskElement(task);
    tasksList.appendChild(taskElement);
};


function addTask(app){
    const newTaskTitle = app.newTaskInput.value;
    const newTask = createTask(newTaskTitle);
    app.tasks.push(newTask);

    addTaskToList(newTask, app.tasksList);
    saveTasksToLocalStorage(app.tasks);
    app.newTaskInput.value = ''; //borra la tarea para q quede vacio el input
}

function createTaskElement(task){
    const taskElement= document.createElement('li');
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.checked = task.isCompleted;
    taskCheckbox.addEventListener('change', ()=>{
    task.isCompleted = taskCheckbox.checked;
    taskText.classList.toggle("completed", task.isCompleted);
    saveTasksToLocalStorage(app.tasks);
    })

    const taskText = document.createElement("span");
    taskText.textContent = task.title;
    taskText.classList.toggle("completed", task.isCompleted);

    const taskDeleteButton = document.createElement('button');
    taskDeleteButton.textContent = "Delete";
    taskDeleteButton.className = 'delete-button';

    taskDeleteButton.addEventListener("click", () => {
    //eliminar tarea del html
        taskElement.remove();
    //la elimino del array

        const taskIndex = app.tasks.indexOf(task);
        console.log(taskIndex)

        if(taskIndex > -1) {
        app.tasks.splice(taskIndex, 1);
        
        saveTasksToLocalStorage(app.tasks);
        console.log(app.tasks);
        }
    });

    taskElement.appendChild(taskCheckbox);
    taskElement.appendChild(taskText);
    taskElement.appendChild(taskDeleteButton);

    return taskElement;
}

addTaskButton.addEventListener('click', () => {
    addTask(app);
})

newTaskInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        addTask(app);
    }
})
