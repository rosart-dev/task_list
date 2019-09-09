//Define UI Variables 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners 
loadEventListeners();

//Loan all event listeners 
function loadEventListeners() {
    //DOM Load event 
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add task event 
    form.addEventListener('submit', addTask);

    //Remove task event
    taskList.addEventListener('click', removeTask); 

    //Clear all tasks event 
    clearBtn.addEventListener('click', clearTasks);

    //Filter tasks event 
    filter.addEventListener('keyup', filterTasks);
};

//Get tasks from local storage 
function getTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

    tasks.forEach( task => {
         //Create li element
         const li = document.createElement('li');
         li.className = 'collection-item';  //materialize css styling 
 
         //Create text node and append to li 
         li.appendChild(document.createTextNode(task));
 
         //Create new link - for delete/remove task action
         const link = document.createElement('a');
         link.className = 'delete-item secondary-content';
 
         //Add icon html
         link.innerHTML = '<i class="fa fa-remove"><i>';
 
         //Append the link to li
         li.appendChild(link);
 
         //Append li to the ul
         taskList.appendChild(li);
 
    });
};

//Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    } else {
        //Create li element
        const li = document.createElement('li');
        li.className = 'collection-item';  //materialize css styling 

        //Create text node and append to li 
        li.appendChild(document.createTextNode(taskInput.value));

        //Create new link - for delete/remove task action
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"><i>';

        //Append the link to li
        li.appendChild(link);

        //Append li to the ul
        taskList.appendChild(li);

        //Store in local storage 
        storeTasksInLocalStorage(taskInput.value);

        taskInput.value = '';
    }
    e.preventDefault();
};

function storeTasksInLocalStorage(value) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

    tasks.push(value);

    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();

            //Remove from local storage 
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }     
    }
    e.preventDefault();
};

function removeTaskFromLocalStorage(taskItem) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

    tasks.forEach( (task, index) => {
        if(task === taskItem.textContent) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function clearTasks(e) {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from local storage 
    clearTasksFromLocalStorage();
};

function clearTasksFromLocalStorage() {
    localStorage.clear(); 
};

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(task => {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !== -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
};