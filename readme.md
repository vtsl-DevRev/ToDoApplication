# To-Do List Application

This is a simple web-based To-Do List application that allows users to manage tasks by adding them to different categories: To Do, In Progress, and Completed. Tasks can be moved between these categories and stored in the browser's local storage to persist across page reloads.

## Features

- **Add New Tasks:** Users can add new tasks to the "To Do" list.
- **Move Tasks Between Categories:** Tasks can be moved between "To Do," "In Progress," and "Completed" categories using the provided buttons.
- **Remove Tasks:** Tasks can be removed from any list.
- **Clear Entire Categories:** Users can clear all tasks from a specific category.
- **Persistent Storage:** Uses local storage to save tasks, so they persist across page reloads.

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

You need a web browser to run this application.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vtsl-DevRev/ToDoApplication.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd todo-list-app
   ```
3. **Open the `index.html` file in your web browser:**
   ```bash
   open index.html
   ```

## Usage

1. **Add a Task:**
   - Enter the task in the input field and click the "Add Task" button.

2. **Move a Task:**
   - Use the "Progress" button to move a task from "To Do" to "In Progress."
   - Use the "Completed" button to move a task to the "Completed" list.
   - Use the "Pending" button to move the task back to "To Do."

3. **Remove a Task:**
   - Click the "Remove" button next to the task.

4. **Clear All Tasks in a Category:**
   - Click the "Clear" button at the top of any category list to remove all tasks in that list.

## Project Structure

- **index.html:** The main HTML file that defines the structure of the application.
- **style.css:** The CSS file for styling the application.
- **script.js:** The JavaScript file that handles the application's functionality.

## Local Storage

The application uses the browser's local storage to store tasks, which includes:
- Task text
- Task status (To Do, In Progress, Completed)

Tasks are stored as an array of objects in local storage, ensuring they persist across page reloads.
