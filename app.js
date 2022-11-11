const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.static(__dirname))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/todo-item', function(req, res) {
  console.log("hi");
  res.send("Hi!");
});

app.post('/todo', (req, res) => {
  if (req.query.body.length > 5)
    //do whatever 
    res.send('Test from Todo')
})

app.put('/todo/:id', () => {

})

app.delete('/todo/:id', () => {

})

app.listen(3000, () => {
  console.log('server started');
});
