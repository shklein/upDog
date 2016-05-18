var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/pets', function (req, res) {
  pg.connect(connectionString, function (err, client, done){
    if (err) {
      res.sendState(500);
    }

    client.query('SELECT * FROM pets', function (err, result) {
      done();

      console.log(result.rows);
      res.send(result.rows);
    });
  });
});

app.get('/owners', function (req, res) {
  pg.connect(connectionString, function (err, client, done){
    if (err) {
      res.sendState(500);
    }

    client.query('SELECT first_name, last_name FROM owners', function (err, result) {
      done();

      console.log(result.rows);
      res.send(result.rows);
    });
  });
});

//Catch-all route
app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port'));
});
