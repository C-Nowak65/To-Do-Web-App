// Functions
function saveTasks() {
    let tasks = [];
    document.querySelectorAll('#tasklist li').forEach(li => {
        let task = {
            text: li.textContent.replace('Delete', '').trim(),
            completed: li.classList.contains('completed')
        }
        tasks.push(task);
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('tasklist');
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const newTask = document.createElement('li');
            newTask.textContent = task.text;
            if (task.completed) {
                newTask.classList.add('completed');
            }
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'deleteBtn';
            newTask.appendChild(deleteBtn);
            taskList.appendChild(newTask);
        })
    }
}

// Style the Title
document.getElementsByTagName("h1")[0].style.fontSize = "6vw";

// Main functionality setup onxe DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitbtn');
    const taskInput = document.getElementById('taskinput');
    const taskList = document.getElementById('tasklist');

    // Load tasks from local storage one the cotent is loaded.
    loadTasks();

    // Adding tasks with the submit button
    submitBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const newTask = document.createElement('li');
            newTask.textContent = taskText;

            // Create and append the delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'deleteBtn';
            newTask.appendChild(deleteBtn);

            taskList.appendChild(newTask);
            taskInput.value = '';
            saveTasks()
        } else {
            alert('Please enter a task.');
        }
    })

    // Toggle completion and handle deletion
    taskList.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON' && event.target.className === 'deleteBtn') {
            // Handle deletion
            event.target.parentNode.remove();
            saveTasks();
        } else if (event.target.tagName === 'LI') {
            // Toggle the completed class on and off
            event.target.classList.toggle('completed');
            saveTasks();
        }
    })
})
