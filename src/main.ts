import './style.scss'; // Import the SCSS styles
import { v4 as uuidV4 } from 'uuid'; // Import the uuid library for generating unique IDs
import trashBinLogo from './trash-bin-logo.png'; // Import the image file


// Define the Task type
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

// Load tasks from local storage
const tasks: Task[] = loadTasks();

// Select the #app container
const appDiv = document.querySelector<HTMLDivElement>('#app')!;

// Create the list element
const list = document.createElement('ul');
const wrapper = document.createElement('div');
wrapper.classList.add('listWrapper');
wrapper.appendChild(list);
appDiv.appendChild(wrapper);

// Add existing tasks to the list
tasks.forEach(addListItem);

// Create the form element
const form = document.createElement('form');

// Create the input element
const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Enter your task';
form.appendChild(input);

// Create a button element
const addButton = document.createElement('button');
addButton.type = 'submit';
addButton.textContent = 'Add Task';
form.appendChild(addButton);

// Add a submit event listener to the form
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Check if the input value is empty or null
  if (input?.value == "" || input?.value == null) {
    return; // If the input value is empty or null, exit the function or block of code
  }

  // Create a new task object
  const newTask: Task = {
    id: uuidV4(), // Generate a unique ID using the uuid library
    title: input.value, // Set the title of the task to the value of the input field
    completed: false, // Set the initial completion status of the task to false
    createdAt: new Date() // Set the creation date of the task to the current date and time
  };

  tasks.push(newTask); // Add the new task to the tasks array

  // Add the new task to the list or perform any other necessary logic
  addListItem(newTask);

  input.value = ""; // Reset the input field value to an empty string
});

// Append the form to the app container
appDiv.appendChild(form);

// Function to add a task item to the list
function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const deleteButton = document.createElement("button");
  const logo = document.createElement("img");
  logo.src = trashBinLogo;
  logo.loading = "lazy";

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked; // Update the completion status of the task
    saveTasks(); // Save the updated tasks to local storage

    if (checkbox.checked) {
      label.classList.add("doneTask"); // Add the .doneTask class to the label
    } else {
      label.classList.remove("doneTask"); // Remove the .doneTask class from the label
    }
  });

  deleteButton.appendChild(logo)
  deleteButton.addEventListener("click", () => {
    deleteTask(task);
    item.remove();
  });

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(task.title, checkbox, deleteButton);
  item.append(label);
  list?.append(item);
}

// Function to delete a task
function deleteTask(task: Task) {
  const taskIndex = tasks.findIndex((t) => t.id === task.id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1); // Remove the task from the tasks array
    saveTasks(); // Save the updated tasks to local storage
  }
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
