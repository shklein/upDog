var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

app.use(bodyParser.urlencoded({ extended: true }));

//Populate pets table
app.get('/pets', function (req, res) {
  pg.connect(connectionString, function (err, client, done){
    if (err) {
      res.sendState(500);
    }

    client.query("SELECT owners.first_name || ' ' || owners.last_name AS fullname, name, breed, color, owner_id, pets.id FROM pets JOIN owners ON owners.id = pets.owner_id GROUP BY pets.owner_id, first_name, last_name, name, breed, color, pets.id;", function (err, result) {
      done();

      res.send(result.rows);
    });
  });
});

//Populate select
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

//Add owner
app.post('/owners', function (req, res) {
  pg.connect(connectionString, function (err, client, done){
    if (err) {
      res.sendState(500);
    }
    client.query("INSERT INTO owners (first_name, last_name) VALUES ('" + req.body.firstname + "', '"  + req.body.lastname + "')");
    res.send('added');
});
});

//Add pet
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

//Put pet
app.put('/pets/:id', function (req, res) {
   var id = req.params.id;
   var pet = req.body;

   pg.connect(connectionString, function (err, client, done) {
     if (err) {
      res.sendStatus(500);
     }

    client.query('UPDATE pets ' +
                       'SET name = $1, ' +
                   'breed = $2, ' +
                   'color = $3' +
                  'WHERE pets.id = $4',
                   [pet.name, pet.breed, pet.color, id],
                  function (err, result) {
                    done();

                    if (err) {
                      res.sendStatus(500);
                                            return;
                    }

                    res.sendStatus(200);
                  });
   });
 });

// //Delete pet
 app.delete('/pets/:id', function (req, res) {
  var id = req.params.id;
   console.log(id);
   pg.connect(connectionString, function (err, client, done) {
     if (err) {
       console.log(err);
      res.sendStatus(500);
     }

    client.query('DELETE FROM pets ' +
                   'WHERE pets.id = $1',
                   [id],
                   function (err, result) {
                     done();

                     if (err) {
                      console.log(err);
                      res.sendStatus(500);
                      return;
                   }

                   res.sendStatus(200);
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
