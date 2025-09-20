let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text} - <small>${task.date}</small></span>
      <button class="delete-btn" onclick="deleteTask(${index})">X</button>
    `;

    taskList.appendChild(li);
  });

  updateProgress();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");

  if (taskInput.value.trim() === "" || dateInput.value === "") {
    alert("Please enter a task and date!");
    return;
  }

  tasks.push({ text: taskInput.value, date: dateInput.value, completed: false });
  taskInput.value = "";
  dateInput.value = "";

  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function updateProgress() {
  if (tasks.length === 0) {
    document.getElementById("progressText").textContent = "Progress: 0%";
    document.getElementById("progressFill").style.width = "0%";
    return;
  }

  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);

  document.getElementById("progressText").textContent = `Progress: ${progress}%`;
  document.getElementById("progressFill").style.width = `${progress}%`;
}

// Initial render
renderTasks();
