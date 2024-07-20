document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const pendingTasks = document.getElementById('pendingTasks');
    const completedTasks = document.getElementById('completedTasks');

    const tasks = [];

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskId = Date.now();
            const task = {
                id: taskId,
                text: taskText,
                completed: false,
                createdAt: new Date().toLocaleString(),
                completedAt: null
            };
            tasks.push(task);
            renderTasks();
            taskInput.value = '';
        }
    });

    function renderTasks() {
        pendingTasks.innerHTML = '';
        completedTasks.innerHTML = '';

        tasks.forEach(task => {
            const taskElement = document.createElement('li');
            taskElement.innerHTML = `
                <span>${task.text} (Added: ${task.createdAt} ${task.completed ? `, Completed: ${task.completedAt}` : ''})</span>
                <div>
                    <button class="edit" onclick="editTask(${task.id})">Edit</button>
                    <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                    ${!task.completed ? '<button onclick="completeTask(${task.id})">Complete</button>' : ''}
                </div>
            `;

            if (task.completed) {
                completedTasks.appendChild(taskElement);
            } else {
                pendingTasks.appendChild(taskElement);
            }
        });
    }

    window.editTask = function(id) {
        const task = tasks.find(task => task.id === id);
        if (task) {
            const newText = prompt('Edit task:', task.text);
            if (newText) {
                task.text = newText;
                renderTasks();
            }
        }
    };

    window.deleteTask = function(id) {
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            tasks.splice(index, 1);
            renderTasks();
        }
    };

    window.completeTask = function(id) {
        const task = tasks.find(task => task.id === id);
        if (task) {
            task.completed = true;
            task.completedAt = new Date().toLocaleString();
            renderTasks();
        }
    };
});
