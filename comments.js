// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Set up body-parser
app.use(bodyParser.json());

// Set up static file server
app.use(express.static(path.join(__dirname, 'public')));

// Set up comments route
app.get('/comments', (req, res) => {
  fs.readFile('./data/comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('./data/comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('./data/comments.json', JSON.stringify(comments, null, 2), (err) => {
        if (err) {
          res.status(500).send('Internal server error');
        } else {
          res.send('Comment added');
        }
      });
    }
  });
});

// Start the web server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
