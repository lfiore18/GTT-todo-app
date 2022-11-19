const url = "";

// A div where our todo notes will be stored      
const todoDiv = document.querySelector(".todos");


async function buildTodos(todos) {
  for (let i = 0; i < todos.length; i++) {
    buildTodo(todos[i]);
  }
}

async function buildTodo(todo) {
  let todoItem = document.createElement("div");

  let newParagraph = document.createElement("p");
  newParagraph.innerText = todo["message"];

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerText = "X";
  deleteButton.addEventListener("click", function() {deleteTodoById(todo.id)});

  todoItem.appendChild(newParagraph);
  todoItem.appendChild(deleteButton);

  todoItem.classList.add("todo-item");

  // Add the todo id as a data attribute, easier to find and delete later
  todoItem.setAttribute("data-id", todo.id);

  todoDiv.appendChild(todoItem);
}

async function getTodos() {
  const todosJson = await apiCall("/todo-item");
  await buildTodos(todosJson);
}

async function getTodoById(id) {
  const todoJson = await apiCall("/todo-item/" + id);
  await buildTodo(todoJson);
}

async function apiCall(endPoint) {
  return await fetch(`${url+endPoint}`
  )
    .then(response => response.json())
    .then(json => json);
}

async function postData(data) {
  const response = await fetch(`${url}/todo-item`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json());

  await buildTodo(response);
}

async function deleteTodoById(id) {
  return await fetch(`${url}/todo-item/${id}`, {
    method: 'DELETE'
  });

  // Remove the todo from the DOM
  let todoItem = document.querySelector(`.todo-item[data-id="${id}"]`);
}


async function addTodoItem(event) {

  console.log(event);
  // Prevent the form from submitting
  event.preventDefault();

  // Get the form input
  let item = document.getElementById("fitem").value;

  // Clear the form input
  event.target.reset();  

  await postData({"message" : item});
}
