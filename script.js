document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const clearTasksButton = document.getElementById('clearTasksButton');

    loadTasks();

    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTaskToList(taskText);
            saveTasks();
            taskInput.value = "";
        }
    });

    clearTasksButton.addEventListener('click', function () {
        taskList.innerHTML = "";
        saveTasks();
        updateClearButtonState();
    });

    function addTaskToList(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                li.classList.add('task-completed');
            } else {
                li.classList.remove('task-completed');
            }
            saveTasks();
        });

        li.appendChild(checkbox);
        taskList.appendChild(li);
        updateClearButtonState();
    }

    function updateClearButtonState() {
        clearTasksButton.disabled = taskList.children.length === 0;
    }

    function saveTasks() {
        const tasks = [];
        for (let i = 0; i < taskList.children.length; i++) {
            const li = taskList.children[i];
            const task = {
                text: li.firstChild.textContent,
                completed: li.classList.contains('task-completed')
            };
            tasks.push(task);
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToList(task.text);
            if (task.completed) {
                taskList.lastChild.querySelector('input[type="checkbox"]').checked = true;
                taskList.lastChild.classList.add('task-completed');
            }
        });
        updateClearButtonState();
    }
});
