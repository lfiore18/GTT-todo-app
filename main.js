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
  deleteButton.addEventListener("click", () => deleteTodoById(todo.id));

  let form = document.createElement("form");
  let textInput = document.createElement("textarea");

  textInput.setAttribute("onchange", `updateTodoById(${todo.id}, event)`);
  textInput.value = todo["message"];

  form.setAttribute("action", "/todo-item/" + todo["id"]);
  form.setAttribute("method", "PUT");
  form.appendChild(textInput);

  todoItem.appendChild(form);
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
  let response =  await fetch(`${url+endPoint}`);
  response = await response.json();
  return response;
}

async function postData(data) {
  
  // if the todo is shorter than 3 characters, don't post it
  if (data.message.length < 3) {
    alert("Todo must be at least 3 characters long");
    return;
  }

  let response = await fetch(`${url}/todo-item`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  response = await response.json();

  buildTodo(response);
}

async function deleteTodoById(id) {
  let response = await fetch(`${url}/todo-item/${id}`, {
    method: 'DELETE'
  });
  
  // Remove the todo from the DOM if the DELETE request was successful
  if (response.status == 200) { 
    let todoToDelete = document.querySelector(`[data-id="${id}"]`);
    todoToDelete.remove();
  }

}

async function updateTodoById(id, event) {

  let data = {
    
  }

  if (event.target.value)
    data["message"] = event.target.value;
  else
    return;

  let response = await fetch(`${url}/todo-item/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.status == 200) {
    response = await response.json();
    event.target.value = await response["message"];
  }
}


function addTodoItem(event) {

  // Prevent the form from redirecting to another page
  event.preventDefault();

  // Get the form input
  let item = document.getElementById("fitem").value;

  // Clear the form input
  event.target.reset();  

  postData({"message" : item});
}