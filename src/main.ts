import './style.scss';
import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem)

const appDiv = document.querySelector<HTMLDivElement>('#app')!;

// Create the list element
const list = document.createElement('ul');
appDiv.appendChild(list);

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
    id: uuidV4(), // Generate a unique ID using the uuid library (assuming it's imported and available)
    title: input.value, // Set the title of the task to the value of the input field
    completed: false, // Set the initial completion status of the task to false
    createdAt: new Date() // Set the creation date of the task to the current date and time
  };

  tasks.push(newTask);

  // Add the new task to the task list or perform any other necessary logic
  addListItem(newTask);

  // Reset the input field value to an empty string
  input.value = "";
});



// Append the form to the app container
appDiv.appendChild(form);

function addListItem(task: Task) {

  const item = document.createElement("li");
  const label = document.createElement("label")
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", ()=> {
    task.completed = checkbox.checked;
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);

}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if(taskJSON == null) return []
  return JSON.parse(taskJSON);
}