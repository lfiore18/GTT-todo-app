const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.set("json spaces", 40);
app.use(cors());

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
app.use(express.static(__dirname))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Get all todo-items
app.get('/todo-item', function(req, res) {
  res.status(200).json(todos);
});

// Get todo-item by id
app.get('/todo-item/:id', function(req, res) {
  let requestedId = todos.some(e => e.id == req.params.id);
  if (requestedId) {
    res.status(200).json(todos[req.params.id]);
  }
});


app.post('/todo', (req, res) => {
  console.log(req.query);
  
  res.send('Test from Todo');
})

// app.put('/todo/:id', () => {

// })

// app.delete('/todo/:id', () => {

// })

app.listen(3000, () => {
  console.log('server started');
});
