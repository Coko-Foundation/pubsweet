var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

/* GET manages listing. */

router.post('/', function(req, res, next) {
  var results = [];

  // Grab data from http request
  var data = req.body.data;

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {

      // SQL Query > Insert Data
      client.query("INSERT INTO manages(data) values($1)", [data]);

      // SQL Query > Select Data
      var query = client.query("SELECT * FROM manages ORDER BY id ASC");

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
