'use strict'

const tasksList = document.querySelector('#tasks-list');
const addTaskButton = document.querySelector('#add-task-button');
const newTaskInput = document.querySelector('#new-task-input');

const tasks = [];

//objeto global app
const app = {

    tasks: tasks,
    tasksList: tasksList,
    newTaskInput: newTaskInput,
}


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
    })

    const taskText = document.createElement("span");
    taskText.textContent = task.title;
    taskText.classList.toggle("completed", task.isCompleted);

    const taskDeleteButton = document.createElement('button');
 taskDeleteButton.textContent = "Delete";
 taskDeleteButton.className = 'delete-button';
 taskDeleteButton.addEventListener("click", () => {
    //eliminar tarea de la lista
 })

 taskElement.appendChild(taskCheckbox);
 taskElement.appendChild(taskText);
 taskElement.appendChild(taskDeleteButton);

return taskElement;
}

addTaskButton.addEventListener('click', () => {
    addTask(app);
})

 
