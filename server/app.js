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

    client.query("SELECT owners.first_name || ' ' || owners.last_name AS fullname, name, breed, color, owner_id FROM pets JOIN owners ON owners.id = pets.owner_id GROUP BY pets.owner_id, first_name, last_name, name, breed, color;", function (err, result) {
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

    client.query('SELECT first_name, last_name, id FROM owners', function (err, result) {
      done();
      res.send(result.rows);
    });
  });
});

app.post('/owners', function (req, res) {
  pg.connect(connectionString, function (err, client, done){
    if (err) {
      res.sendState(500);
    }
    client.query("INSERT INTO owners (first_name, last_name) VALUES ('" + req.body.firstname + "', '"  + req.body.lastname + "')");
    res.send('added');
});
});

app.post('/pets', function (req, res) {
  pg.connect(connectionString, function (err, client, done){
    if (err) {
      res.sendState(500);
    }
    console.log(req.body);
    client.query("INSERT INTO pets (name, breed, color, owner_id) VALUES ('" + req.body.petname + "', '"  + req.body.petbreed + "', '" + req.body.petcolor + "', '" + req.body.owner_id + "')");
    res.send('added');
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
