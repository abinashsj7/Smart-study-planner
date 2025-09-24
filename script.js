// Live Clock
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
  document.getElementById("clock").textContent = `${time} – ${date}`;
}
setInterval(updateClock, 1000);
updateClock();

// Add Task Logic
const taskInput = document.getElementById("taskInput");
const timeInput = document.getElementById("timeInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const taskTime = timeInput.value;
  if (!taskText || !taskTime) {
    alert("Please enter a task and select a time.");
    return;
  }

  const task = { text: taskText, time: taskTime, done: false };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();

  taskInput.value = "";
  timeInput.value = "";
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="${task.done ? 'done' : ''}">${task.text} <small>@ ${formatTime(task.time)}</small></span>
      <div>
        <button onclick="toggleDone(${index})">✔</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Format time to AM/PM
function formatTime(timeStr) {
  const [hour, minute] = timeStr.split(":");
  let h = parseInt(hour);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${minute} ${ampm}`;
}
