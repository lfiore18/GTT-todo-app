const url = "";

// A div where our todo notes will be stored      
const todoDiv = document.querySelector(".todos");


async function buildTodos(todos) {
  for (let i = 0; i < todos.length; i++) {
    buildTodo(todos[i]);
  }
}

async function buildTodo(todo) {
  let newParagraph = document.createElement("p");
  newParagraph.innerText = todo["message"];
  todoDiv.appendChild(newParagraph);
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
  return await fetch(`${url}/todo`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "message": "Testing testing testing"
    })
  });
}

