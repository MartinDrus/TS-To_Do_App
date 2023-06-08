import './style.css';

const appDiv = document.querySelector<HTMLDivElement>('#app')!;

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
  const task = input.value; // Get the value from the input field
  // Do something with the task, like adding it to a list or performing an action
  console.log(`New task: ${task}`);
  input.value = ''; // Clear the input field
});

// Append the form to the app container
appDiv.appendChild(form);