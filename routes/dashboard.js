const express = require('express');
const router = express.Router();
const pg = require('pg');
const connectionString = process.env.DATABASE_URL;
const _ = require('lodash');
const Header = require('../public/assets/header.server');
const App = require('../public/assets/app.server');

// Retrieves all topics on any endpoint for demonstration purposes
// If you were indeed doing this in production, you should instead only
// query the Topics on a page that has topics
router.get('*', function(req, res, next) {
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    const query = client.query('SELECT * FROM manages ORDER BY id ASC;');

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      const manages = _.indexBy(results, 'id');
      res.locals.data = {
        ManageStore: { manages: manages }
      }
      next();
    });

    if (err) {
      res.status(500).send(err);
    };
  });
});

// This is where the magic happens. We take the locals data we have already
// fetched and seed our stores with data.
// App is a function that requires store data and url to initialize and return
// the React-rendered html string

router.get('*', function (req, res, next) {
  debugger;
  var html = App(JSON.stringify(res.locals.data || {}), req, res);
  html = html.replace("TITLE", Header.title)
              .replace("META", Header.meta);

  if(process.env.NODE_ENV === 'devhotloader') {
    html = html.replace("LINK", '');
  } else {
    html = html.replace("LINK", Header.link);
  }

  res.contentType = "text/html; charset=utf8";
  res.end(html);
});






















// POST (create)
router.post('/', function(req, res) {
  // Grab data from http request
  const data = req.body.data;

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
      // Insert a manage
    client.query('INSERT INTO manages(data) values($1) RETURNING id, data', [data],
      function(err, result) {
        if (err) {
          console.log(err);
        } else {
          done();
          return res.status(201).json(result.rows[0]);
        }
      });

    // Handle Errors
    if (err) {
      console.log(err);
    }
  });
});

// GET (index)
router.get('/', function(req, res) {
  const results = [];

  pg.connect(connectionString, function(err, client, done) {
    const query = client.query('SELECT * FROM manages ORDER BY id ASC;');

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });

    if (err) {
      console.log(err);
    }
  });
});

// GET (show)
router.get('/:manage_id', function(req, res) {
  const id = req.params.manage_id;

  pg.connect(connectionString, function(err, client, done) {
    client.query('SELECT * FROM manages WHERE id = ($1)', [id],
      function(err, result) {
        done();
        if (err) {
          return console.error(err);
        }
        return res.json(result.rows[0]);
      });

    if (err) {
      console.error(err);
    }
  });
});

// PUT (update)
router.put('/:manage_id', function(req, res) {
  const id = req.params.manage_id;
  const data = req.body.data;

  pg.connect(connectionString, function(err, client, done) {
    client.query('UPDATE manages SET data=($1) WHERE id=($2) RETURNING id, data',
      [data, id],
      function(err, result) {
        done();
        if (err) {
          return console.error(err);
        }
        return res.json(result.rows[0]);
      }
    );

    // Handle Errors
    if (err) {
      console.log(err);
    }
  });
});

// DELETE (...)

router.delete('/:manages_id', function(req, res) {
  const id = req.params.manages_id;

  pg.connect(connectionString, function(err, client, done) {
    client.query('DELETE FROM manages WHERE id=($1)', [id],
      function(err) {
        done();
        if (err) {
          return console.error(err);
        }
        return res.sendStatus(200);
      });

    // Handle Errors
    if (err) {
      console.error(err);
    }
  });
});

module.exports = router;
