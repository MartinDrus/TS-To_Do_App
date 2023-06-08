import './style.css';
import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}


const appDiv = document.querySelector<HTMLDivElement>('#app')!;

// Create the list element
const list = document.createElement('ul');

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

  const newTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  addListItem(newTask);

  input.value = ''; // Clear the input field
});

// Append the form to the app container
appDiv.appendChild(form);


function addListItem(task: Task) {

}