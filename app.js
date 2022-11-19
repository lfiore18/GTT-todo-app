const express = require('express');
const path = require('path');
const cors = require('cors');
const { type } = require('os');

const app = express();

app.set("json spaces", 40);
app.use(cors());

app.use(express.json());

const todos = [
  {
    id: 1,
    message: "A message from beyond"
  },
  {
    id: 2,
    message: "Saying Hi!"
  }
]; 

// Serve all static files at root
app.use(express.static(__dirname));


// Get all todo-items
app.get('/todo-item', function(request, response) {
  response.status(200).json(todos);
});


// Get todo-item by id
app.get('/todo-item/:id', function(request, response) {
  let requestedId = todos.some(e => e.id == request.params.id);
  if (requestedId) {
    response.status(200).json(todos[request.params.id]);
  }
});


// Add a new todo-item
app.post('/todo-item', function(request, response) {
  const todo = request.body;
  console.log(todo);

  let lastId = 0;

  // Only get the id of the last todo-item if the array isn't empty
  if (todos.length > 0)
    lastId = todos[todos.length - 1].id;

  todos.push({
    id: lastId + 1,
    message: todo.message
  });

  response.status(201).json(todos[todos.length - 1]);
});


// Delete a todo-item by id
app.delete('/todo-item/:id', function(request, response) {
  
  // get the id from the request
  // see if there is a todo with that id
  // if there is, delete it
  // if not, send a 404

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == parseInt(request.params.id)) {
      todos.splice(i, 1);
      response.status(200).send(`Item with id ${request.params.id} deleted`);
      return;
    }
  }

  response.status(404).send("Item with requested ID not found");
});

// app.put('/todo/:id', () => {

// })

app.listen(3000, () => {
  console.log('server started');
});
