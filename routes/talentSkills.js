var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL ||
 'postgres://localhost:5432/talent_db';

router.post('/:talentId/:skillsId', function(req, res) {
  var results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {

    // SQL Query > Insert Data
    client.query('INSERT INTO talent_skills(talent_id, skills_id) ' +
    'values($1, $2)', [req.params.talentId, req.params.skillsId],
        function(err, result) {

          done();
          // Handle Errors
          if(err) {
            console.log(err);
          }

          // SQL Query > Select Data
          var query = client.query(
            'SELECT * from skills where skills_id = $1 LIMIT 1;',
          [req.params.skillsId]);

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
});

router.get('/:talentId', function(req, res) {
  var results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {

    // SQL Query > Select Data
    var query = client.query('SELECT * FROM skills ' +
    'join talent_skills ON skills.skills_id = talent_skills.skills_id ' +
    'join talent ON talent.talent_id = talent_skills.talent_id ' +
    'WHERE talent.talent_id = $1;', [req.params.talentId]);

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      client.end();
      return res.json(results);
    });

    // Handle Errors
    if(err) {
      console.log(err);
    }
  });
});

module.exports = router;
