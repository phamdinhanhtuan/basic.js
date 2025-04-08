
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const filterTasks = document.getElementById('filterTasks');
const sortTasks = document.getElementById('sortTasks');

// Tasks array to store all tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            date: new Date()
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Toggle task completion
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks();
    renderTasks();
}

// Edit task
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const newText = prompt('Edit task:', task.text);
    if (newText && newText.trim()) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, text: newText.trim() };
            }
            return task;
        });
        saveTasks();
        renderTasks();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filter tasks
function filterTasksList() {
    const filter = filterTasks.value;
    let filteredTasks = [...tasks];
    
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    return filteredTasks;
}

// Sort tasks
function sortTasksList(tasksToSort) {
    const sortBy = sortTasks.value;
    return [...tasksToSort].sort((a, b) => {
        if (sortBy === 'name') {
            return a.text.localeCompare(b.text);
        } else {
            return b.date - a.date;
        }
    });
}

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    let filteredTasks = filterTasksList();
    filteredTasks = sortTasksList(filteredTasks);
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        
        const checkbox = li.querySelector('.task-checkbox');
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');
        
        checkbox.addEventListener('change', () => toggleTask(task.id));
        editBtn.addEventListener('click', () => editTask(task.id));
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        taskList.appendChild(li);
    });
}

// Event Listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

filterTasks.addEventListener('change', renderTasks);
sortTasks.addEventListener('change', renderTasks);

// Initial render
renderTasks();
