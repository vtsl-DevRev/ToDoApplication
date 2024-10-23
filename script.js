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
  removeButton.classList.add("textButton");
  removeButton.id = "removeButton";

  const removeImg = document.createElement("img");
  removeImg.classList.add("svgIcon");
  removeImg.src = "assets/delete_icon.svg";
  removeImg.alt = "delete icon";

  removeButton.appendChild(removeImg);

  const editButton = document.createElement("button");
  editButton.classList.add("textButton");
  editButton.id = "editButton";

  const editImg = document.createElement("img");
  editImg.classList.add("svgIcon");
  editImg.src = "assets/edit_icon.svg";
  editImg.alt = "edit icon";

  editButton.appendChild(editImg);

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
  taskElement.appendChild(editButton);

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

  editButton.addEventListener("click", () => {
    const taskText = taskElement.firstChild.textContent;
    taskInput.value = taskText;
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
  handleSubmit();
});

document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") { 
    handleSubmit();
  }
});

// handle submission
function  handleSubmit() {
  const task = taskInput.value.trim();
  let response = checkForDuplicates(task);

  console.log(response);
  

  if(response){ 
    taskInput.value = "";
  } else {
    if (task) {
      addTaskToList(task, "todo");
      taskInput.value = "";
      updateLocalStorage();
    }
  }
}

// check for duplicates in all lists
function checkForDuplicates(taskElement) {
  const tasks = document.querySelectorAll(".task");
  
  // Use some() to stop when a duplicate is found
  return Array.from(tasks).some(task => {
    return task.firstChild.textContent === taskElement;
  });
}

// Clear lists functionality
clearTodo.addEventListener("click", () => {
  confirmDelete({list: todoList, status: "todo"});
  updateLocalStorage();
});

clearInProgress.addEventListener("click", () => {
  confirmDelete({list: inProgressList, status: "inProgress"});
  updateLocalStorage();
});

clearCompleted.addEventListener("click", () => {
  confirmDelete({list: completedList, status: "completed"});
  updateLocalStorage();
});

// modal confirmation to clear lists
function confirmDelete({list, status}) {
  const modalDialog = document.getElementById("modalDialog");
  modalDialog.showModal();

  const listName = document.getElementById("listName");
  const confirmDelete = document.getElementById("confirmDelete");
  const cancelDelete = document.getElementById("cancelDelete");

  listName.textContent = status;

  confirmDelete.addEventListener("click", () => {
    list.innerHTML = "";
    updateLocalStorage();
    modalDialog.close();
  });
}
