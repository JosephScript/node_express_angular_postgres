var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL ||
 'postgres://localhost:5432/talent_db';

/**
* Creates a new skill, and returns all skills
*/
router.post('/', function(req, res) {
  var results = [];

  console.log(req.body);

  // Grab data from http request
  var data = {name: req.body.name};

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {

    // Handle Errors
    if(err) {
      console.log(err);
    }

    // SQL Query > Insert Data
    client.query('INSERT INTO skills(name) values($1)', [data.name]);

    // SQL Query > Select Data
    var query = client.query('SELECT * FROM skills ORDER BY skills_id ASC');

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      client.end();
      return res.json(results);
    });

  });
});

/**
* Gets all skills
*/
router.get('/', function(req, res) {
  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle Errors
    if(err) {
      console.log(err);
    }

    // SQL Query > Select Data
    var query = client.query('SELECT * FROM skills ORDER BY skills_id ASC;');

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      client.end();
      return res.json(results);
    });

  });

});
/**
* Updates a skill
*/
router.put('/:skillId', function(req, res) {

  var results = [];

  // Grab data from the URL parameters
  var id = req.params.skillId;

  // Grab data from http request
  var data = {name: req.body.name};

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {

    // Handle Errors
    if(err) {
      console.log(err);
    }

    // SQL Query > Update Data
    client.query('UPDATE skills SET name=($1) WHERE skills_id=($2)',
      [data.name, id]);

    // SQL Query > Select Data
    var query = client.query('SELECT * FROM skills ORDER BY skills_id ASC');

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      client.end();
      return res.json(results);
    });
  });

});

/**
* Deletes a skill
*/
router.delete('/:skillId', function(req, res) {

  var results = [];

  // Grab data from the URL parameters
  var id = req.params.skillId;

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {

    // Handle Errors
    if(err) {
      console.log(err);
    }

    // SQL Query > Delete Data
    client.query('DELETE FROM skills WHERE skills_id=($1)', [id]);

    // SQL Query > Select Data
    var query = client.query('SELECT * FROM skills ORDER BY skills_id ASC');

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      client.end();
      return res.json(results);
    });
  });

});

module.exports = router;
