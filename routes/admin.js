const express = require('express');
const router = express.Router();
const pg = require('pg');
const connectionString = process.env.DATABASE_URL;
const _ = require('lodash');
const Header = require('../public/assets/header.server');
const App = require('../public/assets/app.server');

// Retrieves all manages on any endpoint for demonstration purposes
// If you were indeed doing this in production, you should instead only
// query the Manages on a page that has manages
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
  var html = App(JSON.stringify(res.locals.data || {}), req, res);
  html = html.replace("TITLE", Header.title)
              .replace("META", Header.meta);

  if(process.env.LOADER === 'hot') {
    html = html.replace("LINK", '');
  } else {
    html = html.replace("LINK", Header.link);
  }

  res.contentType = "text/html; charset=utf8";
  res.end(html);
});

module.exports = router;
