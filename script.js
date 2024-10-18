const submitButton = document.getElementById("addTask");
const taskInput = document.getElementById("task");

const todoList = document.getElementById("todoList");
const inProgressList = document.getElementById("inProgressList");
const completedList = document.getElementById("completedList");

// Remove buttons
const clearTodo = document.getElementById("clearToDo");
const clearInProgress = document.getElementById("clearInProgress");
const clearCompleted = document.getElementById("clearCompleted");

window.addEventListener("load", loadTasksFromLocalStorage);

// Function to update local storage
function updateLocalStorage() {
  const tasks = [];

  todoList.querySelectorAll(".task").forEach(task => {
    tasks.push({ text: task.firstChild.textContent, status: "todo" });
  });

  inProgressList.querySelectorAll(".task").forEach(task => {
    tasks.push({ text: task.firstChild.textContent, status: "in-progress" });
  });

  completedList.querySelectorAll(".task").forEach(task => {
    tasks.push({ text: task.firstChild.textContent, status: "completed" });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    addTaskToList(task.text, task.status);
  });
}

// Function to add task to the appropriate list
function addTaskToList(taskText, status) {
  const taskElement = document.createElement("li");
  taskElement.textContent = taskText;
  taskElement.classList.add("task");

  // Create buttons
  const pendingButton = document.createElement("button");
  pendingButton.textContent = "Pending";
  pendingButton.classList.add("textButton");
  pendingButton.id = "pendingButton";

  const completedButton = document.createElement("button");
  completedButton.textContent = "Completed";
  completedButton.classList.add("textButton");
  completedButton.id = "completedButton";

  const inProgressButton = document.createElement("button");
  inProgressButton.textContent = "Progress";
  inProgressButton.classList.add("textButton");
  inProgressButton.id = "inProgressButton";

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("textButton");
  removeButton.id = "removeButton";

  // Append appropriate buttons
  if (status === "todo") {
    taskElement.appendChild(inProgressButton);
    taskElement.appendChild(completedButton);
  } else if (status === "in-progress") {
    taskElement.appendChild(pendingButton);
    taskElement.appendChild(completedButton);
  } else if (status === "completed") {
    taskElement.appendChild(pendingButton);
    taskElement.appendChild(inProgressButton);
  }

  taskElement.appendChild(removeButton);

  // Add event listeners for buttons
  inProgressButton.addEventListener("click", () => {
    inProgressList.appendChild(taskElement);
    taskElement.removeChild(inProgressButton);
    taskElement.appendChild(pendingButton);
    taskElement.appendChild(completedButton);
    updateLocalStorage();
  });

  completedButton.addEventListener("click", () => {
    completedList.appendChild(taskElement);
    taskElement.removeChild(completedButton);
    taskElement.appendChild(pendingButton);
    taskElement.appendChild(inProgressButton);
    updateLocalStorage();
  });

  pendingButton.addEventListener("click", () => {
    todoList.appendChild(taskElement);
    taskElement.removeChild(pendingButton);
    taskElement.appendChild(inProgressButton);
    taskElement.appendChild(completedButton);
    updateLocalStorage();
  });

  removeButton.addEventListener("click", () => {
    taskElement.remove();
    updateLocalStorage();
  });

  // Add task to the corresponding list
  if (status === "todo") {
    todoList.appendChild(taskElement);
  } else if (status === "in-progress") {
    inProgressList.appendChild(taskElement);
  } else if (status === "completed") {
    completedList.appendChild(taskElement);
  }
}

// Add new task
submitButton.addEventListener("click", () => {
  const task = taskInput.value.trim();

  if (task) {
    addTaskToList(task, "todo");
    taskInput.value = "";
    updateLocalStorage();
  }
});

// Clear lists functionality
clearTodo.addEventListener("click", () => {
  todoList.innerHTML = "";
  updateLocalStorage();
});

clearInProgress.addEventListener("click", () => {
  inProgressList.innerHTML = "";
  updateLocalStorage();
});

clearCompleted.addEventListener("click", () => {
  completedList.innerHTML = "";
  updateLocalStorage();
});
