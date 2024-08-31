document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.addEventListener('click', toggleComplete);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', deleteTask);

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteBtn);
    taskList.appendChild(listItem);

    taskInput.value = '';
}

function toggleComplete(event) {
    const listItem = event.target.parentElement;
    listItem.classList.toggle('completed');
}

function deleteTask(event) {
    const listItem = event.target.parentElement;
    listItem.remove();
}