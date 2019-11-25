const express = require('express');
let app = express();
var morgan = require('morgan');
var github = require('../helpers/github.js')
var db = require('../database')

app.use(morgan('dev'));

app.use(express.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  if(req.body.user) {
    github.getReposByUsername(req.body.user, (err, response, body) => {
      if(err || response.status === 404) {
        res.status(404);
        res.send('Not Found');
      } else {
        db.save(body, (err) => {
          if(err) {
            res.status(500);
            res.send();
          } else {
            db.search( (err, results) => {
              if (err) {
                res.status(500);
                res.send();
              } else {
                res.status(201);
                res.send(results);
              }
            });
          }
        });
      }
    });
  } else {
    res.status(409);
    res.send("Missing user name");
  }
});

app.get('/repos', function (req, res) {
  db.search((err, results) => {
    if (err) {
      res.status(500);
      res.send();
    }
    res.status(200);
    res.send(results);
  })
});

let port = process.env.PORT;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

