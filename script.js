const taskInput = document.querySelector('#taskInput');
const addTaskButton = document.querySelector('.add-task-button');
const taskList = document.querySelector('#taskList');
const {stringify, parse} = JSON;

let tasks = [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

loadTasks();

function addTask(task) {
    const maxID = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
    tasks.push({ id: maxID + 1, text: task , completed: false });
    saveTasks();
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskText = document.createElement('span');

        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        taskList.appendChild(listItem);
        
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');
        listItem.appendChild(taskContainer);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');

        taskContainer.appendChild(checkbox);
         if (task.completed) {
            checkbox.checked = true;
            taskText.style.textDecoration = 'line-through';
        } else {
            checkbox.checked = false;
            taskText.style.textDecoration = 'none';
        }

        // Create a span element for the task text
        taskText.textContent = task.text;
        taskText.classList.add('task-text');
        taskContainer.appendChild(taskText);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        listItem.appendChild(deleteButton);
        deleteButton.classList.add('delete-button');
        
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        checkbox.addEventListener('click', () => {  
            if (checkbox.checked) {
                taskText.style.textDecoration = 'line-through';
                task.completed = true;
                saveTasks();
            } else {
                taskText.style.textDecoration = 'none';
                task.completed = false;
                saveTasks();
                
            }

        });
    });
    
}   

addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

const deleteCompletedButton = document.querySelector('.delete-completed-button');
deleteCompletedButton.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

const deleteAllButton = document.querySelector('.delete-all-button');
deleteAllButton.addEventListener('click', () => {
    tasks = [];
    saveTasks();
    renderTasks();
});

// use Emter key to add task
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    }
});

const remainingTasksSpan = document.querySelector('.remaining-tasks');
function updateRemainingTasks() {
    const remainingTasks = tasks.filter(task => !task.completed).length;
    remainingTasksSpan.textContent = `Remaining Tasks: ${remainingTasks}`;
}

setInterval(updateRemainingTasks, 1000);




    
       console.log(tasks);
