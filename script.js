let currentDay = "Monday";

let allTasks = JSON.parse(localStorage.getItem("dailyTasks")) || {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
};

function saveTasks() {
    localStorage.setItem("dailyTasks", JSON.stringify(allTasks));
}

function changeDay() {
    currentDay = document.getElementById("daySelect").value;
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const tasks = allTasks[currentDay];

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.onchange = function () {
            toggleTask(index);
        };

        const taskMain = document.createElement("div");
        taskMain.className = "task-main";

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.classList.add("completed");
        }

        const taskTime = document.createElement("span");
        taskTime.className = "task-time";
        taskTime.textContent = `${task.startTime || "No start"} - ${task.endTime || "No end"}`;

        taskMain.appendChild(taskText);
        taskMain.appendChild(taskTime);

        const actions = document.createElement("div");
        actions.className = "actions";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function () {
            editTask(index);
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            deleteTask(index);
        };

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        li.appendChild(checkbox);
        li.appendChild(taskMain);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    saveTasks();
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const startTimeInput = document.getElementById("startTimeInput");
    const endTimeInput = document.getElementById("endTimeInput");

    const taskText = taskInput.value.trim();
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    allTasks[currentDay].push({
        text: taskText,
        startTime: startTime,
        endTime: endTime,
        completed: false
    });

    taskInput.value = "";
    startTimeInput.value = "";
    endTimeInput.value = "";

    renderTasks();
}

function toggleTask(index) {
    allTasks[currentDay][index].completed = !allTasks[currentDay][index].completed;
    renderTasks();
}

function editTask(index) {
    const task = allTasks[currentDay][index];

    const newText = prompt("Edit task:", task.text);
    const newStartTime = prompt("Edit start time, example 09:00:", task.startTime);
    const newEndTime = prompt("Edit end time, example 10:30:", task.endTime);

    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
    }

    if (newStartTime !== null) {
        task.startTime = newStartTime;
    }

    if (newEndTime !== null) {
        task.endTime = newEndTime;
    }

    renderTasks();
}

function deleteTask(index) {
    allTasks[currentDay].splice(index, 1);
    renderTasks();
}

renderTasks();